"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface ScreeningQuestion {
  id: string;
  question: string;
  type: "radio" | "select" | "text" | "textarea";
  options?: string[];
  required?: boolean;
}

export interface JobForModal {
  id: string;
  title: string;
  screeningQuestions: ScreeningQuestion[];
}

interface ApplyModalProps {
  job: JobForModal;
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ApplyModal({ job, open, onClose }: ApplyModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMsg(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const screeningLines: string[] = [];
    job.screeningQuestions.forEach((q) => {
      const v = fd.get(q.id);
      if (typeof v === "string" && v) {
        screeningLines.push(`${q.question}\n${v}`);
      }
    });

    const interest = String(fd.get("interest") || "").trim();
    const coverLetter = [...screeningLines, interest ? `Why interested:\n${interest}` : ""]
      .filter(Boolean)
      .join("\n\n");

    const resumeFile = fd.get("resume") as File | null;

    // Validate required screening questions manually (requestSubmit doesn't enforce radio required)
    for (const q of job.screeningQuestions) {
      if (q.required && !fd.get(q.id)) {
        setErrorMsg(`Please answer: "${q.question}"`);
        setStatus("idle");
        return;
      }
    }

    // Pull dedicated fields from screening questions if present
    const experience = String(fd.get("experience") || "").trim() || null;
    const education  = String(fd.get("education")  || "").trim() || null;

    // Generate ID client-side — avoids SELECT after INSERT (anon RLS blocks SELECT/UPDATE)
    const leadId = crypto.randomUUID();

    try {
      // Upload resume first so we can include the URL in the single INSERT
      let resumeUrl: string | null = null;
      if (resumeFile && resumeFile.size > 0) {
        const ext = resumeFile.name.split(".").pop();
        const filePath = `${leadId}/resume.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("careers-documents")
          .upload(filePath, resumeFile, { cacheControl: "3600", upsert: true });

        if (uploadError) throw new Error(uploadError.message || JSON.stringify(uploadError));

        const { data: urlData } = supabase.storage
          .from("careers-documents")
          .getPublicUrl(filePath);

        resumeUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("career_leads")
        .insert({
          id:           leadId,
          full_name:    String(fd.get("full_name") || "").trim(),
          email:        String(fd.get("email") || "").trim(),
          phone:        String(fd.get("phone") || "").trim(),
          city:         String(fd.get("city") || "").trim() || null,
          position:     job.id,
          experience:   experience,
          education:    education,
          cover_letter: coverLetter || null,
          resume_url:   resumeUrl,
          source:       "website",
          status:       "new",
        });

      if (insertError) throw new Error(insertError.message || JSON.stringify(insertError));

      setStatus("success");
      setTimeout(() => {
        form.reset();
        onClose();
      }, 1800);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "message" in err
          ? String((err as { message: unknown }).message)
          : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      {/* Card */}
      <div className="relative bg-white w-full max-w-[640px] max-h-[92vh] rounded-[12px] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-border-light">
          <div>
            <h2 id="apply-modal-title" className="text-xl font-bold text-navy">
              Apply Now
            </h2>
            <p className="text-sm text-gray-dark mt-1">{job.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-dark hover:text-navy transition-colors text-2xl leading-none -mt-1"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {status === "success" ? (
            <div className="py-10 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-1">Application submitted!</h3>
              <p className="text-sm text-gray-dark">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Screening questions */}
              {job.screeningQuestions.map((q) => (
                <ScreeningField key={q.id} q={q} />
              ))}

              {/* Contact: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field name="full_name" label="Full Name" required>
                  <input
                    type="text"
                    name="full_name"
                    required
                    className="input-base"
                  />
                </Field>
                <Field name="email" label="Email" required>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-base"
                  />
                </Field>
              </div>

              {/* Contact: Phone + City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field name="phone" label="Phone" required>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input-base"
                  />
                </Field>
                <Field name="city" label="City">
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Kathmandu"
                    className="input-base"
                  />
                </Field>
              </div>

              {/* Resume */}
              <Field name="resume" label="Resume / CV" required hint=".pdf, .doc, .docx">
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  className="block w-full text-sm text-gray-dark file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-royal/10 file:text-blue-royal hover:file:bg-blue-royal/15 cursor-pointer"
                />
              </Field>

              {/* Interest */}
              <Field name="interest" label="Why are you interested in this role?" required hint="Max 2–3 sentences">
                <textarea
                  name="interest"
                  required
                  rows={3}
                  className="input-base resize-y"
                />
              </Field>

              {errorMsg && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        {status !== "success" && (
          <div className="px-6 py-4 border-t border-border-light bg-off-white">
            <button
              type="submit"
              onClick={() => formRef.current?.requestSubmit()}
              disabled={status === "submitting"}
              className="w-full bg-yellow text-black font-semibold text-[15px] py-3 rounded-[10px] hover:bg-yellow-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        :global(.input-base) {
          width: 100%;
          border: 1px solid #d7dae8;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
          color: #001353;
          background: #fff;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input-base:focus) {
          outline: none;
          border-color: #31429c;
          box-shadow: 0 0 0 3px rgba(49, 66, 156, 0.12);
        }
      `}</style>
    </div>
  );
}

function Field({
  name,
  label,
  required,
  hint,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[13px] font-medium text-navy mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-gray-dark font-normal ml-1">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function ScreeningField({ q }: { q: ScreeningQuestion }) {
  if (q.type === "radio") {
    return (
      <div>
        <label className="block text-[13px] font-medium text-navy mb-1.5">
          {q.question} {q.required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {(q.options || []).map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2 text-[14px] text-navy cursor-pointer">
              <input
                type="radio"
                name={q.id}
                value={opt}
                required={q.required}
                className="w-4 h-4 accent-blue-royal"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (q.type === "select") {
    return (
      <div>
        <label htmlFor={q.id} className="block text-[13px] font-medium text-navy mb-1.5">
          {q.question} {q.required && <span className="text-red-500">*</span>}
        </label>
        <select id={q.id} name={q.id} required={q.required} className="input-base" defaultValue="">
          <option value="" disabled>
            Select...
          </option>
          {(q.options || []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (q.type === "textarea") {
    return (
      <div>
        <label htmlFor={q.id} className="block text-[13px] font-medium text-navy mb-1.5">
          {q.question} {q.required && <span className="text-red-500">*</span>}
        </label>
        <textarea id={q.id} name={q.id} required={q.required} rows={2} className="input-base resize-y" />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={q.id} className="block text-[13px] font-medium text-navy mb-1.5">
        {q.question} {q.required && <span className="text-red-500">*</span>}
      </label>
      <input id={q.id} name={q.id} type="text" required={q.required} className="input-base" />
    </div>
  );
}
