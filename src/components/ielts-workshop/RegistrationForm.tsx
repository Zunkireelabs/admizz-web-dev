"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type RefObject } from "react";
import { motion } from "framer-motion";
import { event } from "./content";
import { DIAL_CODES, dialSpec, phoneDigits } from "@/lib/dialCodes";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import { getUtmAttribution } from "@/lib/attribution/utmStorage";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  dialCode: string;
  phone: string;
  studyLevel: string;
  destination: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  dialCode: "NP",
  phone: "",
  studyLevel: "",
  destination: "",
};

const CRM_ENDPOINT = "https://edgex.zunkireelabs.com/api/public/submit/admizz/ielts-strategy-workshop-registration";
const CRM_API_KEY = "crm_live_UVtPfdXD6lIZ0S5lSeny9Clv3jKzbGUGM8sgK2Gm3tw";

const STUDY_LEVELS = ["Diploma", "Bachelors", "Masters", "PhD"];

const DESTINATIONS = [
  "UK", "USA", "Canada", "Australia",
  "India", "Germany", "Finland", "Sweden",
  "New Zealand", "France", "Nepal", "Other",
];

const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
const isValidPhone = (dialCode: string, phone: string) => {
  const local = phone.trim();
  if (!local) return false;
  try {
    return isValidPhoneNumber(`${dialSpec(dialCode).dial}${local}`);
  } catch {
    return false;
  }
};
const isFormValid = (f: FormState) =>
  f.firstName.trim().length >= 2 && isValidEmail(f.email) && isValidPhone(f.dialCode, f.phone);

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
      const { utm_source, utm_medium, utm_campaign } = getUtmAttribution();
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
          phone: `${dialSpec(form.dialCode).dial} ${form.phone.trim()}`,
          intake_source: utm_source || "Website",
          intake_medium: utm_medium,
          intake_campaign: utm_campaign || event.slug,
          intake_account: window.location.pathname,
          custom_fields: {
            event: event.sessionTitle,
            event_date: event.dateLabel,
            // Keys must match the CRM's recognized synonym lists in
            // lib/leads/destination-normalize.ts, or the values get silently
            // orphaned in custom_fields instead of populating the real
            // leads.degree_level / leads.destinations columns.
            degree_level: form.studyLevel || null,
            dream_destination: form.destination || null,
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
        <div>
          <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-navy mb-1.5">Phone</span>
          <div className="flex gap-2">
            <PhoneCountrySelect value={form.dialCode} onChange={(key) => set({ dialCode: key })} />
            <input
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => set({ phone: phoneDigits(e.target.value).slice(0, 15) })}
              onBlur={() => touch("phone")}
              placeholder="Phone number"
              autoComplete="tel-national"
              className={`w-full min-w-0 rounded-[10px] border px-3.5 py-2.5 text-[14px] text-navy outline-none transition-colors focus:border-golden ${
                touched.phone && !isValidPhone(form.dialCode, form.phone) ? "border-error" : "border-border-light"
              }`}
            />
          </div>
          {touched.phone && !isValidPhone(form.dialCode, form.phone) && (
            <span className="block mt-1 text-[12px] text-error">
              Please enter a valid phone number for the selected country.
            </span>
          )}
        </div>
        <SimpleSelect
          label="Dream destination"
          options={DESTINATIONS}
          value={form.destination}
          onChange={(v) => set({ destination: v })}
          placeholder="Select destination"
        />
        <ChipGroup
          label="Study level"
          options={STUDY_LEVELS}
          value={form.studyLevel}
          onChange={(v) => set({ studyLevel: v })}
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

function useCloseOnOutsideClick(open: boolean, rootRef: RefObject<HTMLDivElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, rootRef, close]);
}

function PhoneCountrySelect({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const spec = dialSpec(value);

  useCloseOnOutsideClick(open, rootRef, () => setOpen(false));

  useEffect(() => {
    if (open) {
      setSearch("");
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DIAL_CODES;
    return DIAL_CODES.filter(
      (d) => d.country.toLowerCase().includes(q) || d.dial.includes(q) || d.key.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div ref={rootRef} className="relative flex-shrink-0" style={{ width: 148 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="w-full flex items-center justify-between gap-1 rounded-[10px] border border-border-light pl-3 pr-2.5 py-2.5 text-[13px] text-navy outline-none focus:border-golden"
      >
        <span className="truncate">{spec.country} ({spec.dial})</span>
        <svg
          className="w-3 h-3 flex-shrink-0 text-navy transition-transform"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 mt-1.5 rounded-[10px] border border-border-light bg-white shadow-xl overflow-hidden" style={{ width: 260, maxWidth: "calc(100vw - 2.5rem)" }}>
          <div className="p-2 border-b border-border-light">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or dial code…"
              className="w-full rounded-[8px] border border-border-light px-2.5 py-1.5 text-[13px] text-navy outline-none focus:border-golden"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1" role="listbox">
            {filtered.length === 0 ? (
              <li className="px-3 py-2.5 text-[13px] text-gray-dark">No matches</li>
            ) : (
              filtered.map((d) => {
                const active = d.key === value;
                return (
                  <li
                    key={d.key}
                    role="option"
                    aria-selected={active}
                    onClick={() => { onChange(d.key); setOpen(false); }}
                    className={`flex items-center justify-between gap-3 px-3 py-2 text-[13px] cursor-pointer ${
                      active ? "bg-golden/15 text-navy font-semibold" : "text-navy hover:bg-off-white"
                    }`}
                  >
                    <span className="truncate">{d.country}</span>
                    <span className="flex-shrink-0 text-gray-dark">{d.dial}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function SimpleSelect({
  label, options, value, onChange, placeholder,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useCloseOnOutsideClick(open, rootRef, () => setOpen(false));

  return (
    <div>
      <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-navy mb-1.5">{label}</span>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`w-full flex items-center justify-between gap-2 rounded-[10px] border border-border-light pl-3.5 pr-3 py-2.5 text-[14px] outline-none focus:border-golden ${
            value ? "text-navy" : "text-gray-dark"
          }`}
        >
          <span className="truncate">{value || placeholder}</span>
          <svg
            className="w-3 h-3 flex-shrink-0 text-navy transition-transform"
            style={{ transform: open ? "rotate(180deg)" : undefined }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 top-full left-0 mt-1.5 w-full rounded-[10px] border border-border-light bg-white shadow-xl overflow-hidden">
            <ul className="max-h-56 overflow-y-auto py-1" role="listbox">
              {options.map((opt) => {
                const active = opt === value;
                return (
                  <li
                    key={opt}
                    role="option"
                    aria-selected={active}
                    onClick={() => { onChange(active ? "" : opt); setOpen(false); }}
                    className={`px-3.5 py-2 text-[14px] cursor-pointer ${
                      active ? "bg-golden/15 text-navy font-semibold" : "text-navy hover:bg-off-white"
                    }`}
                  >
                    {opt}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ChipGroup({
  label, options, value, onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-navy mb-1.5">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(selected ? "" : opt)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                selected
                  ? "border-yellow bg-yellow text-black"
                  : "border-border-light bg-white text-navy hover:border-golden"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
