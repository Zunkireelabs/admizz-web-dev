"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  destinations,
  getDestKey,
  getDestResult,
  QUIZ_QUESTIONS,
  COUNTRY_CODES,
  WHATSAPP_NUMBER,
  type QuizAnswers,
  type DestinationKey,
} from "@/lib/destination-quiz";

type Phase = "intro" | "quiz" | "lead" | "result";

interface LeadData {
  firstName: string; lastName: string; email: string; code: string; phone: string; destination_matched: string;
}

const EMPTY_LEAD: LeadData = {
  firstName: "", lastName: "", email: "", code: "+977", phone: "", destination_matched: "",
};

const SLIDE = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
  transition: { duration: 0.32 },
};

const DEST_FLAGS = [
  { flag: "🇬🇧", label: "UK" },
  { flag: "🇺🇸", label: "USA" },
  { flag: "🇨🇦", label: "Canada" },
  { flag: "🇦🇺", label: "Australia" },
  { flag: "🇮🇳", label: "India" },
  { flag: "🇩🇪", label: "Germany" },
];

const BRAND_AVATARS = [
  { bg: "#31429C", fg: "#fff",     initial: "A" },
  { bg: "#0D1282", fg: "#fff",     initial: "R" },
  { bg: "#4a5fc4", fg: "#fff",     initial: "S" },
  { bg: "#FDED22", fg: "#001353",  initial: "M" },
  { bg: "#6478d4", fg: "#fff",     initial: "P" },
];

const DEST_GRADIENTS: Record<DestinationKey, string> = {
  uk:        "linear-gradient(135deg, #001353 0%, #8B0000 100%)",
  usa:       "linear-gradient(135deg, #002868 0%, #BF0A30 100%)",
  canada:    "linear-gradient(135deg, #CC0000 0%, #002147 100%)",
  australia: "linear-gradient(135deg, #003580 0%, #1B7340 100%)",
  germany:   "linear-gradient(135deg, #1C1C1C 0%, #CC0000 100%)",
  nz:        "linear-gradient(135deg, #00247D 0%, #CC142B 100%)",
};

function getStepLabel(phase: Phase, step: number): string {
  if (phase === "result") return "✓ Complete";
  if (phase === "lead") return "Step 4 of 4";
  if (phase === "quiz") return `Step ${step + 1} of 4`;
  return "Get Started";
}

/* ── Card header bar ── */
function CardHeader({ phase, step }: { phase: Phase; step: number }) {
  const label = getStepLabel(phase, step);
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border-light bg-white">
      <span className="text-[14px] font-bold text-navy">Destination Finder</span>
      <span className={`text-[13px] font-semibold ${phase === "result" ? "text-emerald-600" : "text-amber-500"}`}>
        {label}
      </span>
    </div>
  );
}

