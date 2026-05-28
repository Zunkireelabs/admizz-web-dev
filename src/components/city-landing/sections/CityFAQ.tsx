"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { FaqItem } from "@/data/cities/types";

interface CityFAQProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: FaqItem[];
}

export default function CityFAQ({
  eyebrow,
  heading,
  subheading,
  items,
}: CityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="relative py-14 tablet:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)",
      }}
    >
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#1E6DEB" }}
          >
            {eyebrow}
          </p>
          <h2
            className="mt-3 text-navy font-bold"
            style={{
              fontFamily: "var(--font-rubik), sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-[15px] text-gray-dark">{subheading}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="mt-12 space-y-3"
        >
          {items.map((item, i) => (
            <FAQItemCard
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItemCard({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- measuring DOM scrollHeight after isOpen changes is unavoidable
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
      className="rounded-[18px] overflow-hidden transition-all duration-300"
      style={{
        background: isOpen
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.6)",
        border: `1px solid ${
          isOpen ? "rgba(13,18,130,0.15)" : "rgba(13,18,130,0.06)"
        }`,
        boxShadow: isOpen ? "0 8px 32px rgba(13,18,130,0.08)" : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 tablet:px-6 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`text-[15px] tablet:text-[16px] font-semibold transition-colors ${
            isOpen ? "text-blue-dark" : "text-navy"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #FCB730 0%, #0D1282 100%)"
              : "rgba(13,18,130,0.06)",
            color: isOpen ? "white" : "#0D1282",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.4}
              d="M12 5v14M5 12h14"
            />
          </svg>
        </span>
      </button>
      <div
        style={{ height }}
        className="transition-[height] duration-300 ease-out overflow-hidden"
      >
        <div ref={contentRef} className="px-5 tablet:px-6 pb-5">
          <p className="text-[14px] leading-relaxed text-gray-dark">
            {item.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
