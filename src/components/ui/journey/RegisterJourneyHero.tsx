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
    // Let the user see the slice flip green before the panel closes
    setTimeout(() => {
      setFormOpen(false);
      setDonutActive(1);
    }, 1200);
  };

  // Center hole content reflects current form sub-step or completion
  const centerEyebrow = submitted
    ? "Complete"
    : donutActive === COUNSELLING_INDEX
    ? `In progress · ${FORM_STEP_LABELS[formStep]}`
    : `Step ${journeySteps[donutActive].id}`;

  const nextUpStep = submitted ? journeySteps[1] : null;

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
            <div className="relative w-full pt-0 pb-6">
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

              {/* Locked-peek tooltip */}
              <AnimatePresence>
                {!submitted && donutActive !== COUNSELLING_INDEX && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 px-3 py-2 rounded-full text-[11px] sm:text-[12px] font-bold text-center"
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

            </div>{/* end shared centering wrapper */}

            {/* Post-submit success card */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[480px] rounded-[24px] p-5 md:p-7 text-center"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 18px 48px rgba(13,18,130,0.10), 0 4px 12px rgba(13,18,130,0.06)",
                  border: "1px solid #E0E6F2",
                }}
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, #4FBFA8, #2F9D85)" }}
                >
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h2
                  className="text-[20px] md:text-[24px] font-bold mb-2"
                  style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
                >
                  Done! Your counsellor is on it.
                </h2>
                <p className="text-[15px] leading-relaxed mb-5" style={{ color: "#5C7189" }}>
                  A counsellor will reach out within 24 hours.
                  <br />
                  No pressure, no spam.
                </p>
                {nextUpStep && (
                  <div
                    className="rounded-2xl p-4 mb-5 text-left"
                    style={{
                      background: nextUpStep.bgTint,
                      border: `1px solid ${nextUpStep.color}30`,
                    }}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: nextUpStep.colorDeep }}>
                      Next up · Step 2
                    </p>
                    <p className="text-[15px] font-bold mb-1" style={{ color: "#0D1282" }}>
                      {nextUpStep.title}
                    </p>
                    <p className="text-[13px]" style={{ color: "#5C7189" }}>
                      {nextUpStep.description}
                    </p>
                  </div>
                )}
                <a
                  href="https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%20just%20registered"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "#25D366", color: "#FFFFFF", minHeight: 48 }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Message us on WhatsApp
                </a>
              </motion.div>
            )}
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
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold"
                      style={{ background: "rgba(30,109,235,0.12)", color: "#1E6DEB" }}
                    >
                      {formStep + 1}
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#5C7189" }}>
                      Step {formStep + 1} of 3 · {FORM_STEP_LABELS[formStep]}
                    </span>
                  </div>
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
                    hideInternalSuccess
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