export default function DestinationQuiz() {
  const [phase, setPhase]       = useState<Phase>("intro");
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState<QuizAnswers>({});
  const [lead, setLead]         = useState<LeadData>(EMPTY_LEAD);
  const [consent, setConsent]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [calcMatch, setCalcMatch]   = useState<number>(0);

  useEffect(() => {
    const el = document.getElementById("quiz");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase, step]);

  const progressPct  = Math.min(((step + 1) / 3) * 90, 90);
  const currentQ     = QUIZ_QUESTIONS[step];
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;

  function pickOption(qid: keyof QuizAnswers, val: string) {
    setAnswers((a) => ({ ...a, [qid]: val }));
  }
  function nextStep() {
    if (!currentAnswer) return;
    if (step < 2) setStep(step + 1);
    else setPhase("lead");
  }
  function prevStep() { if (step > 0) setStep(step - 1); }
  function reset() {
    setAnswers({}); setLead(EMPTY_LEAD); setConsent(false);
    setStep(0); setPhase("intro"); setCalcMatch(0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setSubmitting(true);
    const { key: destKey, match } = getDestResult(answers);
    const dest = destinations[destKey];
    setCalcMatch(match);
    const finalLead: LeadData = { ...lead, destination_matched: destKey.toUpperCase() };
    setLead(finalLead);

    // Send to CRM (fire-and-forget)
    fetch("https://dev-lead-crm.zunkireelabs.com/api/public/submit/admizz/find-your-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer crm_live_UVtPfdXD6lIZ0S5lSeny9Clv3jKzbGUGM8sgK2Gm3tw",
      },
      body: JSON.stringify({
        first_name: finalLead.firstName.trim(),
        last_name:  finalLead.lastName.trim(),
        email:      finalLead.email.trim(),
        phone:      `${finalLead.code} ${finalLead.phone.trim()}`,
        custom_fields: {
          study_field:          answers.q1 ?? "",
          lifestyle:            answers.q2 ?? "",
          budget:               answers.q3 ?? "",
          matched_destination:  dest.country,
          match_score:          `${match}%`,
        },
      }),
    }).catch(() => {}); // silent fail — WhatsApp flow unaffected

    setPhase("result");
    setSubmitting(false);
  }

  const filledCount = [lead.firstName, lead.email, lead.phone].filter(v => v.trim().length > 1).length;
  const blurPx      = [10, 7, 6, 6][filledCount] ?? 6;
  const lockHint    = ["Fill in your details to unlock", "Keep going…", "Almost there…", "Ready to reveal! 🎉"][filledCount] ?? "";

  return (
    <div id="quiz" className="scroll-mt-24 w-full">
      {/* Clean card — 600px on intro, full 860px on all other phases */}
      <div className={`rounded-2xl border border-border-light shadow-lg overflow-hidden bg-white transition-all ${phase === "intro" ? "max-w-[600px] mx-auto" : "w-full"}`}>
        <AnimatePresence mode="wait">

          {/* ─── INTRO ─── */}
          {phase === "intro" && (
            <motion.div key="intro" {...SLIDE}>
              <CardHeader phase="intro" step={0} />

              <div className="relative px-7 pt-6 pb-5 md:px-10 md:pt-8 md:pb-6 text-center">
                {/* Globe orb — contained, no overflow bleed */}
                <div className="flex justify-center mb-4">
                  <div className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                    {/* Outer diffuse halo — fixed size, never escapes */}
                    <div className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: "radial-gradient(circle, rgba(49,66,156,0.10) 0%, transparent 70%)" }} />
                    {/* Orb shell — overflow-hidden clips all inner glow */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                      style={{ background: "radial-gradient(circle at 38% 36%, #e8edfb 0%, #c8d0f0 55%, #a8b4e8 100%)", boxShadow: "0 4px 24px rgba(49,66,156,0.22), 0 1px 4px rgba(49,66,156,0.12), inset 0 1px 2px rgba(255,255,255,0.7)" }}>
                      {/* Inner highlight for glass feel */}
                      <div className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle at 38% 36%, rgba(255,255,255,0.55) 0%, transparent 60%)" }} />
                      <div className="relative text-[42px] md:text-[52px] leading-none select-none"
                        style={{ filter: "drop-shadow(0 2px 8px rgba(49,66,156,0.30))" }}>🌍</div>
                    </div>
                  </div>
                </div>

                {/* Headline */}
                <h2 className="text-[22px] md:text-[28px] font-bold text-navy leading-[1.08] mb-2 tracking-tight">
                  Find Your <span className="text-blue-royal">Perfect Match</span>
                </h2>

                <p className="text-[13px] text-gray-dark leading-relaxed max-w-[300px] mx-auto mb-4">
                  Tell us your goals — we'll match you to the right country, universities &amp; scholarships in 60 seconds.
                </p>

                {/* Destination flags */}
                <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                  {DEST_FLAGS.map((d, i) => (
                    <motion.div key={d.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.06 * i, duration: 0.25 }}
                      className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-[8px] border border-border-light bg-off-white hover:border-blue-royal/30 hover:bg-blue-royal/5 transition-all cursor-default">
                      <span className="text-[18px] leading-none">{d.flag}</span>
                      <span className="text-[9px] font-bold text-gray-dark uppercase tracking-wider">{d.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Social proof */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex -space-x-2">
                    {BRAND_AVATARS.map((a, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold shadow-sm"
                        style={{ background: a.bg, color: a.fg }}>
                        {a.initial}
                      </div>
                    ))}
                  </div>
                  <p className="text-[13px] text-gray-dark">
                    <strong className="text-navy font-semibold">2,000+</strong> students matched
                  </p>
                </div>

                {/* CTA */}
                <motion.button type="button" onClick={() => setPhase("quiz")}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="w-full max-w-[300px] mx-auto flex items-center justify-center gap-2.5 bg-yellow text-black font-bold text-[16px] py-4 rounded-[14px]"
                  style={{ boxShadow: "0 0 28px rgba(253,237,34,0.4)" }}>
                  Start the Quiz
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─── QUIZ STEPS ─── */}
          {phase === "quiz" && currentQ && (
            <motion.div key={`q-${step}`} {...SLIDE}>
              <CardHeader phase="quiz" step={step} />

              <div className="px-6 py-6">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-center gap-3 mb-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`h-2 rounded-full transition-all duration-400 ${
                        i <= step ? "bg-blue-royal" : "bg-border-light"
                      } ${i === step ? "w-10" : "w-4"}`} />
                    ))}
                  </div>
                  <div className="h-1 bg-border-light rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg,#31429C,#0D1282)" }}
                      initial={false}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }} />
                  </div>
                  <div className="flex justify-between mt-2 text-[11px] font-bold text-gray-dark uppercase tracking-wider">
                    <span>Question {step + 1} of 3</span>
                    <span className="text-blue-royal">{Math.round(progressPct)}%</span>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center mb-7">
                  <QuizIcon id={currentQ.icon} />
                  <h3 className="text-[20px] md:text-[24px] font-bold text-navy leading-tight mb-2">{currentQ.title}</h3>
                  <p className="text-[14px] text-gray-dark">{currentQ.sub}</p>
                </div>

                {/* Options — 4-col on desktop, 2-col on mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                  {currentQ.options.map((opt) => {
                    const sel = currentAnswer === opt.label;
                    return (
                      <motion.button key={opt.label} type="button"
                        onClick={() => pickOption(currentQ.id, opt.label)}
                        whileTap={{ scale: 0.97 }}
                        animate={{ scale: sel ? 1.02 : 1 }}
                        transition={{ duration: 0.15 }}
                        className={`relative text-left p-3 rounded-[14px] border-2 transition-all duration-200 ${
                          sel ? "border-blue-royal bg-blue-royal/5 shadow-[0_4px_20px_rgba(49,66,156,0.14)]"
                             : "border-border-light bg-white hover:border-blue-royal/40 hover:bg-off-white/70"}`}>
                        {sel && (
                          <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-blue-royal text-white text-[11px] font-bold flex items-center justify-center">✓</span>
                        )}
                        <div className="flex flex-col items-start gap-1.5">
                          <span className="text-2xl leading-none">{opt.emoji}</span>
                          <div>
                            <div className="text-[13px] font-bold text-navy leading-tight">{opt.label}</div>
                            <div className="text-[11px] text-gray-dark mt-0.5 leading-snug">{opt.desc}</div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button type="button" onClick={prevStep}
                      className="text-[13px] text-gray-dark hover:text-navy transition-colors font-medium">← Back</button>
                  ) : <span />}
                  <motion.button type="button" onClick={nextStep} disabled={!currentAnswer}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 text-white font-bold text-[15px] px-8 py-3.5 rounded-[12px] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    style={{ background: "linear-gradient(135deg,#31429C,#0D1282)", boxShadow: currentAnswer ? "0 4px 16px rgba(49,66,156,0.3)" : "none" }}>
                    {step === 2 ? "Reveal My Match 🔮" : "Next Question →"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── LEAD FORM ─── */}
          {phase === "lead" && (() => {
            const destKey = getDestKey(answers);
            const dest    = destinations[destKey];
            return (
              <motion.div key="lead" {...SLIDE}>
                <CardHeader phase="lead" step={3} />

                {/* ── Layer 1: Blurred destination preview ── */}
                <div className="relative h-[188px] overflow-hidden" style={{ background: DEST_GRADIENTS[destKey] }}>

                  {/* Actual destination content — blurred, compact since unreadable */}
                  <div
                    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none px-6"
                    style={{ filter: `blur(${blurPx}px)`, transition: "filter 0.8s cubic-bezier(0.4,0,0.2,1)" }}
                  >
                    <div className="w-full">
                      <div className="text-center mb-2">
                        <div className="text-[38px] leading-none mb-1">{dest.emoji}</div>
                        <div className="text-[22px] font-black text-white tracking-tight">{dest.country}</div>
                        <div className="text-[10px] text-white/50 mt-0.5 mb-2">{dest.flag}</div>
                        <div className="max-w-[160px] mx-auto mb-2">
                          <div className="h-1.5 rounded-full bg-white/15">
                            <div className="h-full rounded-full" style={{ width: `${dest.match}%`, background: "#FDED22" }} />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {dest.cards.map((c) => (
                          <div key={c.label} className="rounded-[8px] p-2 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                            <div className="text-sm leading-none mb-0.5">{c.icon}</div>
                            <div className="text-[8px] text-white/60 leading-tight">{c.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,19,83,0.25) 0%, rgba(0,19,83,0.55) 100%)" }} />

                  {/* Lock badge — centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.28)", backdropFilter: "blur(8px)", animation: "lock-float 3s ease-in-out infinite" }}
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 018 0v4" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow text-[11px] font-semibold tracking-wide">🎯 We found your destination!</div>
                      <div className="text-white font-black text-[15px] tracking-tight leading-tight mt-0.5">Your perfect match is…</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-500"
                          style={{ width: i < filledCount ? "18px" : "5px", background: i < filledCount ? "#FDED22" : "rgba(255,255,255,0.25)" }}
                        />
                      ))}
                    </div>
                    <div className="text-white/50 text-[10px]">{lockHint}</div>
                  </div>
                </div>

                {/* ── Layer 2: Form panel ── */}
                <div className="bg-white px-6 pt-5 pb-6">

                  {/* Header row */}
                  <div className="mb-3">
                    <h3 className="text-[15px] font-bold text-navy leading-tight">One step to unlock</h3>
                    <p className="text-[11px] text-gray-dark mt-0.5">Enter your details to reveal your match</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2">

                    {/* Name row — first + last side by side */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2.5 h-11 rounded-[10px] border border-border-light bg-off-white px-3.5 focus-within:border-blue-royal focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-royal/10 transition-all">
                        <svg className="w-4 h-4 text-gray-dark/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <input required type="text" value={lead.firstName}
                          onChange={(e) => setLead({ ...lead, firstName: e.target.value })}
                          placeholder="First name"
                          className="flex-1 bg-transparent text-[13px] text-navy placeholder:text-gray-dark/38 focus:outline-none" />
                      </div>
                      <div className="flex items-center gap-2.5 h-11 rounded-[10px] border border-border-light bg-off-white px-3.5 focus-within:border-blue-royal focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-royal/10 transition-all">
                        <input required type="text" value={lead.lastName}
                          onChange={(e) => setLead({ ...lead, lastName: e.target.value })}
                          placeholder="Last name"
                          className="flex-1 bg-transparent text-[13px] text-navy placeholder:text-gray-dark/38 focus:outline-none" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2.5 h-11 rounded-[10px] border border-border-light bg-off-white px-3.5 focus-within:border-blue-royal focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-royal/10 transition-all">
                      <svg className="w-4 h-4 text-gray-dark/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
                      </svg>
                      <input required type="email" value={lead.email}
                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        placeholder="Email address"
                        className="flex-1 bg-transparent text-[13px] text-navy placeholder:text-gray-dark/38 focus:outline-none" />
                    </div>

                    {/* Phone */}
                    <div className="flex h-11 rounded-[10px] border border-border-light bg-off-white overflow-hidden focus-within:border-blue-royal focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-royal/10 transition-all">
                      <select value={lead.code} onChange={(e) => setLead({ ...lead, code: e.target.value })}
                        className="pl-3 pr-1.5 text-[13px] text-navy bg-transparent border-r border-border-light focus:outline-none cursor-pointer shrink-0 font-medium">
                        {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                      </select>
                      <input required type="tel" value={lead.phone}
                        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                        placeholder="Phone / WhatsApp"
                        className="flex-1 px-3 text-[13px] text-navy placeholder:text-gray-dark/38 bg-transparent focus:outline-none" />
                    </div>

                    {/* Consent */}
                    <label className="flex items-start gap-2.5 cursor-pointer pt-1 select-none">
                      <span className={`mt-0.5 w-4 h-4 rounded-[4px] border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        consent ? "bg-blue-royal border-blue-royal" : "bg-white border-border-light"}`}>
                        {consent && (
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l3.5 3.5L12 4" />
                          </svg>
                        )}
                      </span>
                      <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="sr-only" />
                      <span className="text-[11px] text-gray-dark leading-relaxed">
                        I agree to be contacted by Admizz Education via WhatsApp, email, or phone.
                      </span>
                    </label>

                    {/* Submit */}
                    <motion.button type="submit" disabled={submitting} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-yellow text-black font-bold text-[14px] py-3.5 rounded-[12px] transition-all disabled:opacity-50 mt-0.5"
                      style={{ boxShadow: "0 6px 20px rgba(253,237,34,0.35)" }}>
                      {submitting ? (
                        <>
                          <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                          Unlocking your result…
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="11" width="14" height="10" rx="2"/>
                            <path d="M8 11V7a4 4 0 018 0"/>
                          </svg>
                          Unlock My Result
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[10.5px] text-gray-dark/38 flex items-center justify-center gap-1 pt-0.5">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
                      Used only by the Admizz team · No spam
                    </p>
                  </form>
                </div>

                <style>{`
                  @keyframes lock-float {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-6px); }
                  }
                `}</style>
              </motion.div>
            );
          })()}

          {/* ─── RESULT ─── */}
          {phase === "result" && (
            <motion.div key="result-wrap" {...SLIDE}>
              <CardHeader phase="result" step={3} />
              <ResultPanel destKey={getDestKey(answers)} match={calcMatch} firstName={lead.firstName} onRetry={reset} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Question header SVG icons ── */
function QuizIcon({ id }: { id: string }) {
  return (
    <div className="w-14 h-14 rounded-2xl bg-blue-royal/10 flex items-center justify-center mx-auto mb-4">
      <svg className="w-7 h-7 text-blue-royal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {id === "study" && (
          <>
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </>
        )}
        {id === "lifestyle" && (
          <>
            <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </>
        )}
        {id === "budget" && (
          <>
            <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </>
        )}
      </svg>
    </div>
  );
}

/* ── Confetti ── */
const CC = ["#FDED22","#31429C","#0D1282","#FCB730","#00d4ff","#7c3aed"];
function Confetti() {
  const [p, setP] = useState<Array<{id:number;left:number;size:number;color:string;dur:number;delay:number;round:boolean}>>([]);
  useEffect(() => {
    const a = Array.from({length:70},(_,i)=>({id:i,left:Math.random()*100,size:Math.random()*8+5,color:CC[Math.floor(Math.random()*CC.length)],dur:Math.random()*2+1.6,delay:Math.random()*0.5,round:Math.random()>0.5}));
    setP(a);
    const t = setTimeout(()=>setP([]),4000);
    return ()=>clearTimeout(t);
  },[]);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] overflow-hidden z-10">
      {p.map((x)=>(
        <span key={x.id} className="absolute -top-4"
          style={{left:`${x.left}%`,width:`${x.size}px`,height:`${x.size}px`,background:x.color,borderRadius:x.round?"50%":"2px",animation:`cf ${x.dur}s ease-in ${x.delay}s forwards`}}/>
      ))}
      <style>{`@keyframes cf{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(320px) rotate(540deg);opacity:0}}`}</style>
    </div>
  );
}

/* ── Count-up ── */
function CountUp({to,duration=1.2}:{to:number;duration?:number}) {
  const [v,setV]=useState(0);
  useEffect(()=>{
    let r=0;
    const s=performance.now();
    const tick=(t:number)=>{const p=Math.min((t-s)/1000/duration,1);setV(Math.round(p*to));if(p<1)r=requestAnimationFrame(tick);};
    r=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(r);
  },[to,duration]);
  return <>{v}</>;
}

/* ── Result panel ── */
function ResultPanel({destKey,match,firstName,onRetry}:{destKey:DestinationKey;match:number;firstName:string;onRetry:()=>void}) {
  const d = destinations[destKey];
  const flagEmoji = d.flag.split(" ")[0];
  const cardColors = [
    {ring:"border-blue-royal/20",tint:"bg-blue-royal/5",text:"text-blue-royal"},
    {ring:"border-emerald-400/25",tint:"bg-emerald-50",text:"text-emerald-700"},
    {ring:"border-yellow/40",tint:"bg-yellow/8",text:"text-amber-700"},
    {ring:"border-purple-400/25",tint:"bg-purple-50",text:"text-purple-700"},
  ];
  const [bookState, setBookState] = useState<"idle"|"loading"|"done">("idle");
  function bookCounseling() {
    if (bookState !== "idle") return;
    setBookState("loading");
    setTimeout(() => setBookState("done"), 1500);
  }
  function shareWA() {
    const t = `🌍 My dream study destination is *${d.country}*! Take this 60-second quiz to find yours 👇\nhttps://admizzeducation.com/match-your-destination`;
    window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,"_blank","noopener,noreferrer");
  }
  function copyLink() { navigator.clipboard.writeText("https://admizzeducation.com/match-your-destination"); }

  return (
    <div className="relative bg-white overflow-hidden">
      <Confetti />
      <div className="h-1.5 w-full" style={{background:"linear-gradient(90deg,#001353,#31429C,#FDED22,#31429C,#001353)"}}/>
      <div className="p-6 sm:p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow/15 border border-yellow/30 text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-3 text-amber-700">
            🎉 Your perfect match is...
          </div>
          <motion.div initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.4,ease:[0.22,1,0.36,1]}}>
            <div className="text-[56px] md:text-[64px] leading-none mb-2">{d.emoji}</div>
          </motion.div>
          <motion.h3 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.4}}
            className="text-[30px] md:text-[40px] font-bold text-navy leading-[1.05] mb-1">{d.country}</motion.h3>
          <div className="text-[14px] font-semibold text-blue-royal mb-2">{d.flag}</div>
          {firstName && <p className="text-[13px] text-gray-dark mb-1">Perfect for you, {firstName}!</p>}
          <p className="text-[13px] text-gray-dark italic max-w-sm mx-auto">&ldquo;{d.tagline}&rdquo;</p>
        </div>

        {/* Match score */}
        <div className="mb-4 bg-off-white rounded-[14px] p-4">
          <div className="flex justify-between text-[12px] font-bold mb-2 uppercase tracking-wider">
            <span className="text-gray-dark">🎯 Match Score</span>
            <span className="text-blue-royal text-[16px] tabular-nums"><CountUp to={match}/>%</span>
          </div>
          <div className="h-2.5 bg-border-light rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{background:"linear-gradient(90deg,#31429C,#0D1282)"}}
              initial={{width:0}} animate={{width:`${match}%`}} transition={{duration:1.3,delay:0.3,ease:"easeOut"}}/>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {d.cards.map((c,i)=>{
            const col=cardColors[i]||cardColors[0];
            return (
              <div key={c.label} className={`rounded-[12px] border ${col.ring} ${col.tint} p-3`}>
                <div className="text-xl mb-1">{c.icon}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-dark mb-0.5">{c.label}</div>
                <div className={`text-[12px] font-semibold leading-snug ${col.text}`}>{c.value}</div>
              </div>
            );
          })}
        </div>

        {/* Why it fits */}
        <div className="rounded-[14px] p-4 mb-5" style={{background:"linear-gradient(135deg,#001353 0%,#0D1282 100%)"}}>
          <div className="flex items-start gap-2.5">
            <span className="text-lg leading-none mt-0.5 flex-shrink-0">💡</span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-yellow mb-1">Why this fits you</div>
              <p className="text-[13px] leading-relaxed text-white/85">{d.whyFits}</p>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <motion.button type="button" onClick={bookCounseling}
          whileHover={bookState === "idle" ? { scale: 1.02 } : {}} whileTap={bookState === "idle" ? { scale: 0.98 } : {}}
          className="w-full flex items-center justify-center gap-2 font-bold text-[15px] py-4 rounded-[14px] mb-3 transition-colors duration-500"
          style={{
            background: bookState === "done" ? "#22c55e" : "#FDED22",
            color: bookState === "done" ? "#fff" : "#000",
            boxShadow: bookState === "done" ? "0 6px 24px rgba(34,197,94,0.4)" : "0 6px 24px rgba(253,237,34,0.4)",
            cursor: bookState !== "idle" ? "default" : "pointer",
          }}>
          {bookState === "idle" && "Book a Free Counseling"}
          {bookState === "loading" && (
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          )}
          {bookState === "done" && (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              You&apos;re all set!
            </>
          )}
        </motion.button>

        {/* Secondary CTA */}
        <Link href={d.countryPageHref}
          className="w-full block text-center border-2 border-blue-royal text-blue-royal font-semibold text-[14px] py-3.5 rounded-[14px] hover:bg-blue-royal hover:text-white transition-colors mb-4">
          🏛️ Explore {d.country} Universities
        </Link>

        {/* Share row */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button type="button" onClick={shareWA} className="text-[12px] font-semibold bg-off-white border border-border-light text-navy py-2.5 rounded-[10px] hover:bg-border-light/50 transition-colors">💬 Share on WhatsApp</button>
          <button type="button" onClick={copyLink} className="text-[12px] font-semibold bg-off-white border border-border-light text-navy py-2.5 rounded-[10px] hover:bg-border-light/50 transition-colors">🔗 Copy Link</button>
        </div>

        {/* Retry */}
        <div className="border-t border-border-light pt-3 text-center">
          <button type="button" onClick={onRetry} className="text-[13px] text-gray-dark hover:text-navy transition-colors">
            ↩ Try a different combination
          </button>
        </div>

      </div>
    </div>
  );
}
