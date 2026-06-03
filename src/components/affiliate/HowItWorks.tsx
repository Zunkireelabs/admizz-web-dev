"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Apply in 5 Minutes",
    body: "Tell us who you are, how you'll share Admizz, and why you want to join. No follower count needed. No experience required.",
    tag: "⏱ Takes 5 minutes",
    tagBg: "rgba(49,66,156,0.08)",
    tagColor: "#31429C",
    tagBorder: "rgba(49,66,156,0.22)",
    accent: "#31429C",
    accentText: "#fff",
    preview: (
      <div className="w-full rounded-2xl bg-white p-5 md:p-6" style={{ border: "1px solid #EAECF0", boxShadow: "0 4px 16px rgba(16,24,40,0.04)" }}>
        <p className="text-[10.5px] font-bold uppercase mb-4" style={{ color: "#5C7189", letterSpacing: "0.15em" }}>Application Form</p>
        <div className="space-y-3">
          {["Full Name", "Email Address", "How will you share Admizz?"].map(f => (
            <div key={f}>
              <p className="text-[10px] font-semibold mb-1.5" style={{ color: "#5C7189" }}>{f}</p>
              <div className="h-9 rounded-lg" style={{ background: "#F8F9FC", border: "1px solid #EAECF0" }} />
            </div>
          ))}
          <div className="mt-4 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #31429C, #0D1282)" }}>
            <span className="text-[11px] font-bold text-white">Submit Application →</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Receive Your Affiliate Kit",
    body: "Your unique referral link, ready-to-use marketing pack, and dashboard access to track every click and conversion in real time.",
    tag: "✓ Approval within 48 hours",
    tagBg: "rgba(252,183,48,0.1)",
    tagColor: "#b07400",
    tagBorder: "rgba(252,183,48,0.3)",
    accent: "#FCB730",
    accentText: "#001353",
    preview: (
      <div className="w-full rounded-2xl bg-white p-5 md:p-6" style={{ border: "1px solid #EAECF0", boxShadow: "0 4px 16px rgba(16,24,40,0.04)" }}>
        <p className="text-[10.5px] font-bold uppercase mb-4" style={{ color: "#5C7189", letterSpacing: "0.15em" }}>Your Dashboard</p>
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          {[
            { label: "Clicks", val: "128" },
            { label: "Referrals", val: "7" },
            { label: "Pending", val: "3" },
            { label: "Earned", val: "NPR 8,200" },
          ].map(s => (
            <div key={s.label} className="rounded-lg p-3" style={{ background: "#F8F9FC", border: "1px solid #EAECF0" }}>
              <p className="text-[9px] font-bold uppercase tracking-wide" style={{ color: "#5C7189" }}>{s.label}</p>
              <p className="text-sm font-extrabold mt-1" style={{ color: "#001353" }}>{s.val}</p>
            </div>
          ))}
        </div>
        <div className="h-9 rounded-lg flex items-center px-3 gap-2"
          style={{ background: "rgba(252,183,48,0.1)", border: "1px solid rgba(252,183,48,0.3)" }}>
          <span className="text-[10px] font-semibold" style={{ color: "#5C7189" }}>admizz.com/ref/</span>
          <span className="text-[10px] font-bold" style={{ color: "#31429C" }}>yourname123</span>
          <span className="ml-auto text-[9px] font-bold" style={{ color: "#b07400" }}>Copy</span>
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Share Your Link & Earn",
    body: "Post on Instagram, share in WhatsApp groups, put it in your bio. Every successful student referral earns you a commission.",
    tag: "🚀 No earning limit",
    tagBg: "rgba(253,237,34,0.1)",
    tagColor: "#7a6f00",
    tagBorder: "rgba(253,237,34,0.32)",
    accent: "#FDED22",
    accentText: "#001353",
    preview: (
      <div className="w-full rounded-2xl bg-white p-5 md:p-6" style={{ border: "1px solid #EAECF0", boxShadow: "0 4px 16px rgba(16,24,40,0.04)" }}>
        <p className="text-[10.5px] font-bold uppercase mb-4" style={{ color: "#5C7189", letterSpacing: "0.15em" }}>Earnings Summary</p>
        <div className="space-y-2">
          {[
            { event: "Consultation booked", amount: "+NPR 400", color: "#31429C" },
            { event: "Service enrollment", amount: "+NPR 2,000", color: "#FCB730" },
            { event: "University confirmed", amount: "+NPR 6,500", color: "#4ade80" },
          ].map(e => (
            <div key={e.event} className="flex items-center justify-between py-2 border-b last:border-0"
              style={{ borderColor: "rgba(0,19,83,0.06)" }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                <span className="text-[11px] font-medium" style={{ color: "#5C7189" }}>{e.event}</span>
              </div>
              <span className="text-[12px] font-extrabold" style={{ color: e.color }}>{e.amount}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(0,19,83,0.08)" }}>
          <span className="text-[11px] font-semibold" style={{ color: "#5C7189" }}>Total earned</span>
          <span className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>NPR 8,900</span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="py-24 md:py-28 relative overflow-hidden" style={{ background: "#FAFAFB" }}>
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(252,183,48,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Premium header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-16 md:mb-20" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase mb-6"
            style={{
              background: "rgba(0,19,83,0.06)",
              border: "1px solid rgba(0,19,83,0.12)",
              color: "#001353",
              letterSpacing: "0.18em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#FCB730" }} />
            Process
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-[-0.015em]" style={{ color: "#001353" }}>
            From Application to Earning<br className="hidden sm:block" /> in Under 48 Hours
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "#5C7189" }}>
            Three steps. No friction. No experience required.
          </p>
        </motion.div>

        {/* Premium steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 relative">
          {/* Desktop connector */}
          <div className="hidden lg:block absolute top-[24px] left-[calc(33.33%+18px)] right-[calc(33.33%+18px)] h-[2px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #31429C 0%, #FCB730 50%, #FDED22 100%)",
              opacity: 0.4,
            }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative flex flex-col"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.14, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {/* Step header */}
              <div className="flex gap-4 items-start mb-7">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-extrabold flex-shrink-0 relative z-10"
                  style={{
                    background: step.accent,
                    color: step.accentText,
                    boxShadow: `0 0 0 4px rgba(255,255,255,0.95), 0 8px 24px ${step.accent}60`,
                  }}
                >
                  {i + 1}
                </div>
                <div className="pt-1.5 flex-1">
                  <h3 className="text-[19px] md:text-[20px] font-extrabold tracking-tight mb-2" style={{ color: "#001353" }}>
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] mb-4" style={{ color: "#5C7189" }}>
                    {step.body}
                  </p>
                  <span
                    className="inline-block px-3 py-1.5 rounded-full text-[11.5px] font-bold"
                    style={{
                      background: step.tagBg,
                      border: `1px solid ${step.tagBorder}`,
                      color: step.tagColor,
                    }}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>

              {/* Visual preview */}
              <div className="px-0">
                {step.preview}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] font-extrabold text-[14.5px] text-black bg-yellow"
            style={{ boxShadow: "0 4px 28px rgba(253,237,34,0.4)" }}
            whileHover={reduce ? {} : { scale: 1.04, boxShadow: "0 8px 40px rgba(253,237,34,0.6)" }}
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
