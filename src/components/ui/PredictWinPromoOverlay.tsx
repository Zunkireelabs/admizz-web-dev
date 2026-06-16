"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface PredictWinPromoOverlayProps {
  id: string;
  imageSrc: string;
  imageAlt?: string;
  ctaText: string;
  ctaHref: string;
  delayMs?: number;
}

export default function PredictWinPromoOverlay({
  id,
  imageSrc,
  imageAlt = "Predict & Win — FIFA World Cup 2026",
  ctaText,
  ctaHref,
  delayMs = 3500,
}: PredictWinPromoOverlayProps) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key === "Tab" && cardRef.current) {
        const focusables = cardRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="predict-win-backdrop"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <motion.div
            key="predict-win-card"
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            className="relative w-[95vw] max-w-[520px] rounded-2xl bg-white overflow-hidden shadow-[0_30px_80px_rgba(0,19,83,0.35)] max-h-[90vh] overflow-y-auto"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.32, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={dismiss}
              aria-label="Close offer"
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-slate hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-dark focus-visible:ring-offset-2 transition-colors shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 id={`${id}-title`} className="sr-only">
              Predict & Win — FIFA World Cup 2026
            </h2>

            <div className="relative w-full aspect-square">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 95vw, 520px"
                priority
              />
            </div>

            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <Link
                href={ctaHref}
                onClick={dismiss}
                className="block w-full text-center bg-yellow text-black font-bold text-[16px] sm:text-[17px] px-6 py-3.5 rounded-[12px] hover:brightness-95 transition-all shadow-[0_6px_20px_rgba(253,237,34,0.35)]"
              >
                {ctaText}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
