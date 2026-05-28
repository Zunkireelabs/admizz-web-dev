"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "Who can join the Admizz Affiliate Program?",
    answer: "Anyone — students, content creators, education professionals, counselors, bloggers. If you know people planning to study abroad, you qualify. There is no minimum follower count or professional experience required.",
  },
  {
    question: "How do I track my referrals and earnings?",
    answer: "Every affiliate receives a unique referral link and access to a personal dashboard. You can see every click, every conversion, and every commission earned — all in real time.",
  },
  {
    question: "When and how do I get paid?",
    answer: "Commissions are paid monthly. You can receive your payout via eSewa, Khalti, or direct bank transfer — whichever you prefer.",
  },
  {
    question: "What's the minimum payout threshold?",
    answer: "Payout details — including minimum threshold — are shared with approved affiliates as part of the full commission structure. Apply to access the complete details.",
  },
  {
    question: "Can I join if I'm a high school student?",
    answer: "Yes. High school students can apply as Campus Ambassadors. You don't need to be enrolled in university.",
  },
  {
    question: "Do I need a large social media following or audience?",
    answer: "No. You don't need any following at all. You can refer through WhatsApp, word of mouth, your campus, or any channel you use. What matters is the referral, not the platform size.",
  },
  {
    question: "What happens if my referred student doesn't complete enrollment?",
    answer: "Commissions are confirmed once a student completes the relevant milestone (consultation, enrollment, visa, etc.). If a referral doesn't convert, no commission is issued — but there is no penalty or deduction from your account.",
  },
  {
    question: "Is there an approval process or can I join instantly?",
    answer: "There is a quick approval process. After you submit your application, our team reviews it within 48 hours. If approved, you receive your affiliate kit immediately via email.",
  },
];

function Item({ item, index }: { item: (typeof FAQ_ITEMS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? "#FFFFFF" : "#FFFFFF",
        border: open ? "1px solid #FCB730" : "1px solid #E8EAF0",
        boxShadow: open ? "0 4px 24px rgba(252,183,48,0.12)" : "0 2px 8px rgba(0,19,83,0.04)",
        borderLeft: open ? "4px solid #FCB730" : "1px solid #E8EAF0",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-all duration-300"
            style={{
              background: open ? "rgba(252,183,48,0.15)" : "rgba(0,19,83,0.06)",
              color: open ? "#FCB730" : "#001353",
              border: open ? "1px solid rgba(252,183,48,0.3)" : "1px solid rgba(0,19,83,0.12)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-sm md:text-base font-semibold transition-colors duration-300"
            style={{ color: open ? "#001353" : "#001353" }}
          >
            {item.question}
          </span>
        </div>
        <span
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "#FCB730" : "rgba(0,19,83,0.07)",
            color: open ? "#001353" : "#5C7189",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div style={{ height, overflow: "hidden", transition: "height 0.3s ease-in-out" }}>
        <div ref={contentRef} className="px-6 pb-5" style={{ paddingLeft: "68px" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#5C7189" }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AffiliateFAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section style={{ background: "#F8F8F8" }} className="py-14 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center mb-12" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(0,19,83,0.07)", border: "1px solid rgba(0,19,83,0.12)", color: "#001353" }}
          >
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#001353" }}>
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#5C7189" }}>
            Everything you need to know before applying.
          </p>
        </motion.div>

        {/* Accordion items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Item item={item} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Contact nudge */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm mb-3" style={{ color: "#5C7189" }}>Still have questions?</p>
          <a
            href="/contact"
            className="text-sm font-bold transition-colors duration-200"
            style={{ color: "#FCB730" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#001353"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#FCB730"; }}
          >
            Talk to our team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
