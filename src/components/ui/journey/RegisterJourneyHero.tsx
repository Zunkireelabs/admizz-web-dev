"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import JourneyDonut from "./JourneyDonut";
import RegisterForm from "../register-form/RegisterForm";
import { journeySteps } from "./journey.data";

/**
 * RegisterJourneyHero — Synced donut + form experience.
 *
 * The 5-step journey donut acts as a live progress visualizer for the
 * 3-step register form. As the user advances through the form, the
 * Step 1 (Counselling) slice fills with a progress overlay. On submit,
 * Step 1 turns green with a checkmark and the donut auto-advances
 * focus to Step 2 (Course Selection) to show what's next.
 *
 * Backend behaviour (Supabase insert + CRM POST) is UNCHANGED — this
 * wrapper only listens to step changes via callbacks.
 */

const COUNSELLING_INDEX = 0; // journeySteps[0] = Counselling

const FORM_STEP_LABELS = ["You", "Goal", "Finish"] as const;

export default function RegisterJourneyHero() {
  const [donutActive, setDonutActive] = useState(COUNSELLING_INDEX);
  const [formStep, setFormStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll + bind ESC to close while overlay is open
  useEffect(() => {
    if (!formOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [formOpen]);

  // Map form step (0, 1, 2) → progress percentage on the Step 1 slice
  // 0 → 8% (just started), 1 → 40%, 2 → 75%, submitted → 100%
  const progress = submitted ? 100 : formStep === 0 ? 8 : formStep === 1 ? 40 : 75;

  const completedSteps = submitted ? [COUNSELLING_INDEX] : [];
  const lockedSteps = submitted
    ? [] // after submit, future steps unlock to "next up"
    : [1, 2, 3, 4]; // before submit, all other steps are locked

  const handleFormStepChange = (s: number) => {
    setFormStep(s);
    // Keep donut focus on Counselling while form is in progress
    if (!submitted) setDonutActive(COUNSELLING_INDEX);
    // Reset modal scroll to top so the new step starts at field 1
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmitSuccess = () => {
    setSubmitted(true);
    setDonutActive(1);
  };

  // Center hole content reflects current form sub-step or completion
  const centerEyebrow = submitted
    ? "Complete"
    : donutActive === COUNSELLING_INDEX
    ? `In progress · ${FORM_STEP_LABELS[formStep]}`
    : `Step ${journeySteps[donutActive].id}`;

  return (
    <section
      className="relative py-10 md:py-12"
      style={{
        background: "linear-gradient(135deg, #001353 0%, #0066cc 100%)",
      }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes rjhFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Subtle dot grid overlay */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">

          {/* LEFT — eyebrow + heading + subtitle */}
          <div
            className="text-center lg:text-left lg:flex-1 mb-8 lg:mb-0 px-4 sm:px-0"
            style={{ animation: "rjhFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-5"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.25)",
                letterSpacing: "0.16em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4ade80" }} />
              {submitted ? "Your Journey · Complete" : "Your Journey"}
            </span>

            {/* Heading — gradient accent on the last word */}
            <h1
              className="font-bold leading-[1.05] tracking-[-0.02em] mb-4"
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontSize: "clamp(26px, 5.5vw, 52px)",
              }}
            >
              {submitted ? (
                <span style={{ color: "#FFFFFF" }}>Nice. Step 2 starts soon.</span>
              ) : (
                <>
                  <span style={{ color: "#FFFFFF" }}>Let&rsquo;s get you{" "}</span>
                  <span
                    style={{
                      background: "linear-gradient(95deg, #FFFFFF 0%, #93C5FD 45%, #60A5FA 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    started.
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle — higher opacity + left accent rule on desktop */}
            <div className="flex items-center justify-center lg:justify-start gap-3 md:max-w-sm">
              <span
                className="hidden lg:block flex-shrink-0 w-[3px] h-10 rounded-full"
                style={{ background: "linear-gradient(180deg, #60A5FA 0%, rgba(96,165,250,0) 100%)" }}
              />
              <p
                className="text-[14px] md:text-[16px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {submitted
                  ? "Your counsellor reaches out within 24 hours."
                  : "Tell us about you — we’ll map the rest."}
              </p>
            </div>
          </div>

          {/* RIGHT — step strip + donut + post-submit */}
          <div className="relative lg:flex-1">

            {/* Shared centering wrapper — both strip and donut align to this */}
            <div className="mx-auto w-full max-w-[520px] px-0 sm:px-8 lg:max-w-[460px] lg:px-10 pb-2 sm:pb-0">

            {/* Step info strip */}
            {!submitted && (
              <div className="px-3 sm:px-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={donutActive}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex items-center gap-0 rounded-2xl overflow-hidden mb-2"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.30)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <div className="self-stretch w-1 flex-shrink-0" style={{ background: journeySteps[donutActive].color }} />
                  <div className="flex-1 min-w-0 py-3 px-3 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5" style={{ color: journeySteps[donutActive].colorDeep }}>
                      Step {journeySteps[donutActive].id} · {journeySteps[donutActive].label}
                    </p>
                    <p className="text-[13px] font-semibold leading-snug truncate" style={{ color: "#FFFFFF" }}>
                      {journeySteps[donutActive].title}
                    </p>
                  </div>
                  <div className="flex-shrink-0 pr-3 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap"
                      style={{ background: journeySteps[donutActive].bgTint, color: journeySteps[donutActive].colorDeep, border: `1px solid ${journeySteps[donutActive].color}30` }}>
                      {journeySteps[donutActive].duration}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
              </div>
            )}

            {/* Donut wheel */}
            <div className="relative w-full pt-0 pb-6 scale-[1.25] sm:scale-100 origin-top">
              <JourneyDonut
                activeIndex={donutActive}
                onSelect={(i) => {
                  if (submitted) {
                    setDonutActive(i);
                  } else if (i === COUNSELLING_INDEX) {
                    setDonutActive(i);
                  } else {
                    setDonutActive(i);
                    setTimeout(() => setDonutActive(COUNSELLING_INDEX), 2200);
                  }
                }}
                formProgress={progress}
                completedSteps={completedSteps}
                lockedSteps={lockedSteps}
                centerEyebrow={centerEyebrow}
                onCtaClick={!submitted ? () => setFormOpen(true) : undefined}
              />

              {/* Locked-peek tooltip — sits below donut in normal flow so it can't overflow into the next section */}
              <div className="flex justify-center mt-2 min-h-[32px]">
                <AnimatePresence>
                  {!submitted && donutActive !== COUNSELLING_INDEX && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="px-3 py-2 rounded-full text-[11px] sm:text-[12px] font-bold text-center"
                      style={{
                        background: "rgba(5,15,50,0.92)",
                        color: journeySteps[donutActive].color,
                        boxShadow: "0 6px 24px rgba(0,0,0,0.50)",
                        border: `1px solid ${journeySteps[donutActive].color}40`,
                        maxWidth: "calc(100% - 24px)",
                      }}
                    >
                      🔒 Unlocks after Step 1
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            </div>{/* end shared centering wrapper */}

          </div>

        </div>
      </div>

      {/* ===== Form overlay panel ===== */}
      <AnimatePresence>
        {formOpen && (
          <>
            {/* Backdrop — full viewport dim + blur; click to close */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setFormOpen(false)}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }}
              aria-hidden
            />

            {/* Centered modal — pops in middle of viewport */}
            <div
              className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:px-4 sm:py-8 pointer-events-none"
            >
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label="Book your free counselling call"
                className="pointer-events-auto relative w-full sm:max-w-[480px] bg-white shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:rounded-[24px] overflow-hidden"
                style={{ border: "1px solid #E0E6F2", boxShadow: "0 24px 64px rgba(15,23,42,0.30)" }}
              >
                {/* Slim top bar — step indicator + close. Always visible. */}
                <div
                  className="flex-shrink-0 flex items-center justify-between gap-3 px-4 sm:px-5 border-b"
                  style={{
                    borderColor: "#F0F0F0",
                    paddingTop: "max(0.75rem, env(safe-area-inset-top))",
                    paddingBottom: "0.75rem",
                  }}
                >
                  <span />

                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
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

                {/* Scrollable form area — sticky footer inside RegisterForm pins Back/Continue to the bottom */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 sm:px-6 sm:pt-5"
                  style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
                >
                  <RegisterForm
                    onStepChange={handleFormStepChange}
                    onSubmitSuccess={handleFormSubmitSuccess}
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

