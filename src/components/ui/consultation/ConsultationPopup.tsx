"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { readAffiliateRefCookie } from "@/lib/affiliate/refCookie";
import { getUtmAttribution } from "@/lib/attribution/utmStorage";
import {
  COUNTRY_OPTIONS,
  DESTINATION_OPTIONS,
  LEVEL_OPTIONS,
  PROGRAM_OPTIONS,
} from "./consultation.data";
import Select from "./Select";

// Submits to the CRM "enquiry" form (the same form the old iframe embedded).
// The key is a public form key created in the CRM; it is injected at build time.
const SUBMIT_URL = "https://edgex.zunkireelabs.com/api/public/submit/admizz/enquiry";
const FORM_KEY = process.env.NEXT_PUBLIC_ENQUIRY_FORM_KEY ?? "";

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  city: string;
  destination: string;
  program: string;
  level: string;
  terms: boolean;
}

type Errors = Partial<Record<keyof FormState, string>>;

interface ConsultationPopupProps {
  open: boolean;
  onClose: () => void;
  /** Country name as used on the page ("the UK", "Germany"); pre-selects the destination */
  countryName?: string;
  /** Attribution tag sent to the CRM, e.g. "country-germany" */
  formSource?: string;
  /** Values the visitor already typed elsewhere (e.g. an inline hero form) */
  prefill?: { fullName?: string; phone?: string };
}

/** Maps a page country name ("the UK", "New Zealand") to the CRM destination value ("uk", "new_zealand") */
export function destinationValueFor(countryName?: string): string {
  if (!countryName) return "";
  const value = countryName.replace(/^the /i, "").trim().toLowerCase().replace(/\s+/g, "_");
  return DESTINATION_OPTIONS.some((o) => o.value === value) ? value : "";
}

const countryOptions = COUNTRY_OPTIONS.map((c) => ({
  label: c.dial ? `${c.label} (${c.dial})` : c.label,
  value: c.value,
}));

