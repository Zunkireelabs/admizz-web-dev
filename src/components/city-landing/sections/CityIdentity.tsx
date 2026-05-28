"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import type { CityIdentityData } from "@/data/cities/types";

interface CityIdentityProps {
  city: string;
  data: CityIdentityData;
}

export default function CityIdentity({ data }: CityIdentityProps) {
  const slides = [
    { src: data.landmarkImage, alt: data.landmarkImageAlt },
    ...(data.accentPhotos ?? []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  // Split heading — last sentence gets yellow gradient
  const headingParts = data.heading.split(". ");
  const headingMain = headingParts.slice(0, -1).join(". ") + ".";
  const headingAccent = headingParts[headingParts.length - 1];

  return (
    <section ref={sectionRef} className="bg-white py-14 tablet:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#FDED22]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "#0D1282" }}>
            {data.eyebrow}
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#FDED22]" />
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid tablet:grid-cols-[48%_52%] rounded-[24px] overflow-hidden"
          style={{ boxShadow: "0 24px 80px rgba(0,19,83,0.18)" }}
        >

          {/* ── LEFT: Photo slideshow ── */}
          <div
            className="relative min-h-[300px] tablet:min-h-[540px] overflow-hidden bg-[#001353]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Ken Burns + crossfade */}
            <AnimatePresence mode="sync">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1.06 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.9, ease: "easeInOut" }, scale: { duration: 4, ease: "linear" } }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[activeIndex].src}
                  alt={slides[activeIndex].alt}
                  fill
                  sizes="(max-width: 921px) 100vw, 50vw"
                  className="object-cover"
                  priority={activeIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom gradient — fades into navy panel */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 45%, rgba(0,19,83,0.55) 100%)",
              }}
            />
            {/* Right edge — blends into navy panel on desktop */}
            <div
              className="absolute inset-y-0 right-0 w-20 pointer-events-none hidden tablet:block"
              style={{ background: "linear-gradient(to right, transparent, #001353)" }}
            />

            {/* City pin label — bottom left */}
            <div className="absolute bottom-5 left-5 z-10">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold text-white"
                style={{
                  background: "rgba(0,19,83,0.65)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#FDED22" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {data.landmarkLabel}
              </span>
            </div>

            {/* Slide dots — bottom right */}
            {slides.length > 1 && (
              <div className="absolute bottom-5 right-5 z-10 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Photo ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? "20px" : "6px",
                      height: "6px",
                      background: i === activeIndex ? "#FDED22" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Navy content panel ── */}
          <div
            className="relative flex flex-col justify-center px-8 py-12 tablet:px-10 tablet:py-14 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #001353 0%, #0D1282 60%, #0a0e5c 100%)",
            }}
          >
            {/* Decorative orb */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(252,183,48,0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            {/* Dot grid noise */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
                backgroundSize: "28px 28px",
                opacity: 0.03,
              }}
            />

            <div className="relative z-10">
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-bold leading-[1.08]"
                style={{
                  fontFamily: "var(--font-rubik), sans-serif",
                  fontSize: "clamp(24px, 2.8vw, 38px)",
                }}
              >
                <span className="text-white">{headingMain} </span>
                <span
                  style={{
                    background: "linear-gradient(90deg, #FDED22 0%, #FCB730 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {headingAccent}
                </span>
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-4 text-[14px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {data.subheading}
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
                className="mt-6 h-px origin-left"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />

              {/* 2×2 Stat grid */}
              <motion.div
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {data.facts.map((fact, idx) => (
                  <motion.div
                    key={fact.statLabel ?? fact.text}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.45 }}
                    className="group rounded-[14px] px-4 py-4 transition-all duration-300 cursor-default hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(252,183,48,0.18)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(253,237,34,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    {fact.numericValue !== undefined || fact.statValue ? (
                      <>
                        <p
                          className="font-bold leading-none"
                          style={{
                            fontFamily: "var(--font-rubik), sans-serif",
                            fontSize: "clamp(26px, 2.8vw, 34px)",
                            background: "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {fact.numericValue !== undefined ? (
                            <AnimatedCounter
                              to={fact.numericValue}
                              suffix={fact.statSuffix ?? ""}
                              duration={1800}
                            />
                          ) : (
                            <span>{fact.statValue ?? ""}</span>
                          )}
                        </p>
                        <p className="mt-1.5 text-[11.5px] font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {fact.statLabel ?? fact.text}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ background: "rgba(253,237,34,0.13)" }}>
                          {idx === 0 && (
                            /* Shield — Ministry licence */
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" stroke="#FDED22" strokeWidth="1.8" strokeLinejoin="round" />
                              <path d="M9 12l2 2 4-4" stroke="#FDED22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {idx === 1 && (
                            /* Certificate scroll — TITI certified */
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <rect x="3" y="4" width="18" height="14" rx="2" stroke="#FDED22" strokeWidth="1.8" />
                              <path d="M7 9h10M7 12h6" stroke="#FDED22" strokeWidth="1.8" strokeLinecap="round" />
                              <circle cx="16" cy="15" r="2.5" stroke="#FDED22" strokeWidth="1.5" />
                              <path d="M14.8 17l-.8 3 2-1 2 1-.8-3" stroke="#FDED22" strokeWidth="1.3" strokeLinejoin="round" />
                            </svg>
                          )}
                          {idx === 2 && (
                            /* Trophy — 10 years excellence */
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M8 21h8M12 17v4" stroke="#FDED22" strokeWidth="1.8" strokeLinecap="round" />
                              <path d="M5 4h14v7a7 7 0 01-14 0V4z" stroke="#FDED22" strokeWidth="1.8" strokeLinejoin="round" />
                              <path d="M5 6H3a2 2 0 000 4h2M19 6h2a2 2 0 010 4h-2" stroke="#FDED22" strokeWidth="1.8" strokeLinecap="round" />
                              <path d="M10 10l1.5 1.5L14 8" stroke="#FDED22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <p className="text-[12.5px] font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.88)" }}>
                          {fact.text}
                        </p>
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
                className="mt-6 h-px origin-left"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.95 }}
                className="mt-6"
              >
                <a
                  href={data.cta.href}
                  className="group inline-flex items-center gap-2.5 rounded-[12px] px-7 py-3.5 text-[15px] font-bold text-black transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)",
                    boxShadow: "0 10px 28px rgba(252,183,48,0.30)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 40px rgba(252,183,48,0.50)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 28px rgba(252,183,48,0.30)";
                  }}
                >
                  {data.cta.text}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </a>

                {/* Trust line */}
                <p className="mt-3 text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                  🔒 No spam &nbsp;·&nbsp; ⏱ 30 min &nbsp;·&nbsp; ✓ Free consultation
                </p>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
