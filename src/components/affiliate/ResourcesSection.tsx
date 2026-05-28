"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const RESOURCES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Unique Referral Link",
    body: "Your personal tracking link with a real-time dashboard. See every click, every conversion.",
    accent: "#FCB730",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Instagram & TikTok Posts",
    body: "Ready-made captions and graphics. Just download and post.",
    accent: "#FCB730",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "WhatsApp Message Templates",
    body: "Pre-written messages to send to your contacts instantly.",
    accent: "#31429C",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Copy Templates",
    body: "For professionals and bloggers with an email list.",
    accent: "#FCB730",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Banners & Graphics",
    body: "All sizes for stories, posts, and website placements.",
    accent: "#FDED22",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Brand Style Guide",
    body: "Use Admizz logos and colors correctly — we make it foolproof.",
    accent: "#31429C",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Dedicated Affiliate Support",
    body: "Reach us on WhatsApp or email. Real humans, fast responses.",
    accent: "#FCB730",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    title: "Monthly Affiliate Newsletter",
    body: "Tips, strategy, top performer features, and program updates.",
    accent: "#FDED22",
  },
];

export default function ResourcesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section style={{ background: "#ffffff" }} className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center mb-12" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(0,19,83,0.07)", border: "1px solid rgba(0,19,83,0.12)", color: "#001353" }}
          >
            Your Kit
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#001353" }}>
            We Give You Everything You Need
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#5C7189" }}>
            Your affiliate kit — ready from day one. No guesswork.
          </p>
        </motion.div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESOURCES.map((r, i) => (
            <motion.div
              key={r.title}
              className="rounded-2xl p-6 flex flex-col bg-white group relative overflow-hidden"
              style={{
                border: "1px solid #E8EAF0",
                boxShadow: "0 2px 16px rgba(0,19,83,0.06)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -4,
                boxShadow: "0 12px 40px rgba(0,19,83,0.12)",
                borderColor: "#FCB730",
                transition: { duration: 0.22 },
              }}
            >
              {/* Icon in golden circle */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ background: "rgba(252,183,48,0.12)", color: "#FCB730" }}
              >
                {r.icon}
              </div>

              <h3 className="text-sm font-bold mb-2" style={{ color: "#001353" }}>{r.title}</h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "#5C7189" }}>{r.body}</p>

              {/* Bottom golden accent on hover */}
              <div
                className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: r.accent }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm mb-5" style={{ color: "#5C7189" }}>
            Everything above is included when you join — completely free.
          </p>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] font-extrabold text-[15px] text-black"
            style={{ background: "#FDED22", boxShadow: "0 4px 28px rgba(253,237,34,0.45)" }}
            whileHover={reduce ? {} : { scale: 1.04, boxShadow: "0 6px 36px rgba(253,237,34,0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Apply Now — It&apos;s Free →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
