"use client";

import { motion, useReducedMotion } from "framer-motion";
import MobilityGlobe from "./globe/MobilityGlobe";
import { useSignupModal } from "./SignupModal";

export default function AffiliateHero() {
  const reduce = useReducedMotion();
  const { open } = useSignupModal();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #010b22 0%, #001353 55%, #0c1270 100%)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 55% at 20% 50%, rgba(49,66,156,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(252,183,48,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #FCB730 30%, #FDED22 50%, #FCB730 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* ── LEFT: Text ────────────────────────────────────────── */}
          <div className="w-full lg:w-[56%] flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <span
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase"
                style={{
                  background: "rgba(253,237,34,0.08)",
                  border: "1px solid rgba(253,237,34,0.28)",
                  color: "#FDED22",
                  backdropFilter: "blur(12px)",
                  letterSpacing: "0.18em",
                }}
              >
                Admizz Affiliate Program
              </span>
            </motion.div>

            <motion.h1
              className="mt-7 font-extrabold leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.2rem)" }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Help students go abroad.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FCB730 0%, #FDED22 55%, #FCB730 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 24px rgba(252,183,48,0.35))",
                }}
              >
                Get paid for it.
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base md:text-[17px] leading-relaxed max-w-[540px]"
              style={{ color: "rgba(255,255,255,0.65)" }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Refer students to Admizz Education and earn a commission on every consultation,
              enrollment, and visa approval. Built for campus ambassadors, content creators,
              and education professionals.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 w-full"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.button
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[10px] font-extrabold text-[15px] text-black w-full sm:w-auto"
                style={{
                  background: "#FDED22",
                  boxShadow: "0 4px 28px rgba(253,237,34,0.4)",
                }}
                whileHover={
                  reduce
                    ? {}
                    : { scale: 1.04, boxShadow: "0 6px 40px rgba(253,237,34,0.55)" }
                }
                whileTap={{ scale: 0.97 }}
                onClick={open}
              >
                Sign Up
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>

              <motion.button
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[10px] font-semibold text-[15px] text-white w-full sm:w-auto"
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.04)",
                }}
                whileHover={
                  reduce
                    ? {}
                    : {
                        background: "rgba(255,255,255,0.08)",
                        borderColor: "rgba(255,255,255,0.35)",
                      }
                }
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See how it works
              </motion.button>
            </motion.div>

            <motion.p
              className="mt-8 text-[13px] md:text-[14px] font-medium"
              style={{ color: "rgba(255,255,255,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Free to join
              <span className="mx-2.5" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              Reviewed within 48 hours
              <span className="mx-2.5" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              No referral targets
            </motion.p>
          </div>

          {/* ── RIGHT: Globe ─────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-[44%] relative max-w-[560px] mx-auto lg:mx-0"
            style={{ height: "clamp(320px, 42vw, 520px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <MobilityGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
