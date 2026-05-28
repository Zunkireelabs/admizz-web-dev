"use client";

import { motion } from "framer-motion";
import SectionIcon from "../components/SectionIcon";
import type {
  ComparisonBand,
  WhyChoosePoint,
} from "@/data/cities/types";

interface WhyChooseLocalProps {
  city: string;
  eyebrow: string;
  heading: string;
  subheading?: string;
  points: WhyChoosePoint[];
  comparison?: ComparisonBand;
}

export default function WhyChooseLocal({
  eyebrow,
  heading,
  subheading,
  points,
  comparison,
}: WhyChooseLocalProps) {
  return (
    <section className="relative py-14 tablet:py-20 overflow-hidden bg-white">
      {/* Soft top gradient blend (continues hero) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,18,130,0.04), transparent)",
        }}
      />

      {/* Subtle dot pattern background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(13, 18, 130, 0.6) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          opacity: 0.06,
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {subheading && (
            <p className="mt-4 text-[15px] tablet:text-[16px] leading-relaxed text-gray-dark">
              {subheading}
            </p>
          )}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-14 grid gap-5 sm:grid-cols-2 tablet:grid-cols-4"
        >
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-[20px] p-6 tablet:p-7 transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(13, 18, 130, 0.08)",
                boxShadow: "0 8px 28px rgba(13, 18, 130, 0.06)",
              }}
            >
              {/* Top accent line on hover */}
              <span
                aria-hidden
                className="absolute top-0 left-6 right-6 h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, #FCB730 0%, #0D1282 100%)",
                }}
              />

              <div
                className="w-14 h-14 rounded-[16px] flex items-center justify-center text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #FCB730 0%, #0D1282 100%)",
                  boxShadow: "0 8px 22px rgba(13, 18, 130, 0.22)",
                }}
              >
                <SectionIcon iconKey={p.iconKey} className="w-7 h-7" />
              </div>

              <h3
                className="mt-5 text-[17px] font-bold text-navy leading-tight"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                {p.title}
              </h3>

              {p.proofPoint && (
                <span
                  className="mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-tight"
                  style={{
                    background: "rgba(252, 183, 48, 0.18)",
                    color: "#7C5710",
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {p.proofPoint}
                </span>
              )}

              <p className="mt-3 text-[14px] leading-relaxed text-gray-dark">
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison band */}
        {comparison && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mt-16 tablet:mt-20 rounded-[24px] overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)",
              border: "1px solid rgba(13, 18, 130, 0.08)",
              boxShadow: "0 16px 48px rgba(13, 18, 130, 0.08)",
            }}
          >
            <div className="p-6 sm:p-8 tablet:p-10">
              <div className="text-center max-w-xl mx-auto">
                <h3
                  className="font-bold text-navy"
                  style={{
                    fontFamily: "var(--font-rubik), sans-serif",
                    fontSize: "clamp(22px, 3vw, 30px)",
                    lineHeight: 1.15,
                  }}
                >
                  {comparison.title}
                </h3>
                {comparison.subtitle && (
                  <p className="mt-2 text-[14px] text-gray-dark">
                    {comparison.subtitle}
                  </p>
                )}
              </div>

              {/* Header row */}
              <div className="mt-8 grid grid-cols-2 gap-2 tablet:gap-6">
                <div
                  className="rounded-[12px] px-4 py-2.5 text-center text-[12px] tablet:text-[13px] font-bold uppercase tracking-[0.1em]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(252,183,48,0.16) 0%, rgba(13,18,130,0.08) 100%)",
                    color: "#0D1282",
                  }}
                >
                  ✓ {comparison.usLabel}
                </div>
                <div
                  className="rounded-[12px] px-4 py-2.5 text-center text-[12px] tablet:text-[13px] font-bold uppercase tracking-[0.1em] text-gray-medium"
                  style={{ background: "rgba(118, 118, 118, 0.06)" }}
                >
                  {comparison.themLabel}
                </div>
              </div>

              {/* Rows */}
              <div className="mt-2">
                {comparison.rows.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-2 tablet:gap-6 items-stretch"
                  >
                    <div
                      className="flex items-start gap-2 py-3.5 tablet:py-4 px-3 tablet:px-4 text-[13px] tablet:text-[14px] text-navy leading-snug"
                      style={{
                        borderTop:
                          i === 0 ? "none" : "1px solid rgba(13,18,130,0.07)",
                      }}
                    >
                      <span
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(34, 197, 94, 0.12)" }}
                      >
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="font-medium">{row.us}</span>
                    </div>
                    <div
                      className="flex items-start gap-2 py-3.5 tablet:py-4 px-3 tablet:px-4 text-[13px] tablet:text-[14px] text-gray-medium leading-snug"
                      style={{
                        borderTop:
                          i === 0
                            ? "none"
                            : "1px solid rgba(118,118,118,0.12)",
                      }}
                    >
                      <span
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(118, 118, 118, 0.08)" }}
                      >
                        <svg
                          className="w-3 h-3 text-gray-medium"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                      <span>{row.them}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
