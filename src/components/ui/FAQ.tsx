"use client";

import { useState, useRef, useEffect } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  twoColumn?: boolean;
  sidebar?: boolean;
  sidebarSubtitle?: string;
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`rounded-[10px] overflow-hidden border transition-colors duration-300 ${
        isOpen ? "border-navy/20 bg-white shadow-sm" : "border-border-light bg-transparent"
      }`}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`text-[15px] font-medium pr-4 transition-colors duration-300 ${
            isOpen ? "text-blue-royal" : "text-navy"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-blue-royal text-white rotate-180" : "bg-gray-100 text-navy"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        style={{ height }}
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="px-6 pb-5">
          <p className="text-sm text-gray-dark leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

function FAQAccordionItemAlt({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="rounded-[10px] overflow-hidden transition-shadow duration-300"
      style={{ background: isOpen ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)" }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`text-[15px] font-medium pr-4 transition-colors duration-300 ${
            isOpen ? "text-blue-royal" : "text-navy"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-blue-royal text-white rotate-180" : "bg-white/60 text-navy"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        style={{ height }}
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="px-5 pb-4">
          <p className="text-sm text-gray-dark leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

function FAQSidebarItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "bg-white shadow-sm" : ""
      }`}
      style={{ background: isOpen ? "#FFFFFF" : "rgba(255,255,255,0.5)" }}
    >
      <button
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`text-[13px] font-bold flex-shrink-0 transition-colors duration-300 ${
            isOpen ? "text-blue-royal" : "text-navy/40"
          }`}
        >
          {index + 1}.
        </span>
        <span
          className={`text-[14px] font-medium flex-1 pr-2 transition-colors duration-300 ${
            isOpen ? "text-blue-royal" : "text-navy"
          }`}
        >
          {item.question}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-royal" : "text-navy/40"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        style={{ height }}
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="px-5 pb-5 pl-12">
          <p className="text-[13px] text-gray-dark leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({
  items,
  title = "Everything You Need to Know",
  twoColumn = false,
  sidebar = false,
  sidebarSubtitle = "Still wondering about studying abroad, and how Admizz can get you there? Read these answers to our most commonly asked questions.",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (sidebar) {
    return (
      <section className="py-16 md:py-20" style={{ background: "#F0F4FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 md:gap-16">
            {/* Left Sidebar - Sticky */}
            <div className="md:sticky md:top-[100px] md:self-start">
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: "#1E6DEB" }}
              >
                FAQ&apos;S
              </p>
              <h2
                className="text-[26px] md:text-[32px] font-bold leading-tight mb-4"
                style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Got Questions? We Have Answers
              </h2>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
                {sidebarSubtitle}
              </p>
            </div>

            {/* Right Column - Accordion */}
            <div className="space-y-2">
              {items.map((item, index) => (
                <FAQSidebarItem
                  key={index}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (twoColumn) {
    const mid = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, mid);
    const rightItems = items.slice(mid);

    return (
      <section className="py-16" style={{ background: "#e8f0fe" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && (
            <h2
              className="text-2xl md:text-[36px] font-bold text-navy text-center mb-10"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {leftItems.map((item, index) => (
                <FAQAccordionItemAlt
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightItems.map((item, idx) => {
                const globalIndex = mid + idx;
                return (
                  <FAQAccordionItemAlt
                    key={globalIndex}
                    item={item}
                    isOpen={openIndex === globalIndex}
                    onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            {title}
          </h2>
        )}
        <div className="space-y-3">
          {items.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
