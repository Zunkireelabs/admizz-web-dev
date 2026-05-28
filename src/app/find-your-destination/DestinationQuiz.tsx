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
  name: string; email: string; code: string; phone: string;
  age: string; education: string; destination_matched: string;
}

const EMPTY_LEAD: LeadData = {
  name: "", email: "", code: "+977", phone: "", age: "", education: "", destination_matched: "",
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
  { flag: "🇦🇺", label: "AUS" },
  { flag: "🇩🇪", label: "DE" },
  { flag: "🇳🇿", label: "NZ" },
];

const BRAND_AVATARS = [
  { bg: "#31429C", fg: "#fff",     initial: "A" },
  { bg: "#0D1282", fg: "#fff",     initial: "R" },
  { bg: "#4a5fc4", fg: "#fff",     initial: "S" },
  { bg: "#FDED22", fg: "#001353",  initial: "M" },
  { bg: "#6478d4", fg: "#fff",     initial: "P" },
];

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

  const progressPct  = ((step + 1) / 3) * 100;
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setSubmitting(true);
    const { key: destKey, match } = getDestResult(answers);
    const dest = destinations[destKey];
    setCalcMatch(match);
    const finalLead: LeadData = { ...lead, destination_matched: destKey.toUpperCase() };
    setLead(finalLead);

    // Send to CRM (fire-and-forget)
    const nameParts = finalLead.name.trim().split(/\s+/);
    fetch("https://dev-lead-crm.zunkireelabs.com/api/public/submit/admizz/find-your-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer crm_live_UVtPfdXD6lIZ0S5lSeny9Clv3jKzbGUGM8sgK2Gm3tw",
      },
      body: JSON.stringify({
        first_name: nameParts[0] ?? "",
        last_name:  nameParts.slice(1).join(" ") || "",
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

  const teaserEmoji = destinations[getDestKey(answers)]?.emoji ?? "🌍";

  return (
    <div id="quiz" className="scroll-mt-24 w-full">
      {/* Outer glow shell */}
      <div className="relative">
        <div className="absolute -inset-px rounded-[22px] opacity-50 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(253,237,34,0.6) 0%, rgba(49,66,156,0.4) 50%, rgba(253,237,34,0.3) 100%)", filter: "blur(1px)" }} />
        <div className="relative rounded-[20px] overflow-hidden shadow-[0_32px_80px_rgba(0,13,58,0.35),0_8px_32px_rgba(0,13,58,0.2)]">
          <AnimatePresence mode="wait">

            {/* ─── INTRO ─── */}
            {phase === "intro" && (
              <motion.div key="intro" {...SLIDE} className="relative overflow-hidden bg-white">

                {/* Top accent bar */}
                <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#001353,#31429C,#FDED22,#31429C,#001353)" }} />

                <div className="relative px-7 py-5 md:px-10 md:py-6 text-center">
                  {/* Globe */}
                  <div className="flex justify-center mb-3">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(49,66,156,0.14), transparent)", transform: "scale(2.4)", animation: "glow-ring 2.8s ease-in-out infinite" }} />
                      <div className="relative text-[44px] leading-none select-none"
                        style={{ filter: "drop-shadow(0 4px 18px rgba(49,66,156,0.25))" }}>🌍</div>
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
                    style={{ boxShadow: "0 0 28px rgba(253,237,34,0.4)", animation: "cta-glow 2.6s ease-in-out infinite" }}>
                    Start the Quiz
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>

                </div>

                <style>{`
                  @keyframes glow-ring {
                    0%,100% { transform:scale(2.4); opacity:0.14; }
                    50%     { transform:scale(2.7); opacity:0.05; }
                  }
                  @keyframes cta-glow {
                    0%,100% { box-shadow:0 0 28px rgba(253,237,34,0.4); }
                    50%     { box-shadow:0 0 44px rgba(253,237,34,0.65); }
                  }
                `}</style>
              </motion.div>
            )}

            {/* ─── QUIZ STEPS ─── */}
            {phase === "quiz" && currentQ && (
              <motion.div key={`q-${step}`} {...SLIDE} className="bg-white rounded-[20px] p-7 md:p-10">
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
                  <div className="text-5xl mb-3 leading-none">{currentQ.icon}</div>
                  <h3 className="text-[20px] md:text-[24px] font-bold text-navy leading-tight mb-2">{currentQ.title}</h3>
                  <p className="text-[14px] text-gray-dark">{currentQ.sub}</p>
                </div>

                {/* Options */}
                <div className="grid sm:grid-cols-2 gap-3 mb-7">
                  {currentQ.options.map((opt) => {
                    const sel = currentAnswer === opt.label;
                    return (
                      <motion.button key={opt.label} type="button"
                        onClick={() => pickOption(currentQ.id, opt.label)}
                        whileTap={{ scale: 0.97 }}
                        animate={{ scale: sel ? 1.02 : 1 }}
                        transition={{ duration: 0.15 }}
                        className={`relative text-left p-4 rounded-[14px] border-2 transition-all duration-200 ${
                          sel ? "border-blue-royal bg-blue-royal/5 shadow-[0_4px_20px_rgba(49,66,156,0.14)]"
                             : "border-border-light bg-white hover:border-blue-royal/40 hover:bg-off-white/70"}`}>
                        {sel && (
                          <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-blue-royal text-white text-[11px] font-bold flex items-center justify-center">✓</span>
                        )}
                        <div className="flex items-start gap-3">
                          <span className="text-2xl leading-none mt-0.5">{opt.emoji}</span>
                          <div>
                            <div className="text-[14px] font-bold text-navy">{opt.label}</div>
                            <div className="text-[12px] text-gray-dark mt-0.5">{opt.desc}</div>
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
              </motion.div>
            )}

            {/* ─── LEAD FORM ─── */}
            {phase === "lead" && (
              <motion.div key="lead" {...SLIDE} className="bg-white rounded-[20px] p-6 md:p-8">
                <div className="text-center mb-5">
                  <div className="text-4xl mb-2 leading-none">{teaserEmoji}</div>
                  <div className="inline-flex items-center gap-2 bg-blue-royal/8 border border-blue-royal/15 text-blue-royal text-[10px] font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-royal animate-pulse" />
                    Match locked in
                  </div>
                  <h3 className="text-[20px] md:text-[24px] font-bold text-navy mb-1">One step to your result</h3>
                  <p className="text-[13px] text-gray-dark max-w-xs mx-auto">Where should we send your personalised report?</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <PField icon={<IcoUser />} label="Full Name" required>
                    <input required type="text" value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-transparent text-[14px] text-navy placeholder:text-gray-dark/45 focus:outline-none" />
                  </PField>

                  <PField icon={<IcoMail />} label="Email Address" required>
                    <input required type="email" value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full bg-transparent text-[14px] text-navy placeholder:text-gray-dark/45 focus:outline-none" />
                  </PField>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-dark mb-1.5">
                      WhatsApp / Phone <span className="text-blue-royal">*</span>
                    </p>
                    <div className="flex rounded-[12px] border border-border-light focus-within:border-blue-royal focus-within:ring-2 focus-within:ring-blue-royal/12 transition-all overflow-hidden">
                      <select value={lead.code} onChange={(e) => setLead({ ...lead, code: e.target.value })}
                        className="pl-3 pr-2 py-3 text-[14px] text-navy font-medium bg-off-white border-r border-border-light focus:outline-none cursor-pointer shrink-0">
                        {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                      </select>
                      <input required type="tel" value={lead.phone}
                        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                        placeholder="9801234567"
                        className="flex-1 px-3.5 py-3 text-[14px] text-navy placeholder:text-gray-dark/45 bg-transparent focus:outline-none" />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-1 select-none">
                    <span className={`mt-0.5 w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      consent ? "bg-blue-royal border-blue-royal" : "bg-white border-border-light"}`}>
                      {consent && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l3.5 3.5L12 4" />
                        </svg>
                      )}
                    </span>
                    <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="sr-only" />
                    <span className="text-[13px] text-gray-dark leading-relaxed">
                      I agree to be contacted by Admizz Education via WhatsApp, email, or phone.
                    </span>
                  </label>

                  <motion.button type="submit" disabled={submitting} whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-yellow text-black font-bold text-[16px] py-4 rounded-[14px] transition-all disabled:opacity-50 mt-1"
                    style={{ boxShadow: "0 8px 24px rgba(253,237,34,0.3)" }}>
                    {submitting ? "⏳ Revealing your match…" : (
                      <>Reveal My Match <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
                    )}
                  </motion.button>
                  <p className="text-center text-[11.5px] text-gray-dark/55 flex items-center justify-center gap-1.5">
                    🔒 Used only by the Admizz team · No spam
                  </p>
                </form>
              </motion.div>
            )}

            {/* ─── RESULT ─── */}
            {phase === "result" && (
              <ResultPanel destKey={getDestKey(answers)} match={calcMatch} firstName={lead.name.split(" ")[0]} onRetry={reset} />
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Field wrapper ── */
function PField({ icon, label, hint, required, children }: {
  icon: React.ReactNode; label: string; hint?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-dark mb-1.5 flex items-center gap-1.5">
        <span className="opacity-60">{icon}</span>
        {label}
        {required && <span className="text-blue-royal normal-case tracking-normal">*</span>}
        {hint && <span className="ml-auto text-[10px] font-medium normal-case tracking-normal text-gray-dark/45">{hint}</span>}
      </p>
      <div className="bg-white border border-border-light rounded-[12px] px-3.5 py-3.5 focus-within:border-blue-royal focus-within:ring-2 focus-within:ring-blue-royal/12 transition-all">
        {children}
      </div>
    </div>
  );
}

/* ── Icons ── */
function IcoUser() { return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>; }
function IcoMail() { return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>; }
function IcoHash() { return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/></svg>; }
function IcoCap()  { return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M22 10L12 4 2 10l10 6 10-6zM6 12v5c2 1.5 4 2 6 2s4-.5 6-2v-5"/></svg>; }

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
  function bookCounseling() {
    const msg = `Hi Admizz! I got matched with ${d.country} ${flagEmoji} on your destination quiz. I'd love a FREE counselling session.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener,noreferrer");
  }
  function shareWA() {
    const t = `🌍 My dream study destination is *${d.country}*! Take this 60-second quiz to find yours 👇\nhttps://admizzeducation.com/find-your-destination`;
    window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,"_blank","noopener,noreferrer");
  }
  function copyLink() { navigator.clipboard.writeText("https://admizzeducation.com/find-your-destination"); }

  return (
    <motion.div key="result" {...SLIDE} className="relative bg-white rounded-[20px] overflow-hidden">
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
        <motion.button type="button" onClick={bookCounseling} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
          className="w-full bg-yellow text-black font-bold text-[15px] py-4 rounded-[14px] mb-2.5"
          style={{boxShadow:"0 8px 24px rgba(253,237,34,0.3)"}}>
          🎓 Book My Free Counselling
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
    </motion.div>
  );
}
