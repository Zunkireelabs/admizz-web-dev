"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "@/lib/supabase";

interface RegisterFormProps {
  onStepChange?: (step: number) => void;
  onSubmitSuccess?: () => void;
  hideInternalSuccess?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Theme per step                                                     */
/* ------------------------------------------------------------------ */

const STEP_THEME = [
  { accent: "#4F7DEB", deep: "#2954C7", bg: "#EBF3FF", shadow: "rgba(79,125,235,0.28)",  label: "You"         },
  { accent: "#D89218", deep: "#A86E0E", bg: "#FFF8E5", shadow: "rgba(216,146,24,0.28)",  label: "Goal"        },
  { accent: "#4FBFA8", deep: "#2F9D85", bg: "#EDFAF7", shadow: "rgba(79,191,168,0.28)",  label: "Finish"      },
] as const;

type StepTheme = typeof STEP_THEME[number];

/* ------------------------------------------------------------------ */
/*  Types & data                                                       */
/* ------------------------------------------------------------------ */

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dialCode: string;
  phone: string;
  countries: string[];
  intake: string;
  field: string;
  education: string;
  contactPref: string;
};

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  dialCode: "+977",
  phone: "",
  countries: [],
  intake: "",
  field: "",
  education: "",
  contactPref: "",
};

const DIAL_CODES = [
  { code: "+977", label: "🇳🇵 +977" },
  { code: "+91",  label: "🇮🇳 +91"  },
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+260", label: "🇿🇲 +260" },
  { code: "+44",  label: "🇬🇧 +44"  },
  { code: "+1",   label: "🇺🇸 +1"   },
  { code: "+61",  label: "🇦🇺 +61"  },
  { code: "+1",   label: "🇨🇦 +1"   },
  { code: "+64",  label: "🇳🇿 +64"  },
  { code: "+49",  label: "🇩🇪 +49"  },
  { code: "+971", label: "🇦🇪 +971" },
];

const COUNTRIES = ["🇬🇧 UK", "🇺🇸 USA", "🇨🇦 Canada", "🇦🇺 Australia", "🇮🇳 India", "🇩🇪 Germany", "🌍 Other"];
const INTAKES   = ["Fall 2026", "Spring 2027", "Fall 2027", "Still exploring"];

const FIELD_OTHER = "✏️ Other";
const FIELDS = [
  "💼 Business & Management",
  "⚙️ Engineering & Technology",
  "💻 IT & Computer Science",
  "🏥 Nursing & Healthcare",
  "🏨 Hospitality & Tourism",
  "⚖️ Law",
  "📚 Education & Teaching",
  "🔬 Sciences",
  "🎨 Arts & Design",
  FIELD_OTHER,
];

const EDUCATION_LEVELS = [
  "🏫 High school / +2",
  "🎓 Bachelor's degree",
  "📜 Master's degree",
  "📋 Other",
];

const CONTACT_PREFS = ["📞 Phone call", "💬 WhatsApp", "↔️ Either"];

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

function isStepValid(step: number, form: FormData): boolean {
  if (step === 0)
    return (
      form.firstName.trim().length >= 2 &&
      /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
      form.phone.trim().replace(/\D/g, "").length >= 6
    );
  if (step === 1) {
    const fieldValid = form.field.trim().length >= 2 && form.field !== FIELD_OTHER;
    return form.countries.length >= 1 && form.countries.length <= 3 && form.intake.length > 0 && fieldValid;
  }
  if (step === 2)
    return form.education.length > 0 && form.contactPref.length > 0;
  return false;
}

