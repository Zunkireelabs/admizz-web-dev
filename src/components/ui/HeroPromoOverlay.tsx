"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface HeroPromoOverlayProps {
  id: string;
  eyebrow: string;
  headline: ReactNode;
  subhead: string;
  offerLine: ReactNode;
  ctaText: string;
  ctaHref: string;
  validityNote?: string;
  imageSrc?: string;
  imageAlt?: string;
  delayMs?: number;
}

export default function HeroPromoOverlay({
  id,
  eyebrow,
  headline,
  subhead,
  offerLine,
  ctaText,
  ctaHref,
  validityNote,
  imageSrc,
  imageAlt = "Promo",
  delayMs = 3500,
}: HeroPromoOverlayProps) {
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
          key="hero-promo-backdrop"
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
            key="hero-promo-card"
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-headline`}
            className="relative w-[95vw] max-w-2xl rounded-2xl bg-white overflow-hidden shadow-[0_30px_80px_rgba(0,19,83,0.35)] max-h-[90vh] overflow-y-auto"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.32, ease: [0.2, 0.9, 0.2, 1] }}
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={dismiss}
              aria-label="Close offer"
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-dark focus-visible:ring-offset-2 transition-colors shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row">
              {/* Left: image + logo overlay */}
              {imageSrc && (
                <div className="relative w-full sm:w-[44%] min-h-[200px] sm:min-h-[460px] flex-shrink-0 overflow-hidden bg-white">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 44vw"
                    priority
                  />
                  {/* Right-edge fade to white for seamless blend into content */}
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white/60 pointer-events-none" />
                </div>
              )}

              {/* Right: content */}
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                {/* Eyebrow pill */}
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-dark/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.10em] text-blue-dark">
                  {eyebrow}
                </div>

                {/* Nepali headline */}
                <h2
                  id={`${id}-headline`}
                  className="text-[22px] sm:text-[26px] leading-[1.2] font-bold text-blue-dark"
                  style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}
                >
                  {headline}
                </h2>

                {/* Subhead */}
                <p className="text-[14px] sm:text-[15px] leading-[1.55] text-gray-dark -mt-2">
                  {subhead}
                </p>

                {/* Offer box */}
                <div className="rounded-xl bg-yellow-bright/20 border border-yellow px-4 py-3 text-[15px] font-bold text-blue-dark">
                  {offerLine}
                  {validityNote && (() => {
                    const inBox = validityNote.split("•")[1]?.trim();
                    return inBox ? (
                      <p className="text-[12px] text-gray-400 text-left mt-1 whitespace-nowrap font-normal">{inBox}</p>
                    ) : null;
                  })()}
                </div>

                {/* CTA */}
                <Link
                  href={ctaHref}
                  onClick={dismiss}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow px-6 py-3.5 text-[15px] font-semibold text-blue-dark transition-all duration-200 hover:bg-golden-hover hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-dark focus-visible:ring-offset-2"
                >
                  {ctaText}
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>

                {/* Below CTA note */}
                {validityNote && (() => {
                  const belowCta = validityNote.split("•")[0]?.trim();
                  return belowCta ? (
                    <p className="text-[12px] text-gray-400 text-center -mt-1 whitespace-nowrap">{belowCta}</p>
                  ) : null;
                })()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
