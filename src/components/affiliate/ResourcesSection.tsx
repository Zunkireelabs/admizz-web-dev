"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const FEATURED = [
  {
    title: "Social Media Kit",
    body: "Instagram posts, TikTok templates, WhatsApp messages, and story graphics — all pre-made with your referral link slot ready to fill in. Download and post in under a minute.",
    items: ["Instagram & TikTok posts", "WhatsApp message templates", "Stories and banners"],
    accentColor: "#FCB730",
    accentBg: "rgba(252,183,48,0.12)",
    accentBorder: "rgba(252,183,48,0.3)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Tracking Dashboard",
    body: "Your unique referral link with a real-time dashboard. See every click, every consultation booked, every conversion — live. Know exactly what's working.",
    items: ["Personal referral link", "Real-time click tracking", "Conversion analytics"],
    accentColor: "#FDED22",
    accentBg: "rgba(253,237,34,0.12)",
    accentBorder: "rgba(253,237,34,0.3)",
    featured: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Partner Support",
    body: "A dedicated support line for affiliates. Real humans, fast responses on WhatsApp or email. Plus a monthly newsletter with strategy tips and top performer features.",
    items: ["WhatsApp & email support", "Brand style guide", "Monthly affiliate newsletter"],
    accentColor: "#31429C",
    accentBg: "rgba(49,66,156,0.18)",
    accentBorder: "rgba(49,66,156,0.35)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function ResourcesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-28 relative overflow-hidden" style={{ background: "#0a1226" }}>
      {/* Refined ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(252,183,48,0.08) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-16 md:mb-20" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase mb-6"
            style={{
              background: "rgba(253,237,34,0.08)",
              border: "1px solid rgba(253,237,34,0.22)",
              color: "#FDED22",
              letterSpacing: "0.18em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#FDED22" }} />
            Your Kit
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold text-white leading-[1.1] tracking-[-0.015em]">
            Everything You Need, Day One.
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.55)" }}>
            No guesswork. Your complete affiliate kit is ready the moment you&apos;re approved.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {FEATURED.map((r, i) => (
            <motion.div
              key={r.title}
              className="relative rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
              style={{
                background: r.featured ? "rgba(253,237,34,0.04)" : "rgba(255,255,255,0.025)",
                border: r.featured
                  ? "1px solid rgba(253,237,34,0.25)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: r.featured
                  ? "0 0 40px rgba(253,237,34,0.08), 0 8px 32px rgba(0,0,0,0.3)"
                  : "0 4px 24px rgba(0,0,0,0.25)",
                backdropFilter: "blur(20px)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -6,
                background: r.featured ? "rgba(253,237,34,0.06)" : "rgba(255,255,255,0.045)",
                borderColor: r.accentBorder,
                boxShadow: `0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px ${r.accentBorder}`,
                transition: { duration: 0.25 },
              }}
            >
              {/* Top accent bar */}
              <div className="h-[2px] w-full" style={{ background: r.accentColor }} />

              {/* Featured glow */}
              {r.featured && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${r.accentColor}10 0%, transparent 70%)` }} />
              )}

              <div className="p-7 md:p-8 flex flex-col flex-1 relative">
                {r.featured && (
                  <span
                    className="self-start px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase mb-5"
                    style={{
                      background: "rgba(253,237,34,0.15)",
                      border: "1px solid rgba(253,237,34,0.3)",
                      color: "#FDED22",
                      letterSpacing: "0.15em",
                    }}
                  >
                    ★ Most Used
                  </span>
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: r.accentBg, color: r.accentColor, border: `1px solid ${r.accentBorder}` }}
                >
                  {r.icon}
                </div>

                <h3 className="text-lg md:text-[20px] font-bold text-white mb-3 tracking-tight">{r.title}</h3>
                <p className="text-[14.5px] leading-[1.65] mb-7 flex-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {r.body}
                </p>

                <ul className="space-y-2.5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {r.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-[13.5px]"
                      style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: r.accentBg, color: r.accentColor }}
                      >
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 md:mt-16 text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-[14px] mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            Everything above is included when you join — completely free.
          </p>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] font-extrabold text-[14.5px] text-black bg-yellow"
            style={{ boxShadow: "0 4px 28px rgba(253,237,34,0.4)" }}
            whileHover={reduce ? {} : { scale: 1.04, boxShadow: "0 8px 40px rgba(253,237,34,0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Apply Now — It&apos;s Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
