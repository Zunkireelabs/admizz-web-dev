"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { event } from "./content";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const INITIAL: FormState = { firstName: "", lastName: "", email: "", phone: "" };

const CRM_ENDPOINT = "https://edgex.zunkireelabs.com/api/public/submit/admizz/ielts-strategy-workshop-registration";
const CRM_API_KEY = "crm_live_UVtPfdXD6lIZ0S5lSeny9Clv3jKzbGUGM8sgK2Gm3tw";

const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
const isValidPhone = (v: string) => /^\d{7,10}$/.test(v.replace(/\D/g, ""));
const isFormValid = (f: FormState) =>
  f.firstName.trim().length >= 2 && isValidEmail(f.email) && isValidPhone(f.phone);

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));
  const touch = (field: string) => setTouched((t) => ({ ...t, [field]: true }));
  const valid = isFormValid(form);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, email: true, phone: true });
    if (!valid || submitting) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch(CRM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CRM_API_KEY}`,
        },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim() || null,
          email: form.email.trim(),
          phone: `+977 ${form.phone.trim()}`,
          intake_source: "Website",
          intake_medium: params.get("utm_medium") || "Organic",
          intake_campaign: params.get("utm_campaign") || event.slug,
          intake_account: window.location.pathname,
          custom_fields: {
            event: event.sessionTitle,
            event_date: event.dateLabel,
          },
        }),
      });

      if (!res.ok) throw new Error(`CRM responded ${res.status}`);
      setDone(true);
    } catch (err) {
      console.error("[ielts-workshop] registration submit failed:", err);
      setSubmitError("Something went wrong — please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-6"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-golden/15 flex items-center justify-center mb-5">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#FCB730" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[20px] font-bold text-navy mb-2" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>
          You&apos;re in{form.firstName.trim() ? `, ${form.firstName.trim()}` : ""}!
        </h3>
        <p className="text-[14px] text-gray-dark leading-relaxed">
          See you on {event.dateLabel} at {event.timeLabel}. The Google Meet link will be emailed to you before the session.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <h3 className="text-[20px] font-bold text-navy mb-1" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>
        {event.ctaText}
      </h3>
      <p className="text-[13px] text-gray-dark mb-5">
        {event.dateLabel} · {event.timeLabel} · {event.venue}
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="First name"
            value={form.firstName}
            onChange={(v) => set({ firstName: v })}
            onBlur={() => touch("firstName")}
            error={touched.firstName && form.firstName.trim().length < 2 ? "Enter your first name" : null}
            placeholder="First name"
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            value={form.lastName}
            onChange={(v) => set({ lastName: v })}
            placeholder="Last name"
            autoComplete="family-name"
          />
        </div>
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => set({ email: v })}
          onBlur={() => touch("email")}
          error={touched.email && !isValidEmail(form.email) ? "Enter a valid email" : null}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => set({ phone: v.replace(/[^\d+ ]/g, "") })}
          onBlur={() => touch("phone")}
          error={touched.phone && !isValidPhone(form.phone) ? "Enter a valid phone number" : null}
          placeholder="98XXXXXXXX"
          autoComplete="tel"
        />
      </div>

      {submitError && <p className="mt-3 text-[13px] text-error">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] transition-opacity disabled:opacity-60"
      >
        {submitting ? "Reserving…" : `${event.ctaText} →`}
      </button>

      <p className="mt-3 text-[11px] text-center text-gray-dark">{event.scarcityLine}</p>
    </form>
  );
}

function Field({
  label, value, onChange, onBlur, error, placeholder, type = "text", autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | null;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-navy mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-[10px] border px-3.5 py-2.5 text-[14px] text-navy outline-none transition-colors focus:border-golden ${
          error ? "border-error" : "border-border-light"
        }`}
      />
      {error && <span className="block mt-1 text-[12px] text-error">{error}</span>}
    </label>
  );
}
