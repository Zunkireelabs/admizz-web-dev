"use client";

import { useState } from "react";
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

export interface ConsultationFormOptions {
  /** Country name as used on the page ("the UK", "Germany"); pre-selects the destination */
  countryName?: string;
  /** Attribution tag sent to the CRM, e.g. "country-germany" */
  formSource?: string;
  /** Values the visitor already typed elsewhere (e.g. an inline hero form) */
  prefill?: { fullName?: string; country?: string; phone?: string };
}

// Same fields as before, split across three short screens. The CRM payload is unchanged.
export const STEPS = [
  { pill: "About you", title: "Tell us about yourself", subtitle: "Quick basics. It takes under a minute." },
  { pill: "Contact", title: "How can we reach you?", subtitle: "We'll send your study plan here." },
  { pill: "Study plan", title: "What would you like to study?", subtitle: "Pick your destination, program and level." },
];
export const LAST_STEP = STEPS.length - 1;

/** Maps a page country name ("the UK", "New Zealand") to the CRM destination value ("uk", "new_zealand") */
export function destinationValueFor(countryName?: string): string {
  if (!countryName) return "";
  const value = countryName.replace(/^the /i, "").trim().toLowerCase().replace(/\s+/g, "_");
  return DESTINATION_OPTIONS.some((o) => o.value === value) ? value : "";
}

/** Dial code for a CRM country value ("nepal" → "+977"); "" for "Other" */
export function dialFor(country: string): string {
  return COUNTRY_OPTIONS.find((c) => c.value === country)?.dial ?? "";
}

/** Phone check shared by the popup and the hero card: +977 needs exactly 10 digits, others at least 6 */
export function phoneError(dial: string, phone: string): string | undefined {
  if (!phone) return "Phone number is required";
  if (dial === "+977" ? phone.length !== 10 : phone.length < 6)
    return "Enter a valid phone number for the selected country";
}

/** Step state, validation and CRM submission shared by the popup and the inline card */
export function useConsultationForm({ countryName, formSource = "consultation", prefill }: ConsultationFormOptions) {
  const [prefillFirst = "", ...prefillRest] = (prefill?.fullName ?? "").trim().split(/\s+/);
  const prefillCountry = prefill?.country || "nepal";
  const prefillDial = dialFor(prefillCountry);
  // Keep digits only, and drop the dial code if the visitor typed it into the number too
  const prefillDigits = (prefill?.phone ?? "").replace(/\D/g, "").slice(0, 15);
  const dialDigits = prefillDial.replace("+", "");
  const withoutDial = dialDigits && prefillDigits.startsWith(dialDigits) ? prefillDigits.slice(dialDigits.length) : prefillDigits;
  const prefillPhone =
    phoneError(prefillDial, prefillDigits) && !phoneError(prefillDial, withoutDial) ? withoutDial : prefillDigits;
  const initialForm = (): FormState => ({
    firstName: prefillFirst,
    lastName: prefillRest.join(" "),
    email: "",
    country: prefillCountry,
    phone: prefillPhone,
    city: "",
    destination: destinationValueFor(countryName),
    program: "",
    level: "",
    terms: false,
  });

  const [form, setForm] = useState<FormState>(initialForm);
  // Skip "About you" when the hero card already gave a full name and a valid phone
  const [step, setStep] = useState(() =>
    prefillFirst && prefillRest.length > 0 && !phoneError(prefillDial, prefillPhone) ? 1 : 0,
  );
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const dial = dialFor(form.country);

  const set = (patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch) as (keyof FormState)[]) delete next[key];
      return next;
    });
  };

  const validate = (forStep: number): boolean => {
    const next: Errors = {};
    if (forStep === 0) {
      if (!form.firstName.trim()) next.firstName = "First name is required";
      if (!form.lastName.trim()) next.lastName = "Last name is required";
      const phoneMsg = phoneError(dial, form.phone);
      if (phoneMsg) next.phone = phoneMsg;
    } else if (forStep === 1) {
      if (!form.email.trim()) next.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address";
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
    if (validate(step)) setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!validate(LAST_STEP)) return;
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

  /** Next on screens 1–2, submit on the last screen */
  const advance = () => {
    if (step < LAST_STEP) goNext();
    else submit();
  };

  /** Screen heading; greets the visitor by first name after screen 1 */
  const title =
    step > 0 && form.firstName.trim()
      ? `Hi ${form.firstName.trim()}, ${STEPS[step].title.charAt(0).toLowerCase()}${STEPS[step].title.slice(1)}`
      : STEPS[step].title;

  return { form, set, step, errors, dial, submitting, submitError, done, advance, goBack, title };
}

