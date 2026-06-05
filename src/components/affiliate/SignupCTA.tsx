"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSignupModal } from "./SignupModal";

const TRUST_ITEMS = ["Free to join", "Response within 48h", "No referral targets"];
const AVATARS: { bg: string; initials: string; ink: string }[] = [
  { bg: "#31429C", initials: "PS", ink: "#fff"    },
  { bg: "#FCB730", initials: "RK", ink: "#001353" },
  { bg: "#4ade80", initials: "BT", ink: "#fff"    },
  { bg: "#FDED22", initials: "AM", ink: "#001353" },
];

export default function SignupCTA() {
  const { open } = useSignupModal();
  const reduce = useReducedMotion();

  return (
    <section
      id="apply-form"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "#060c1f" }}
    >
      {/* Top gold hairline — designed seam */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.55), transparent)" }}
      />
      {/* Bottom gold hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.55), transparent)" }}
      />
      {/* Cool blue glow — top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(49,66,156,0.3) 0%, transparent 65%)" }}
      />
      {/* Warm gold glow — bottom-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 100%, rgba(252,183,48,0.10) 0%, transparent 65%)" }}
      />
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Pill */}
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase"
          style={{
            background: "rgba(253,237,34,0.08)",
            border: "1px solid rgba(253,237,34,0.22)",
            color: "#FDED22",
            letterSpacing: "0.18em",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: "#FDED22" }} />
          Join the Program
        </motion.span>

        {/* Heading */}
        <motion.h2
          className="mt-6 text-[32px] sm:text-[40px] md:text-[52px] font-extrabold text-white leading-[1.05] tracking-[-0.02em]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          Sign up in 5 minutes
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-5 text-base md:text-[17px] leading-[1.6]"
          style={{ color: "rgba(255,255,255,0.55)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Free to join. Approval within 48 hours. No referral targets.
        </motion.p>

        {/* Social proof container — enlarged */}
        <motion.div
          className="mt-8 inline-flex items-center gap-4 px-5 py-3 rounded-full"
          style={{
            background: "rgba(252,183,48,0.08)",
            border: "1px solid rgba(252,183,48,0.28)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex -space-x-2.5">
            {AVATARS.map((a) => (
              <div
                key={a.initials}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                style={{
                  background: a.bg,
                  border: "2px solid #060c1f",
                  color: a.ink,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <span className="text-[14px] font-semibold pr-2" style={{ color: "rgba(255,255,255,0.72)" }}>
            Join <span style={{ color: "#FCB730", fontWeight: 800 }}>847+</span> active Admizz affiliates
          </span>
        </motion.div>

        {/* CTA button with pulsing halo */}
        <motion.div
          className="mt-10 relative inline-flex"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {/* Pulsing halo */}
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-[14px] pointer-events-none"
              style={{ background: "rgba(253,237,34,0.35)", filter: "blur(24px)" }}
              animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.button
            type="button"
            onClick={open}
            className="relative inline-flex items-center gap-2.5 px-10 py-4 rounded-[14px] text-[15px] font-extrabold text-black"
            style={{
              background: "#FDED22",
              boxShadow: "0 6px 32px rgba(253,237,34,0.45), 0 0 0 1px rgba(252,183,48,0.5) inset",
            }}
            whileHover={
              reduce
                ? {}
                : { scale: 1.04, boxShadow: "0 10px 44px rgba(253,237,34,0.6), 0 0 0 1px rgba(252,183,48,0.7) inset" }
            }
            whileTap={{ scale: 0.97 }}
          >
            Sign Up
            <motion.svg
              className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              animate={reduce ? {} : { x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-x-6 gap-y-3 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {TRUST_ITEMS.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-[12.5px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#FCB730" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
