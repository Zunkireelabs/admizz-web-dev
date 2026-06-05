"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const BENEFITS = [
  {
    id: "income",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Earn Real Income",
    body:
      "Get paid for every consultation, enrollment, and visa approval your referrals complete. Performance-based, transparent, paid monthly.",
    featured: true,
    accentColor: "#FDED22",
    iconBg: "rgba(253,237,34,0.12)",
  },
  {
    id: "kit",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    title: "Ready-Made Marketing Kit",
    body:
      "Instagram posts, WhatsApp templates, banners, and email copy — built by our team, ready for you to share.",
    featured: false,
    accentColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.12)",
  },
  {
    id: "community",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Affiliate Community",
    body:
      "Direct support from the Admizz team and a private space to learn from other affiliates as you grow.",
    featured: false,
    accentColor: "#31429C",
    iconBg: "rgba(49,66,156,0.18)",
  },
];

export default function BenefitsBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" style={{ background: "#F6F2E8" }}>
      {/* Warm aurora — gold top-left (toned down) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 15% 30%, rgba(252,183,48,0.12) 0%, transparent 60%)",
        }}
      />
      {/* Cool aurora — blue bottom-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 45% at 85% 85%, rgba(49,66,156,0.10) 0%, transparent 60%)",
        }}
      />
      {/* Top-side lit-from-above glow — stays on cream half, never crosses into dark */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "260px",
          background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(252,183,48,0.22) 0%, rgba(252,183,48,0.06) 40%, transparent 75%)",
        }}
      />
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,19,83,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Top hairline — designed seam */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.55), transparent)" }}
      />
      {/* Bottom hairline — designed seam */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.55), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase mb-6"
            style={{
              background: "rgba(252,183,48,0.18)",
              border: "1px solid rgba(252,183,48,0.45)",
              color: "#8a5a00",
              letterSpacing: "0.18em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#FCB730" }} />
            What You Get
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-[-0.015em]" style={{ color: "#001353" }}>
            Three things that make this worth your time.
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "#5C7189" }}>
            Real income, ready-made tools, and a team behind you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.id}
              className="relative rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
              style={{
                background: b.featured ? "#FFFBEA" : "#FFFFFF",
                border: b.featured
                  ? "1px solid rgba(252,183,48,0.45)"
                  : "1px solid rgba(0,19,83,0.08)",
                boxShadow: b.featured
                  ? "0 0 40px rgba(252,183,48,0.15), 0 10px 28px rgba(0,19,83,0.08)"
                  : "0 6px 20px rgba(0,19,83,0.06)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -5,
                      boxShadow: `0 18px 40px rgba(0,19,83,0.12), 0 0 0 1px ${b.accentColor}55`,
                      transition: { duration: 0.22 },
                    }
              }
            >
              <div className="h-[2px] w-full" style={{ background: b.accentColor }} />

              {b.featured && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${b.accentColor}1f 0%, transparent 70%)`,
                  }}
                />
              )}

              <div className="relative p-5 sm:p-7 md:p-8 flex flex-col flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${b.accentColor}22`,
                    color: b.accentColor === "#FDED22" ? "#8a5a00" : b.accentColor,
                    border: `1px solid ${b.accentColor}55`,
                  }}
                >
                  {b.icon}
                </div>
                <h3
                  className="text-lg md:text-[19px] font-bold mb-3 tracking-tight"
                  style={{ color: "#001353" }}
                >
                  {b.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65]" style={{ color: "#5C7189" }}>
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