export type ConsultationFormState = ReturnType<typeof useConsultationForm>;

/** Everyday names students type for countries whose list name differs (search only; CRM values unchanged) */
const COUNTRY_SEARCH_NAMES: Record<string, string[]> = {
  usa: ["usa", "us", "america", "united states of america"],
  uk: ["uk", "gb", "great britain", "britain", "england", "scotland", "wales", "northern ireland"],
  uae: ["dubai", "abu dhabi", "sharjah", "emirates", "united arab emirates"],
  south_korea: ["korea", "republic of korea"],
  czech_republic: ["czechia"],
  netherlands: ["holland"],
  bosnia: ["bosnia and herzegovina", "herzegovina"],
  taiwan: ["chinese taipei"],
  myanmar: ["burma"],
  turkey: ["turkiye"],
  north_macedonia: ["macedonia"],
  trinidad_tobago: ["trinidad and tobago", "tobago"],
  hong_kong: ["hk"],
  saudi_arabia: ["ksa", "saudi"],
};

export const countryOptions = COUNTRY_OPTIONS.map((c) => ({
  label: c.dial ? `${c.label} (${c.dial})` : c.label,
  value: c.value,
  keywords: COUNTRY_SEARCH_NAMES[c.value] ?? [],
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

/** Step pills: "1 About you · 2 Contact · 3 Study plan" */
export function StepPills({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
      {STEPS.map(({ pill: label }, i) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-1 text-[12px] font-semibold whitespace-nowrap transition-colors"
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
  );
}

/**
 * The fields for the current screen. `focusOnMount` controls whether screen 1
 * grabs focus (yes in the popup, no in the inline card so the page doesn't jump).
 */
export function StepFields({
  f,
  idPrefix,
  focusOnMount = true,
}: {
  f: ConsultationFormState;
  idPrefix: string;
  focusOnMount?: boolean;
}) {
  const { form, set, step, errors, dial, submitError } = f;
  const id = (name: string) => `${idPrefix}-${name}`;
  const borderFor = (key: keyof FormState) => ({ borderColor: errors[key] ? "#c41e3a" : "#D7DAE8" });

  if (step === 0)
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" htmlFor={id("first")} error={errors.firstName}>
            <input id={id("first")} autoFocus={focusOnMount} autoComplete="given-name" className={inputClass} style={borderFor("firstName")} placeholder="First name" value={form.firstName} onChange={(e) => set({ firstName: e.target.value })} />
          </Field>
          <Field label="Last name" htmlFor={id("last")} error={errors.lastName}>
            <input id={id("last")} autoComplete="family-name" className={inputClass} style={borderFor("lastName")} placeholder="Last name" value={form.lastName} onChange={(e) => set({ lastName: e.target.value })} />
          </Field>
        </div>
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
      </div>
    );

  if (step === 1)
    return (
      <div className="space-y-4">
        <Field label="Email address" htmlFor={id("email")} error={errors.email}>
          <input id={id("email")} type="email" autoFocus autoComplete="email" className={inputClass} style={borderFor("email")} placeholder="you@example.com" value={form.email} onChange={(e) => set({ email: e.target.value })} />
        </Field>
        <Field label="City (optional)" htmlFor={id("city")}>
          <input id={id("city")} autoComplete="address-level2" className={inputClass} style={borderFor("city")} placeholder="Enter your city name" value={form.city} onChange={(e) => set({ city: e.target.value })} />
        </Field>
      </div>
    );

  return (
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
  );
}