function fieldError(field: keyof FormData, form: FormData): string | null {
  if (field === "firstName" && form.firstName.length > 0 && form.firstName.trim().length < 2)
    return "Please enter your first name.";
  if (field === "email" && form.email.length > 0 && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
    return "Please enter a valid email address.";
  if (field === "phone" && form.phone.length > 0 && form.phone.replace(/\D/g, "").length < 6)
    return "Please enter a valid phone number.";
  return null;
}

/* ------------------------------------------------------------------ */
/*  Step indicator — labeled pills with animated connector             */
/* ------------------------------------------------------------------ */

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-start mb-8">
      {STEP_THEME.map((s, i) => {
        const done   = i < step;
        const active = i === step;
        return (
          <div key={i} className="flex items-start" style={{ flex: i < 2 ? "1" : "none" }}>
            {/* Dot + label */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <motion.div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                animate={{
                  background: done ? s.accent : active ? s.accent : "#E8ECF4",
                  boxShadow: active ? `0 0 0 4px ${s.bg}, 0 0 0 5px ${s.accent}40` : "none",
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ color: done || active ? "#FFFFFF" : "#9CA3AF" }}
              >
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.svg key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                      className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  ) : (
                    <motion.span key="num" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{i + 1}</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-[0.1em]"
                style={{ color: active ? s.accent : done ? s.accent + "99" : "#C4CDD6" }}>
                {s.label}
              </span>
            </div>

            {/* Connector line */}
            {i < 2 && (
              <div className="flex-1 h-[2px] mx-2 mt-[13px] rounded-full overflow-hidden" style={{ background: "#E8ECF4" }}>
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: i < step ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: `linear-gradient(90deg, ${STEP_THEME[i].accent}, ${STEP_THEME[i + 1].accent})` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TextField — inline green ✓ + theme-aware focus border             */
/* ------------------------------------------------------------------ */

type FieldProps = {
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  error: string | null;
  autoComplete?: string;
  isValid?: boolean;
  theme: StepTheme;
};

function TextField({ label, name, type = "text", value, placeholder, onChange, error, autoComplete, isValid, theme }: FieldProps) {
  const [touched, setTouched] = useState(false);
  const showError = touched && !!error;
  const showValid = isValid && !showError;

  return (
    <label className="block">
      <span className="block text-[12px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "#0D1282" }}>
        {label}
      </span>
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className="w-full rounded-xl px-4 py-3 pr-10 text-[14px] outline-none transition-all duration-200"
          style={{
            background: showValid ? theme.bg : "#FFFFFF",
            border: `1.5px solid ${showError ? "#E04562" : showValid ? theme.accent : "#E0E6F2"}`,
            color: "#0D1282",
          }}
          onFocus={(e) => {
            if (!showError && !showValid) e.currentTarget.style.borderColor = theme.accent;
          }}
          onBlurCapture={(e) => {
            if (!showError && !showValid) e.currentTarget.style.borderColor = "#E0E6F2";
          }}
        />
        <AnimatePresence>
          {showValid && (
            <motion.span key="valid-check"
              initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {showError && (
        <span className="block mt-1.5 text-[12px] font-medium" style={{ color: "#E04562" }}>{error}</span>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  ChipPicker — gradient selection + spring + checkmark + theme      */
/* ------------------------------------------------------------------ */

function ChipPicker({
  label,
  helper,
  options,
  value,
  onChange,
  multi = false,
  max,
  theme,
  grid = false,
}: {
  label: string;
  helper?: string;
  options: string[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multi?: boolean;
  max?: number;
  theme: StepTheme;
  grid?: boolean;
}) {
  const isSelected = (opt: string) => multi ? (value as string[]).includes(opt) : value === opt;

  const handleToggle = (opt: string) => {
    if (multi) {
      const current = value as string[];
      if (current.includes(opt)) {
        onChange(current.filter((c) => c !== opt));
      } else {
        if (max && current.length >= max) return;
        onChange([...current, opt]);
      }
    } else {
      onChange(opt);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: "#0D1282" }}>{label}</span>
        {helper && <span className="text-[11px]" style={{ color: "#5C7189" }}>{helper}</span>}
      </div>
      <div className={grid ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"}>
        {options.map((opt) => {
          const selected = isSelected(opt);
          return (
            <motion.button
              key={opt}
              type="button"
              onClick={() => handleToggle(opt)}
              whileTap={{ scale: 0.92 }}
              animate={selected ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-full text-[13px] font-semibold flex items-center gap-1.5 transition-all duration-200 ${grid ? "px-3 py-1.5 justify-center" : "px-4 py-2"}`}
              style={{
                background: selected ? "#FDED22" : "#FFFFFF",
                color: selected ? "#001353" : "#374151",
                border: `1.5px solid ${selected ? "#FDED22" : "#E0E6F2"}`,
                boxShadow: selected ? "0 4px 14px rgba(253,237,34,0.45)" : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <AnimatePresence>
                {selected && (
                  <motion.svg key="chip-check"
                    initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 13 }} exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    viewBox="0 0 24 24" fill="none" stroke="#001353" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ height: 13, flexShrink: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                )}
              </AnimatePresence>
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step views                                                         */
/* ------------------------------------------------------------------ */

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <motion.h3 key={title}
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-[20px] md:text-[22px] font-bold mb-1"
        style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
      >
        {title}
      </motion.h3>
      <p className="text-[13px]" style={{ color: "#5C7189" }}>{subtitle}</p>
    </div>
  );
}

function Step1({ form, set, theme }: { form: FormData; set: (p: Partial<FormData>) => void; theme: StepTheme }) {
  return (
    <div>
      <StepHeading title="Tell us about yourself" subtitle="Quick basics — under 30 seconds." />
      <div className="space-y-4">
        {/* First + Last name side by side */}
        <div className="grid grid-cols-2 gap-3">
          <TextField label="First name" name="firstName" value={form.firstName} placeholder="First name"
            autoComplete="given-name" onChange={(v) => set({ firstName: v })}
            error={fieldError("firstName", form)} isValid={form.firstName.trim().length >= 2} theme={theme} />
          <TextField label="Last name" name="lastName" value={form.lastName} placeholder="Last name"
            autoComplete="family-name" onChange={(v) => set({ lastName: v })}
            error={null} isValid={form.lastName.trim().length >= 1} theme={theme} />
        </div>
        <TextField label="Email" name="email" type="email" value={form.email} placeholder="you@example.com"
          autoComplete="email" onChange={(v) => set({ email: v })}
          error={fieldError("email", form)} isValid={/^\S+@\S+\.\S+$/.test(form.email.trim())} theme={theme} />
        {/* Phone with dial code selector */}
        <div>
          <span className="block text-[12px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "#0D1282" }}>Phone</span>
          <div className="flex gap-2">
            <select
              value={form.dialCode}
              onChange={(e) => set({ dialCode: e.target.value })}
              className="rounded-xl px-3 py-3 text-[13px] outline-none flex-shrink-0"
              style={{ border: "1.5px solid #E0E6F2", color: "#0D1282", background: "#FFFFFF", minWidth: 104 }}
            >
              {DIAL_CODES.map((d) => (
                <option key={d.label} value={d.code}>{d.label}</option>
              ))}
            </select>
            <div className="relative flex-1">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set({ phone: e.target.value })}
                placeholder="98xxxxxxxx"
                autoComplete="tel-national"
                className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all duration-200"
                style={{
                  border: `1.5px solid ${fieldError("phone", form) && form.phone.length > 0 ? "#E04562" : form.phone.replace(/\D/g, "").length >= 6 ? theme.accent : "#E0E6F2"}`,
                  color: "#0D1282",
                  background: form.phone.replace(/\D/g, "").length >= 6 ? theme.bg : "#FFFFFF",
                }}
              />
            </div>
          </div>
          {fieldError("phone", form) && form.phone.length > 0 && (
            <span className="block mt-1.5 text-[12px] font-medium" style={{ color: "#E04562" }}>{fieldError("phone", form)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

const STEP2_HEADINGS = [
  { title: () => "Where do you want to study?", subtitle: "Pick your destination" },
  { title: () => "When do you plan to start?",  subtitle: "Pick your intended intake."   },
  { title: () => "What do you want to study?",  subtitle: "Choose your field of study."  },
];

function Step2({
  form, set, firstName, theme, subStep, setSubStep,
}: {
  form: FormData;
  set: (p: Partial<FormData>) => void;
  firstName: string;
  theme: StepTheme;
  subStep: number;
  setSubStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const chipValue  = form.field === "" || FIELDS.includes(form.field) ? form.field : FIELD_OTHER;
  const showCustom = form.field === FIELD_OTHER || (form.field !== "" && !FIELDS.includes(form.field));
  const customText = FIELDS.includes(form.field) ? "" : form.field;
  const heading    = STEP2_HEADINGS[subStep];

  return (
    <div>
      {/* Sub-step progress bar */}
      <div className="flex gap-1.5 mb-5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1 rounded-full flex-1"
            animate={{ background: i <= subStep ? theme.accent : "#E0E6F2" }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <div className="mb-5">
        <motion.h3
          key={subStep}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-[20px] md:text-[22px] font-bold mb-1"
          style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
        >
          {heading.title()}
        </motion.h3>
        <p className="text-[13px]" style={{ color: "#5C7189" }}>{heading.subtitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {subStep === 0 && (
          <motion.div
            key="countries"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChipPicker
              label="Destinations"
              options={COUNTRIES} value={form.countries}
              onChange={(v) => set({ countries: v as string[] })}
              multi max={3} theme={theme}
            />
            <AnimatePresence>
              {form.countries.length >= 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  onClick={() => setSubStep(1)}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.deep})`,
                    color: "#FFFFFF",
                    boxShadow: `0 4px 14px ${theme.shadow}`,
                  }}
                >
                  Next
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {subStep === 1 && (
          <motion.div
            key="intake"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChipPicker
              label="Intake" options={INTAKES} value={form.intake}
              onChange={(v) => { set({ intake: v as string }); setTimeout(() => setSubStep(2), 320); }}
              theme={theme}
            />
          </motion.div>
        )}

        {subStep === 2 && (
          <motion.div
            key="field"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChipPicker
              label="Field of study" options={FIELDS} value={chipValue}
              onChange={(v) => set({ field: v as string })}
              theme={theme} grid
            />
            {showCustom && (
              <motion.input
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                type="text" value={customText}
                onChange={(e) => set({ field: e.target.value })}
                placeholder="Please specify your field…"
                className="mt-3 w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all"
                style={{ background: theme.bg, border: `1.5px solid ${theme.accent}`, color: "#0D1282" }}
                autoFocus
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Step3({ form, set, firstName, theme }: { form: FormData; set: (p: Partial<FormData>) => void; firstName: string; theme: StepTheme }) {
  return (
    <div>
      <StepHeading
        title={firstName ? `Almost done, ${firstName}!` : "Almost done"}
        subtitle="Two more taps and a counsellor will reach out."
      />
      <div className="space-y-5">
        <ChipPicker label="Highest education completed" options={EDUCATION_LEVELS}
          value={form.education} onChange={(v) => set({ education: v as string })} theme={theme} />
        <ChipPicker label="How should we reach you?" options={CONTACT_PREFS}
          value={form.contactPref} onChange={(v) => set({ contactPref: v as string })} theme={theme} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success state                                                      */
/* ------------------------------------------------------------------ */

function SuccessCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-4"
    >
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg, #4FBFA8, #2F9D85)" }}
      >
        <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <motion.polyline points="20 6 9 17 4 12" />
        </motion.svg>
      </motion.div>
      <h3 className="text-[22px] md:text-[24px] font-bold mb-2"
        style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}>
        We&rsquo;ve got your details!
      </h3>
      <p className="text-[14px] md:text-[15px] leading-relaxed mb-7" style={{ color: "#5C7189" }}>
        A counsellor will reach out within 24 hours. No pressure, no spam.
      </p>
      <a href="https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%20just%20registered"
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-md"
        style={{ background: "#25D366", color: "#FFFFFF", minHeight: 48 }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        Talk to us on WhatsApp now
      </a>
      <div className="mt-5">
        <a href="/blogs" className="text-[13px] font-semibold hover:underline" style={{ color: "#4F7DEB" }}>
          While you wait, explore our study-abroad guides →
        </a>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const CRM_ENDPOINT = "https://dev-lead-crm.zunkireelabs.com/api/public/submit/admizz/registration-form";
const CRM_API_KEY  = "crm_live_UVtPfdXD6lIZ0S5lSeny9Clv3jKzbGUGM8sgK2Gm3tw";

export default function RegisterForm({ onStepChange, onSubmitSuccess, hideInternalSuccess }: RegisterFormProps = {}) {
  const [step, setStep]               = useState(0);
  const [step2SubStep, setStep2SubStep] = useState(0);
  const [form, setForm]               = useState<FormData>(INITIAL);
  const [submitting, setSubmitting]   = useState(false);
  const [done, setDone]               = useState(false);

  useEffect(() => { onStepChange?.(step); }, [step, onStepChange]);
  useEffect(() => { if (step !== 1) setStep2SubStep(0); }, [step]);

  const set       = (patch: Partial<FormData>) => setForm((f) => ({ ...f, ...patch }));
  const firstName = form.firstName.trim();
  const theme     = STEP_THEME[step];
  const stepValid = isStepValid(step, form);

  const next = () => { if (!stepValid) return; setStep((s) => Math.min(s + 1, 2)); };
  const back = () => {
    if (step === 1 && step2SubStep > 0) { setStep2SubStep((s) => s - 1); return; }
    setStep((s) => Math.max(s - 1, 0));
  };

  const postToCRM = (payload: FormData) => {
    return fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CRM_API_KEY}`,
      },
      body: JSON.stringify({
        first_name: payload.firstName.trim(),
        last_name:  payload.lastName.trim() || null,
        email:      payload.email.trim(),
        phone:      `${payload.dialCode} ${payload.phone.trim()}`,
        custom_fields: {
          countries:          payload.countries.join(", "),
          intake:             payload.intake,
          field_of_study:     payload.field,
          education_level:    payload.education,
          contact_preference: payload.contactPref,
          source:             "website",
        },
      }),
    });
  };

  const submit = async () => {
    if (!stepValid) return;
    setSubmitting(true);
    try {
      const [supabaseResult] = await Promise.allSettled([
        supabase.from("register_leads").insert({
          id:           crypto.randomUUID(),
          full_name:    `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          email:        form.email.trim(),
          phone:        `${form.dialCode} ${form.phone.trim()}`,
          countries:    form.countries.join(", "),
          intake:       form.intake,
          field:        form.field,
          education:    form.education,
          contact_pref: form.contactPref,
          status:       "new",
          source:       "website",
        }),
        postToCRM(form),
      ]);

      if (supabaseResult.status === "rejected") throw supabaseResult.reason;
      if (supabaseResult.value.error) throw supabaseResult.value.error;

      setDone(true);
      onSubmitSuccess?.();
    } catch (err) {
      console.error("register-v2 submit error", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (done && !hideInternalSuccess) return <SuccessCard />;
  if (done && hideInternalSuccess) return null;

  return (
    <div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div key={step}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <Step1 form={form} set={set} theme={theme} />}
            {step === 1 && <Step2 form={form} set={set} firstName={firstName} theme={theme} subStep={step2SubStep} setSubStep={setStep2SubStep} />}
            {step === 2 && <Step3 form={form} set={set} firstName={firstName} theme={theme} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav — sticky to the bottom of the nearest scroll container (e.g. modal) */}
      <div
        className="sticky bottom-0 bg-white mt-7 pt-4 pb-1 border-t flex items-center justify-between gap-4 z-10"
        style={{ borderColor: "#F0F0F0", boxShadow: "0 -10px 18px -12px rgba(15,23,42,0.10)" }}
      >
        {step > 0 ? (
          <button type="button" onClick={back}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
            style={{ color: "#5C7189" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        ) : (
          <span />
        )}

        {step < 2 ? (
          <motion.button type="button" onClick={next} disabled={!stepValid}
            whileTap={stepValid ? { scale: 0.96 } : {}}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold transition-all"
            style={{
              background: stepValid ? `linear-gradient(135deg, ${theme.accent}, ${theme.deep})` : "#F0F0F0",
              color: stepValid ? "#FFFFFF" : "#9CA3B5",
              minHeight: 48,
              cursor: stepValid ? "pointer" : "not-allowed",
              boxShadow: stepValid ? `0 6px 20px ${theme.shadow}` : "none",
            }}
            onMouseEnter={(e) => { if (stepValid) e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Continue
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        ) : (
          <motion.button type="button" onClick={submit} disabled={!stepValid || submitting}
            whileTap={stepValid && !submitting ? { scale: 0.96 } : {}}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold transition-all"
            style={{
              background: stepValid && !submitting ? `linear-gradient(135deg, ${theme.accent}, ${theme.deep})` : "#F0F0F0",
              color: stepValid && !submitting ? "#FFFFFF" : "#9CA3B5",
              minHeight: 48,
              cursor: stepValid && !submitting ? "pointer" : "not-allowed",
              boxShadow: stepValid && !submitting ? `0 6px 20px ${theme.shadow}` : "none",
            }}
          >
            {submitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                  <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
                </svg>
                Submitting…
              </>
            ) : (
              <>
                Submit
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
