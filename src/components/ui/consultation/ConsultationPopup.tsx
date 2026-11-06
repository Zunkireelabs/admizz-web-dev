"use client";

import { useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LAST_STEP,
  StepFields,
  StepPills,
  STEPS,
  useConsultationForm,
  type ConsultationFormOptions,
} from "./useConsultationForm";

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

interface ConsultationPopupProps extends ConsultationFormOptions {
  open: boolean;
  onClose: () => void;
}

function PopupBody({ onClose, ...options }: Omit<ConsultationPopupProps, "open">) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const f = useConsultationForm(options);
  const { step, done, submitting, advance, goBack, title } = f;

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
            {done ? <span /> : <StepPills step={step} />}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-10 h-10 sm:w-9 sm:h-9 flex-shrink-0 rounded-full flex items-center justify-center transition-colors hover:bg-[#F0F4FF]"
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
                advance();
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
                  {title}
                </h2>
                <p className="text-[15px] text-body mb-5">{STEPS[step].subtitle}</p>
                <StepFields f={f} idPrefix={uid} />
              </motion.div>

              {/* Footer: always visible */}
              <div
                className="flex-shrink-0 flex items-center justify-between gap-3 border-t px-4 sm:px-6 pt-4"
                style={{ borderColor: "#F0F0F0", paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
              >
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
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
                  {step < LAST_STEP ? "Next" : submitting ? "Sending..." : "Submit"}
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
