"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const BENEFITS = [
  {
    id: "income",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Earn Real Income",
    body: "Every student you refer who enrolls earns you a competitive commission. No cap. No ceiling. Just results.",
    wide: true,
    accentColor: "#FDED22",
    iconBg: "rgba(253,237,34,0.12)",
  },
  {
    id: "brand",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Build Your Personal Brand",
    body: "Get featured as an official Admizz Affiliate on our website, social media, and marketing materials.",
    wide: false,
    accentColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.12)",
  },
  {
    id: "kit",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Everything Ready to Share",
    body: "Instagram posts, WhatsApp messages, banners, email templates — all ready. Just share.",
    wide: false,
    accentColor: "#31429C",
    iconBg: "rgba(49,66,156,0.2)",
  },
  {
    id: "cert",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Leadership Certificate",
    body: "Every affiliate earns an official Admizz certificate recognized by universities and employers.",
    wide: true,
    accentColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.12)",
  },
  {
    id: "community",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Join an Elite Network",
    body: "Connect with ambitious students, creators, and education professionals across Nepal. Private community.",
    wide: true,
    accentColor: "#FDED22",
    iconBg: "rgba(253,237,34,0.12)",
  },
  {
    id: "events",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Access Global Events & Workshops",
    body: "University fairs, IELTS prep sessions, scholarship workshops, and Admizz partner events — invited.",
    wide: false,
    accentColor: "#31429C",
    iconBg: "rgba(49,66,156,0.2)",
  },
];

export default function BenefitsBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "#050d2d" }}
    >
      {/* Radial glow center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(49,66,156,0.22) 0%, transparent 70%)" }} />
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(253,237,34,0.1)", border: "1px solid rgba(253,237,34,0.25)", color: "#FDED22" }}
          >
            Why Join
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Why Join the Admizz Affiliate Program?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            It&apos;s more than just commissions.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.id}
              className={`relative rounded-2xl overflow-hidden flex flex-col group ${b.wide ? "sm:col-span-2 lg:col-span-2" : ""}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -3,
                background: "rgba(255,255,255,0.07)",
                boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${b.accentColor}25`,
                transition: { duration: 0.22 },
              }}
            >
              {/* Top accent line */}
              <div className="h-0.5 w-full" style={{ background: b.accentColor }} />

              {/* Animated bottom line on hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: b.accentColor, opacity: 0.5 }}
              />

              {/* Glow on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${b.accentColor}08 0%, transparent 70%)` }}
              />

              <div className="p-7 flex flex-col flex-1 relative z-10">
                <div
                  className="w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: b.iconBg, color: b.accentColor, border: `1px solid ${b.accentColor}20` }}
                >
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
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
