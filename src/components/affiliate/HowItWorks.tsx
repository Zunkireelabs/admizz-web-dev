"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Apply in 5 Minutes",
    body: "Tell us who you are, how you'll share Admizz, and why you want to join. No follower count needed. No experience required.",
    tag: "⏱ Takes 5 minutes",
    tagBg: "rgba(0,19,83,0.07)",
    tagColor: "#001353",
    tagBorder: "rgba(0,19,83,0.15)",
  },
  {
    num: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Receive Your Affiliate Kit",
    body: "Your unique referral link, ready-to-use marketing pack, and dashboard access to track every click and conversion in real time.",
    tag: "✓ Approval within 48 hours",
    tagBg: "rgba(252,183,48,0.1)",
    tagColor: "#b07400",
    tagBorder: "rgba(252,183,48,0.3)",
  },
  {
    num: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Share Your Link & Earn",
    body: "Post on Instagram, share in WhatsApp groups, put it in your bio. Every successful student referral earns you a commission.",
    tag: "🚀 No earning limit",
    tagBg: "rgba(0,19,83,0.07)",
    tagColor: "#001353",
    tagBorder: "rgba(0,19,83,0.15)",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      style={{ background: "#F8F8F8" }}
      className="py-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center mb-14" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(0,19,83,0.07)", border: "1px solid rgba(0,19,83,0.12)", color: "#001353" }}
          >
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#001353" }}>
            Get Started in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#5C7189" }}>
            From application to earning — in under 48 hours.
          </p>
        </motion.div>

        {/* ── DESKTOP: horizontal steps ── */}
        <div className="hidden lg:block relative">
          {/* Track line */}
          <div className="absolute top-[26px] left-[16%] right-[16%] h-px" style={{ background: "#E8EAF0" }} />
          {/* Animated golden fill */}
          <div className="absolute top-[26px] left-[16%] right-[16%] h-px overflow-hidden">
            <motion.div
              className="h-full w-full"
              style={{
                background: "linear-gradient(90deg, #FCB730 0%, #FDED22 60%, #FCB730 100%)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex flex-col items-center text-center"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.18, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {/* Step node */}
                <motion.div
                  className="relative w-[52px] h-[52px] rounded-full flex items-center justify-center mb-8 z-10 bg-white"
                  style={{
                    border: "2px solid #FCB730",
                    boxShadow: "0 0 0 6px rgba(252,183,48,0.1), 0 2px 16px rgba(0,19,83,0.12)",
                    color: "#001353",
                  }}
                  animate={inView ? {
                    boxShadow: [
                      "0 0 0 6px rgba(252,183,48,0.1), 0 2px 16px rgba(0,19,83,0.12)",
                      "0 0 0 12px rgba(252,183,48,0.06), 0 2px 24px rgba(252,183,48,0.25)",
                      "0 0 0 6px rgba(252,183,48,0.1), 0 2px 16px rgba(0,19,83,0.12)",
                    ],
                  } : {}}
                  transition={{ duration: 2.5, delay: 1 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                >
                  {step.icon}
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                    style={{ background: "#FDED22", color: "#001353" }}
                  >
                    {i + 1}
                  </span>
                </motion.div>

                <h3 className="text-xl font-bold mb-3" style={{ color: "#001353" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "#5C7189" }}>
                  {step.body}
                </p>
                <span
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: step.tagBg,
                    border: `1px solid ${step.tagBorder}`,
                    color: step.tagColor,
                  }}
                >
                  {step.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: vertical steps ── */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="flex gap-5"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-white"
                  style={{ border: "2px solid #FCB730", color: "#001353", boxShadow: "0 2px 12px rgba(252,183,48,0.2)" }}
                >
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <motion.div
                    className="w-px flex-1 mt-2 mb-2 min-h-[40px]"
                    style={{ background: "linear-gradient(180deg, #FCB730, rgba(252,183,48,0.2))" }}
                    initial={{ scaleY: 0, transformOrigin: "top" }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                  />
                )}
              </div>
              <div className="pb-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold opacity-25" style={{ color: "#001353" }}>{step.num}</span>
                  <h3 className="text-lg font-bold" style={{ color: "#001353" }}>{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#5C7189" }}>{step.body}</p>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: step.tagBg, border: `1px solid ${step.tagBorder}`, color: step.tagColor }}
                >
                  {step.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA nudge */}
        <motion.div className="mt-16 text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] font-extrabold text-[15px] text-black"
            style={{ background: "#FDED22", boxShadow: "0 4px 28px rgba(253,237,34,0.45)" }}
            whileHover={reduce ? {} : { scale: 1.04, boxShadow: "0 6px 36px rgba(253,237,34,0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
