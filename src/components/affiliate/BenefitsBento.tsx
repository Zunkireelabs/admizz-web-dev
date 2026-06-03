"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const BENEFITS = [
  {
    id: "income",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Earn Real Income",
    body: "Every student you refer who enrolls earns you a competitive commission. No cap. No ceiling. Just results.",
    featured: true,
    accentColor: "#FDED22",
    iconBg: "rgba(253,237,34,0.12)",
  },
  {
    id: "brand",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Build Your Personal Brand",
    body: "Get featured as an official Admizz Affiliate on our website, social media, and marketing materials.",
    accentColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.12)",
  },
  {
    id: "kit",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Everything Ready to Share",
    body: "Instagram posts, WhatsApp messages, banners, email templates — all ready. Just share.",
    accentColor: "#31429C",
    iconBg: "rgba(49,66,156,0.18)",
  },
  {
    id: "cert",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Leadership Certificate",
    body: "Every affiliate earns an official Admizz certificate recognized by universities and employers.",
    accentColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.12)",
  },
  {
    id: "community",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Join an Elite Network",
    body: "Connect with ambitious students, creators, and education professionals across Nepal. Private community.",
    accentColor: "#FDED22",
    iconBg: "rgba(253,237,34,0.12)",
  },
  {
    id: "events",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Global Events & Workshops",
    body: "University fairs, IELTS prep sessions, scholarship workshops, and Admizz partner events — invited.",
    accentColor: "#31429C",
    iconBg: "rgba(49,66,156,0.18)",
  },
];

export default function BenefitsBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      className="py-24 md:py-28 relative overflow-hidden"
      style={{ background: "#030615" }}
    >
      {/* Refined ambient depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(49,66,156,0.2) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 30% at 80% 20%, rgba(252,183,48,0.05) 0%, transparent 60%)" }} />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium section header */}
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
            Why Join
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold text-white leading-[1.1] tracking-[-0.015em]">
            More Than Just Commissions
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.55)" }}>
            Every benefit designed to help you grow alongside Admizz.
          </p>
        </motion.div>

        {/* Premium uniform grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.id}
              className="relative rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
              style={{
                background: b.featured ? "rgba(253,237,34,0.04)" : "rgba(255,255,255,0.025)",
                border: b.featured
                  ? "1px solid rgba(253,237,34,0.25)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: b.featured
                  ? "0 0 40px rgba(253,237,34,0.08), 0 8px 32px rgba(0,0,0,0.3)"
                  : "0 4px 24px rgba(0,0,0,0.25)",
                backdropFilter: "blur(12px)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -5,
                background: b.featured ? "rgba(253,237,34,0.06)" : "rgba(255,255,255,0.045)",
                boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${b.accentColor}30`,
                transition: { duration: 0.22 },
              }}
            >
              {/* Top accent line */}
              <div className="h-[2px] w-full" style={{ background: b.accentColor }} />

              {/* Featured glow */}
              {b.featured && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${b.accentColor}12 0%, transparent 70%)` }} />
              )}

              {/* Hover glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${b.accentColor}10 0%, transparent 70%)` }}
              />

              <div className="relative p-7 md:p-8 flex flex-col flex-1">
                {b.featured && (
                  <span
                    className="self-start px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase mb-5"
                    style={{
                      background: "rgba(253,237,34,0.15)",
                      border: "1px solid rgba(253,237,34,0.3)",
                      color: "#FDED22",
                      letterSpacing: "0.15em",
                    }}
                  >
                    ★ Top Benefit
                  </span>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: b.iconBg, color: b.accentColor, border: `1px solid ${b.accentColor}20` }}
                >
                  {b.icon}
                </div>
                <h3 className={`text-lg md:text-[19px] font-bold mb-3 tracking-tight ${b.featured ? "text-yellow" : "text-white"}`}>
                  {b.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
