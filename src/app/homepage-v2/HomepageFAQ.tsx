"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

export default function HomepageFAQ({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20" style={{ background: "#F8F9FF" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
          {/* Left — Heading (sticky on desktop) */}
          <div className="md:sticky md:top-24 md:self-start">
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.08em] mb-3"
              style={{ color: "#1E6DEB" }}
            >
              FAQ&apos;s
            </p>
            <h2
              className="text-[30px] md:text-[36px] font-bold leading-[1.15] mb-4"
              style={{ color: "#1a1a2e" }}
            >
              Got Questions? We Have Answers
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "#5a6275" }}>
              Still wondering about studying abroad, and how Admizz can get you
              there? Read these answers to our most commonly asked questions.
            </p>
          </div>

          {/* Right — Accordion list */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden"
                style={{ background: "#E8EEFF" }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span
                    className="text-[15px] md:text-[16px] font-medium pr-4"
                    style={{ color: "#1a1a2e" }}
                  >
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    style={{ color: "#1a1a2e" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p
                      className="text-[14px] leading-relaxed"
                      style={{ color: "#5a6275" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
