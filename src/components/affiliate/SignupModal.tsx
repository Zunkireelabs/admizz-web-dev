"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApplicationForm from "./ApplicationForm";

type Ctx = { isOpen: boolean; open: () => void; close: () => void };
const SignupModalContext = createContext<Ctx | null>(null);

export function useSignupModal(): Ctx {
  const ctx = useContext(SignupModalContext);
  if (!ctx) throw new Error("useSignupModal must be used inside <SignupModalProvider>");
  return ctx;
}

export function SignupModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <SignupModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <SignupModal />
    </SignupModalContext.Provider>
  );
}

function SignupModal() {
  const { isOpen, close } = useSignupModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(2,6,15,0.78)", backdropFilter: "blur(10px)" }}
            onClick={close}
          />

          {/* Centered card */}
          <div className="relative min-h-full flex items-start justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden my-4"
              style={{
                background: "#060c1f",
                border: "1px solid rgba(252,183,48,0.18)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={close}
                aria-label="Close signup"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(252,183,48,0.15)";
                  e.currentTarget.style.color = "#FCB730";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="py-8 md:py-12">
                <ApplicationForm mode="modal" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