const inputClass =
  "w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-navy placeholder:text-gray-medium outline-none transition-colors focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/15";

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-navy mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[13px]" style={{ color: "#c41e3a" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function PopupBody({
  onClose,
  countryName,
  formSource = "consultation",
  prefill,
}: Omit<ConsultationPopupProps, "open">) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [prefillFirst = "", ...prefillRest] = (prefill?.fullName ?? "").trim().split(/\s+/);
  const initialForm = (): FormState => ({
    firstName: prefillFirst,
    lastName: prefillRest.join(" "),
    email: "",
    country: "nepal",
    phone: prefill?.phone ?? "",
    city: "",
    destination: destinationValueFor(countryName),
    program: "",
    level: "",
    terms: false,
  });

  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const dial = COUNTRY_OPTIONS.find((c) => c.value === form.country)?.dial ?? "";

  const set = (patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch) as (keyof FormState)[]) delete next[key];
      return next;
    });
  };

  // Lock page scroll and close on Escape while open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const validate = (forStep: number): boolean => {
    const next: Errors = {};
    if (forStep === 0) {
      if (!form.firstName.trim()) next.firstName = "First name is required";
      if (!form.lastName.trim()) next.lastName = "Last name is required";
      if (!form.email.trim()) next.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address";
      const minDigits = dial === "+977" ? 10 : 6;
      if (!form.phone) next.phone = "Phone number is required";
      else if (form.phone.length < minDigits || (dial === "+977" && form.phone.length !== 10))
        next.phone = "Enter a valid phone number for the selected country";
    } else {
      if (!form.destination) next.destination = "Select a study destination";
      if (!form.program) next.program = "Select a study program";
      if (!form.level) next.level = "Select a study level";
      if (!form.terms) next.terms = "Please accept the Terms & Conditions";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (validate(0)) setStep(1);
  };

  const submit = async () => {
    if (!validate(1)) return;
    if (!FORM_KEY) {
      console.error("NEXT_PUBLIC_ENQUIRY_FORM_KEY is not set; cannot submit the enquiry form.");
      setSubmitError("This form is temporarily unavailable. Please email hello@admizz.com.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { utm_source, utm_medium, utm_campaign } = getUtmAttribution();
      const urlRef = new URLSearchParams(window.location.search).get("ref")?.trim() || null;
      const refCode = urlRef ?? readAffiliateRefCookie();
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${FORM_KEY}` },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          email: form.email.trim(),
          phone: `${dial} ${form.phone}`.trim(),
          intake_source: utm_source || (refCode ? "Affiliate" : "Website"),
          intake_medium: utm_medium,
          intake_campaign: utm_campaign,
          intake_account: window.location.pathname,
          custom_fields: {
            country: form.country,
            city: form.city.trim() || null,
            preferred_study_destination: form.destination,
            preferred_study_program: form.program,
            interested_study_level: form.level,
            terms_accepted: true,
            form_source: formSource,
            ...(refCode ? { ref_code: refCode } : {}),
          },
        }),
      });
      if (!res.ok) throw new Error(`CRM responded ${res.status}`);
      setDone(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again, or email hello@admizz.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const borderFor = (key: keyof FormState) => ({ borderColor: errors[key] ? "#c41e3a" : "#D7DAE8" });

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }}
        aria-hidden
      />
      <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:px-4 sm:py-8 pointer-events-none">
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={id("title")}
          className="pointer-events-auto relative w-full sm:max-w-[480px] bg-white shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:rounded-[24px] overflow-hidden"
          style={{ border: "1px solid #E0E6F2", boxShadow: "0 24px 64px rgba(15,23,42,0.30)" }}
        >
          {/* Top bar: step pills + close */}
          <div
            className="flex-shrink-0 flex items-center justify-between gap-3 px-4 sm:px-5 border-b"
            style={{
              borderColor: "#F0F0F0",
              paddingTop: "max(0.75rem, env(safe-area-inset-top))",
              paddingBottom: "0.75rem",
            }}
          >
            {done ? (
              <span />
            ) : (
              <div className="flex items-center gap-2" aria-label={`Step ${step + 1} of 2`}>
                {["About you", "Your study plan"].map((label, i) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold transition-colors"
                    style={
                      i === step
                        ? { background: "#31429C", color: "#fff" }
                        : i < step
                          ? { background: "#E8ECFB", color: "#31429C" }
                          : { background: "#F4F6FF", color: "#5C7189" }
                    }
                  >
                    <span>{i + 1}</span>
                    {label}
                  </span>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[#F0F4FF]"
              style={{ border: "1px solid #E0E6F2", color: "#5C7189" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {done ? (
            <div className="flex-1 overflow-y-auto px-6 py-12 text-center">
              <span className="mx-auto mb-5 flex w-16 h-16 items-center justify-center rounded-full bg-[#E8ECFB]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#31429C" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h2 id={id("title")} className="text-2xl font-bold text-navy mb-2" style={rubikFont}>
                Thank You!
              </h2>
              <p className="text-base text-body leading-relaxed">
                Our team will get in touch with you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex items-center justify-center bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-8 py-3 rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              className="flex-1 flex flex-col min-h-0"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 0) goNext();
                else submit();
              }}
            >
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-1 overflow-y-auto overscroll-contain px-4 pt-5 sm:px-6 pb-4"
              >
                <h2 id={id("title")} className="text-[22px] sm:text-2xl font-bold text-navy leading-tight mb-1" style={rubikFont}>
                  {step === 0 ? "Tell us about yourself" : "Your study plan"}
                </h2>
                <p className="text-[15px] text-body mb-5">
                  {step === 0
                    ? "Quick basics. It takes under a minute."
                    : "Tell us what you'd like to study and where."}
                </p>

                {step === 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="First name" htmlFor={id("first")} error={errors.firstName}>
                        <input id={id("first")} autoFocus autoComplete="given-name" className={inputClass} style={borderFor("firstName")} placeholder="First name" value={form.firstName} onChange={(e) => set({ firstName: e.target.value })} />
                      </Field>
                      <Field label="Last name" htmlFor={id("last")} error={errors.lastName}>
                        <input id={id("last")} autoComplete="family-name" className={inputClass} style={borderFor("lastName")} placeholder="Last name" value={form.lastName} onChange={(e) => set({ lastName: e.target.value })} />
                      </Field>
                    </div>
                    <Field label="Email address" htmlFor={id("email")} error={errors.email}>
                      <input id={id("email")} type="email" autoComplete="email" className={inputClass} style={borderFor("email")} placeholder="you@example.com" value={form.email} onChange={(e) => set({ email: e.target.value })} />
                    </Field>
                    <Field label="Country" htmlFor={id("country")}>
                      <Select
                          id={id("country")}
                          value={form.country}
                          onChange={(v) => set({ country: v })}
                          options={countryOptions}
                          placeholder="Select your country"
                          searchable
                          searchPlaceholder="Search country or code"
                        />
                    </Field>
                    <Field label="Phone number" htmlFor={id("phone")} error={errors.phone}>
                      <div className="flex gap-2">
                        <span className="flex h-12 min-w-[72px] items-center justify-center rounded-xl border bg-[#F4F6FF] px-3 text-[15px] font-medium text-navy" style={{ borderColor: "#D7DAE8" }}>
                          {dial || "+"}
                        </span>
                        <input id={id("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" className={inputClass} style={borderFor("phone")} placeholder="Phone number" value={form.phone} onChange={(e) => set({ phone: e.target.value.replace(/\D/g, "").slice(0, 15) })} />
                      </div>
                    </Field>
                    <Field label="City (optional)" htmlFor={id("city")}>
                      <input id={id("city")} autoComplete="address-level2" className={inputClass} style={borderFor("city")} placeholder="Enter your city name" value={form.city} onChange={(e) => set({ city: e.target.value })} />
                    </Field>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Field label="Preferred study destination" htmlFor={id("destination")} error={errors.destination}>
                      <Select
                          id={id("destination")}
                          autoFocus
                          value={form.destination}
                          onChange={(v) => set({ destination: v })}
                          options={DESTINATION_OPTIONS}
                          placeholder="Select preferred study destination"
                          invalid={!!errors.destination}
                        />
                    </Field>
                    <Field label="Preferred study program" htmlFor={id("program")} error={errors.program}>
                      <Select
                          id={id("program")}
                          value={form.program}
                          onChange={(v) => set({ program: v })}
                          options={PROGRAM_OPTIONS}
                          placeholder="Select preferred study program"
                          invalid={!!errors.program}
                        />
                    </Field>
                    <Field label="Interested study level" htmlFor={id("level")} error={errors.level}>
                      <Select
                          id={id("level")}
                          value={form.level}
                          onChange={(v) => set({ level: v })}
                          options={LEVEL_OPTIONS}
                          placeholder="Select study level"
                          invalid={!!errors.level}
                        />
                    </Field>
                    <div>
                      <label className="flex items-start gap-3 text-[14px] text-body leading-snug cursor-pointer">
                        <input type="checkbox" className="mt-0.5 w-5 h-5 flex-shrink-0 accent-[#31429C]" checked={form.terms} onChange={(e) => set({ terms: e.target.checked })} />
                        <span>
                          I have read and agreed to the{" "}
                          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-royal underline">
                            Terms &amp; Conditions
                          </a>
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="mt-1.5 text-[13px]" style={{ color: "#c41e3a" }} role="alert">{errors.terms}</p>
                      )}
                    </div>
                    {submitError && (
                      <p className="rounded-xl bg-[#FDECEF] px-4 py-3 text-[14px]" style={{ color: "#c41e3a" }} role="alert">
                        {submitError}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Footer: always visible */}
              <div
                className="flex-shrink-0 flex items-center justify-between gap-3 border-t px-4 sm:px-6 pt-4"
                style={{ borderColor: "#F0F0F0", paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
              >
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] font-semibold text-navy hover:bg-[#F4F6FF] transition-colors"
                    style={{ borderColor: "#D7DAE8" }}
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-full bg-golden hover:bg-golden-hover text-black px-8 py-3 text-[15px] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {step === 0 ? "Continue" : submitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default function ConsultationPopup({ open, ...rest }: ConsultationPopupProps) {
  return <AnimatePresence>{open && <PopupBody {...rest} />}</AnimatePresence>;
}
