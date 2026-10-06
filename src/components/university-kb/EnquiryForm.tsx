"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { submitUniversityEnquiry } from "@/lib/university-kb/enquiry";

interface EnquiryContextValue {
  open: (course?: string) => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

const COUNTRY_CODES = [
  { code: "+977", label: "NP +977" },
  { code: "+91", label: "IN +91" },
  { code: "+44", label: "UK +44" },
  { code: "+61", label: "AU +61" },
  { code: "+1", label: "US +1" },
  { code: "+971", label: "AE +971" },
];

const STUDY_LEVELS = ["Undergraduate", "Postgraduate", "Foundation / Diploma", "Research (PhD)", "Not sure yet"];

interface ProviderProps {
  university: string;
  universitySlug: string;
  /** Upcoming intakes, e.g. ["January 2027", "September 2027"] */
  intakes: string[];
  children: ReactNode;
}

type Status = "idle" | "submitting" | "success";
type Errors = Partial<Record<"fullName" | "phone" | "email" | "studyLevel", string>>;

export function EnquiryProvider({ university, universitySlug, intakes, children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const open = useCallback((c?: string) => {
    setCourse(c ?? "");
    setStatus("idle");
    setErrors({});
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [isOpen, close]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (get("fullName").length < 2) next.fullName = "Please enter your full name.";
    if (!/^\d{7,15}$/.test(get("phone").replace(/[\s-]/g, ""))) next.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid email address.";
    if (!get("studyLevel")) next.studyLevel = "Please choose a study level.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    await submitUniversityEnquiry({
      fullName: get("fullName"),
      phoneCountryCode: get("phoneCountryCode"),
      phone: get("phone").replace(/[\s-]/g, ""),
      email: get("email"),
      studyLevel: get("studyLevel"),
      preferredIntake: get("preferredIntake"),
      university,
      universitySlug,
      course: get("course") || undefined,
      message: get("message") || undefined,
      pageUrl: window.location.href,
    });
    setSubmittedName(get("fullName").split(" ")[0]);
    setStatus("success");
  };

  const input =
    "w-full rounded-[10px] border bg-white px-4 py-3 text-[15px] text-navy placeholder:text-gray-medium focus:outline-none focus:ring-2 focus:ring-blue-royal/15";
  const border = (err?: string) => (err ? "border-error focus:border-error" : "border-border-light focus:border-blue-royal");
  const label = "mb-1.5 block text-[14px] font-semibold text-navy";
  const errorText = (err?: string) => err && <p className="mt-1 text-[13px] text-error">{err}</p>;

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
          <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 bg-black/50" />
          <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl md:max-w-xl md:rounded-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-border-light px-6 py-5">
              <div>
                <h2 id="enquiry-title" className="text-[20px] font-bold text-navy">
                  {status === "success" ? "Enquiry received" : "Talk to a counsellor"}
                </h2>
                {status !== "success" && (
                  <p className="mt-1 text-[14px] text-gray-dark">Free, one-to-one advice about {university}.</p>
                )}
              </div>
              <button type="button" onClick={close} aria-label="Close" className="rounded-full p-2 text-gray-dark hover:bg-off-white hover:text-navy">
                <X className="w-5 h-5" aria-hidden />
              </button>
            </div>

            {status === "success" ? (
              <div className="px-6 py-10 text-center">
                <CheckCircle2 className="mx-auto w-14 h-14 text-green-600" aria-hidden />
                <p className="mt-4 text-[20px] font-bold text-navy">Thank you{submittedName ? `, ${submittedName}` : ""}!</p>
                <p className="mx-auto mt-2 max-w-sm text-[15px] text-gray-dark">
                  We&apos;ve received your enquiry about {university}. An Admizz counsellor will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-7 rounded-[10px] border border-blue-royal px-6 py-2.5 text-[15px] font-semibold text-blue-royal hover:bg-blue-royal hover:text-white transition-colors"
                >
                  Back to {university}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
                <div className="grid flex-1 gap-4 overflow-y-auto px-6 py-6 md:grid-cols-2">
                  <div className="rounded-[10px] bg-off-white px-4 py-3 text-[14px] md:col-span-2">
                    <span className="text-gray-dark">University: </span>
                    <span className="font-semibold text-navy">{university}</span>
                  </div>

                  <label className="block md:col-span-2">
                    <span className={label}>Full name *</span>
                    <input ref={firstFieldRef} name="fullName" autoComplete="name" placeholder="e.g. Sita Sharma" className={`${input} ${border(errors.fullName)}`} aria-invalid={Boolean(errors.fullName)} />
                    {errorText(errors.fullName)}
                  </label>

                  <div className="md:col-span-2">
                    <span className={label}>Phone number *</span>
                    <div className="flex gap-2">
                      <select name="phoneCountryCode" defaultValue="+977" aria-label="Country code" className={`${input.replace("w-full ", "")} ${border()} w-[128px] shrink-0 cursor-pointer pl-3 pr-2`}>
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>
                      <input name="phone" type="tel" style={{ minWidth: 0 }} inputMode="tel" autoComplete="tel-national" placeholder="98XXXXXXXX" aria-label="Phone number" className={`${input} ${border(errors.phone)}`} aria-invalid={Boolean(errors.phone)} />
                    </div>
                    {errorText(errors.phone)}
                  </div>

                  <label className="block md:col-span-2">
                    <span className={label}>Email *</span>
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={`${input} ${border(errors.email)}`} aria-invalid={Boolean(errors.email)} />
                    {errorText(errors.email)}
                  </label>

                  <label className="block">
                    <span className={label}>Study level *</span>
                    <select name="studyLevel" defaultValue="" className={`${input} ${border(errors.studyLevel)} cursor-pointer`} aria-invalid={Boolean(errors.studyLevel)}>
                      <option value="" disabled>Select level</option>
                      {STUDY_LEVELS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                    {errorText(errors.studyLevel)}
                  </label>

                  <label className="block">
                    <span className={label}>Preferred intake</span>
                    <select name="preferredIntake" defaultValue={intakes[0] ?? "Not sure yet"} className={`${input} ${border()} cursor-pointer`}>
                      {intakes.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className={label}>Course of interest</span>
                    <input name="course" defaultValue={course} key={course} placeholder="e.g. MBA, Nursing, Computer Science" className={`${input} ${border()}`} />
                  </label>

                  <label className="block md:col-span-2">
                    <span className={label}>Message <span className="font-normal text-gray-dark">(optional)</span></span>
                    <textarea name="message" rows={3} placeholder="Anything you'd like the counsellor to know" className={`${input} ${border()} resize-none`} />
                  </label>
                </div>

                <div className="border-t border-border-light px-6 py-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-yellow py-3.5 text-[15px] font-semibold text-black hover:bg-yellow-bright disabled:cursor-wait disabled:opacity-70 transition-colors"
                  >
                    {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden />}
                    {status === "submitting" ? "Sending…" : "Send enquiry"}
                  </button>
                  <p className="mt-2 text-center text-[12px] text-gray-dark">Free service · We never share your details.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}

/** Any button that should open the enquiry form. */
export function EnquireButton({ course, className, children }: { course?: string; className?: string; children: ReactNode }) {
  const ctx = useContext(EnquiryContext);
  return (
    <button type="button" onClick={() => ctx?.open(course)} className={className}>
      {children}
    </button>
  );
}
