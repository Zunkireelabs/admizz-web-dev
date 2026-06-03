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
    answer: "The minimum payout threshold is NPR 500. Once your earnings reach that amount, your commission is queued for the next monthly payout cycle — automatically, with no request needed.",
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
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "#FFFFFF",
        border: open ? "1px solid rgba(252,183,48,0.4)" : "1px solid #EAECF0",
        boxShadow: open
          ? "0 8px 32px rgba(252,183,48,0.1), 0 0 0 1px rgba(252,183,48,0.15)"
          : "0 1px 2px rgba(16,24,40,0.04)",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-6 md:px-7 py-5 md:py-6 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-all duration-300"
            style={{
              background: open ? "rgba(252,183,48,0.15)" : "rgba(0,19,83,0.05)",
              color: open ? "#b07400" : "#001353",
              border: open ? "1px solid rgba(252,183,48,0.35)" : "1px solid rgba(0,19,83,0.1)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-[14.5px] md:text-base font-semibold transition-colors duration-300 leading-snug"
            style={{ color: "#001353" }}
          >
            {item.question}
          </span>
        </div>
        <span
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "#FCB730" : "rgba(0,19,83,0.05)",
            color: open ? "#001353" : "#5C7189",
            transform: open ? "rotate(180deg)" : "none",
            border: open ? "1px solid rgba(252,183,48,0.5)" : "1px solid rgba(0,19,83,0.08)",
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div style={{ height, overflow: "hidden", transition: "height 0.32s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <div ref={contentRef} className="px-6 md:px-7 pb-6" style={{ paddingLeft: "72px" }}>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: "#5C7189" }}>
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
    <section style={{ background: "#FAFAFB" }} className="py-24 md:py-28 relative overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(252,183,48,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-14 md:mb-16" ref={ref}
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
            Frequently Asked
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-[-0.015em]" style={{ color: "#001353" }}>
            Everything You Need to Know
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "#5C7189" }}>
            Honest answers to the most common questions before you apply.
          </p>
        </motion.div>

        {/* Accordion items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Item item={item} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Contact nudge — premium treatment */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              background: "#FFFFFF",
              border: "1px solid #EAECF0",
              boxShadow: "0 4px 16px rgba(16,24,40,0.04)",
            }}
          >
            <span className="text-sm" style={{ color: "#5C7189" }}>Still have questions?</span>
            <a
              href="/contact"
              className="text-sm font-bold transition-colors duration-200 inline-flex items-center gap-1.5"
              style={{ color: "#b07400" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#001353"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#b07400"; }}
            >
              Talk to our team
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
