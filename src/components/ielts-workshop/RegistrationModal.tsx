"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RegistrationForm from "./RegistrationForm";

type Ctx = { isOpen: boolean; open: () => void; close: () => void };
const RegistrationModalContext = createContext<Ctx | null>(null);

export function useRegistrationModal(): Ctx {
  const ctx = useContext(RegistrationModalContext);
  if (!ctx) throw new Error("useRegistrationModal must be used inside <RegistrationModalProvider>");
  return ctx;
}

export function RegistrationModalProvider({ children }: { children: ReactNode }) {
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
    <RegistrationModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <RegistrationModal />
    </RegistrationModalContext.Provider>
  );
}

function RegistrationModal() {
  const { isOpen, close } = useRegistrationModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Reserve your seat"
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,19,83,0.7)", backdropFilter: "blur(6px)" }}
            onClick={close}
          />

          {/* Centered card */}
          <div className="relative min-h-full flex items-center justify-center p-3 sm:p-6 md:p-10">
            <motion.div
              className="relative w-full max-w-md rounded-[16px] bg-white shadow-2xl my-6"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-off-white text-gray-dark hover:text-navy transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-4 sm:p-6">
                <RegistrationForm />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
