"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FinalCtaProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCta: { text: string; href: string };
  whatsappCta: { number: string; message: string; display: string };
  counsellorImage?: string;
}

export default function FinalCta({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  whatsappCta,
  counsellorImage = "/images/seo-pages/student-hero.webp",
}: FinalCtaProps) {
  const waHref = `https://wa.me/${whatsappCta.number}?text=${encodeURIComponent(
    whatsappCta.message
  )}`;

  return (
    <section className="relative py-20 tablet:py-28 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[28px] tablet:rounded-[36px] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #FCB730 0%, #FDED22 50%, #FCB730 100%)",
            boxShadow: "0 24px 60px rgba(252, 183, 48, 0.25)",
          }}
        >
          <div className="grid tablet:grid-cols-[1.4fr_1fr]">
            <div className="p-8 tablet:p-14 relative z-10">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-blue-dark/80">
                {eyebrow}
              </p>
              <h2
                className="mt-3 font-bold leading-[1.05]"
                style={{
                  fontFamily: "var(--font-rubik), sans-serif",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  color: "#001353",
                }}
              >
                {heading}
              </h2>
              <p className="mt-5 text-[16px] tablet:text-[17px] leading-relaxed text-blue-dark/85 max-w-[520px]">
                {subheading}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-[14px] px-7 py-4 text-[15px] font-bold text-white transition-all touch-target-min hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #001353 0%, #0D1282 100%)",
                    boxShadow: "0 12px 32px rgba(0, 19, 83, 0.35)",
                  }}
                >
                  {primaryCta.text}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 12h14m-7-7 7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[14px] px-6 py-4 text-[15px] font-semibold text-blue-dark transition-all touch-target-min hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(0,19,83,0.15)",
                  }}
                >
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.99.61 3.86 1.66 5.4L2 22l4.78-1.61a9.85 9.85 0 0 0 5.26 1.51c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01A9.86 9.86 0 0 0 12.04 2z" />
                  </svg>
                  {whatsappCta.display}
                </a>
              </div>

              <div className="mt-6 flex items-center gap-4 text-[12px] text-blue-dark/80">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No commitment
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30 minutes
                </span>
              </div>
            </div>

            <div className="relative hidden tablet:block">
              <div
                aria-hidden
                className="absolute inset-0 -left-12"
                style={{
                  background:
                    "linear-gradient(to right, rgba(252,183,48,1) 0%, rgba(252,183,48,0) 30%)",
                  zIndex: 5,
                }}
              />
              <Image
                src={counsellorImage}
                alt="Admizz counsellor"
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
