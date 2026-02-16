"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  twoColumn?: boolean;
}

export default function FAQ({ items, title = "Everything You Need to Know", twoColumn = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (twoColumn) {
    const mid = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, mid);
    const rightItems = items.slice(mid);

    return (
      <section className="py-16 px-4" style={{ background: "#e8f0fe" }}>
        <div className="max-w-7xl mx-auto">
          {title && (
            <h2
              className="text-2xl md:text-[36px] font-bold text-navy text-center mb-10"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {leftItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[10px] overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.6)" }}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="text-[15px] font-medium text-navy pr-4">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 text-navy transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-gray-dark leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {rightItems.map((item, idx) => {
                const globalIndex = mid + idx;
                return (
                  <div
                    key={globalIndex}
                    className="rounded-[10px] overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.6)" }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                      onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                    >
                      <span className="text-[15px] font-medium text-navy pr-4">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 text-navy transition-transform duration-300 ${
                          openIndex === globalIndex ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openIndex === globalIndex && (
                      <div className="px-5 pb-4">
                        <p className="text-sm text-gray-dark leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {title && (
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            {title}
          </h2>
        )}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-border-light rounded-[10px] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-[15px] font-medium text-navy pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-navy transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-dark leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
