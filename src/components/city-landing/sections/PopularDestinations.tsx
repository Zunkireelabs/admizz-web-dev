"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import type { DestinationCard, DestinationsHighlightStat } from "@/data/cities/types";

interface PopularDestinationsProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: DestinationCard[];
  highlightStats?: DestinationsHighlightStat[];
  compareCta?: { text: string; href: string };
}

export default function PopularDestinations({
  eyebrow,
  heading,
  subheading,
  items,
  highlightStats,
  compareCta,
}: PopularDestinationsProps) {
  const featured = items.find((i) => i.featured);
  const rest = items.filter((i) => !i.featured);

  return (
    <section className="relative py-14 tablet:py-20 overflow-hidden" style={{ background: "#F8F9FF" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col tablet:flex-row tablet:items-end tablet:justify-between gap-4 mb-8"
        >
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#1E6DEB" }}>
              {eyebrow}
            </p>
            <h2
              className="mt-3 text-navy font-bold"
              style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1 }}
            >
              {heading}
            </h2>
            <p className="mt-3 text-[15px] text-gray-dark leading-relaxed">{subheading}</p>
          </div>

          {/* Stats strip */}
          {highlightStats && highlightStats.length > 0 && (
            <div className="flex items-center gap-6 flex-shrink-0">
              {highlightStats.map((s, i) => (
                <div key={s.label} className={`text-center ${i > 0 ? "pl-6 border-l border-[rgba(13,18,130,0.1)]" : ""}`}>
                  <p
                    className="font-bold leading-none"
                    style={{
                      fontFamily: "var(--font-rubik), sans-serif",
                      fontSize: "clamp(24px, 3vw, 32px)",
                      background: "linear-gradient(135deg, #FCB730 0%, #0D1282 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-gray-dark font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Hero card — full width */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="mb-5"
          >
            <Link
              href={featured.href}
              className="group relative flex flex-col tablet:flex-row rounded-[24px] overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 16px 56px rgba(13,18,130,0.12)", border: "1px solid rgba(13,18,130,0.06)" }}
            >
              {/* Left: photo */}
              <div className="relative w-full tablet:w-[52%] aspect-[16/9] tablet:aspect-auto tablet:min-h-[380px] overflow-hidden flex-shrink-0">
                <Image
                  src={featured.image}
                  alt={featured.country}
                  fill
                  sizes="(max-width: 921px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.08) 100%)" }}
                />
                {/* Flag chip */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold bg-white/95 backdrop-blur-md text-navy shadow-lg">
                  <span className="text-lg leading-none">{featured.flagEmoji}</span>
                  {featured.country}
                </div>
                {/* Most popular badge */}
                <div
                  className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ background: "linear-gradient(135deg, rgba(252,183,48,0.95) 0%, rgba(253,237,34,0.95) 100%)", color: "#001353" }}
                >
                  ★ Most popular from Birgunj
                </div>
              </div>

              {/* Right: content */}
              <div className="flex flex-col justify-center p-7 tablet:p-10 flex-1">
                <h3
                  className="font-bold text-navy leading-[1.05]"
                  style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)" }}
                >
                  {featured.country}
                </h3>

                {/* Key stats row */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-bold leading-none text-blue-dark" style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "clamp(26px, 3vw, 34px)" }}>
                      {featured.studentsPlaced.split(" ")[0]}
                    </p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] text-gray-medium font-semibold">From Birgunj</p>
                  </div>
                  <div>
                    <p className="font-bold leading-none text-[#FCB730]" style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "clamp(26px, 3vw, 34px)" }}>
                      95%
                    </p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] text-gray-medium font-semibold">Visa success</p>
                  </div>
                  {featured.avgVisaTime && (
                    <div>
                      <p className="font-bold leading-none text-navy" style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "clamp(22px, 2.5vw, 28px)" }}>
                        {featured.avgVisaTime}
                      </p>
                      <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] text-gray-medium font-semibold">To visa</p>
                    </div>
                  )}
                </div>

                {/* Chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.scholarship && (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold" style={{ background: "rgba(252,183,48,0.15)", color: "#7C5710" }}>
                      🏆 {featured.scholarship}
                    </span>
                  )}
                  {featured.intakes && (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium text-gray-dark" style={{ background: "rgba(13,18,130,0.06)" }}>
                      📅 {featured.intakes}
                    </span>
                  )}
                </div>

                {/* Top programs */}
                {featured.topPrograms && featured.topPrograms.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[10.5px] uppercase tracking-[0.12em] text-gray-medium font-bold mb-3">Top programs</p>
                    <ul className="space-y-2">
                      {featured.topPrograms.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-[13.5px] text-navy">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.14)" }}>
                            <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8">
                  <span
                    className="inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-[14px] font-bold text-black transition-all group-hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)", boxShadow: "0 8px 24px rgba(252,183,48,0.3)" }}
                  >
                    Explore {featured.country}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Marquee strip — drag/touch scrollable + auto-scroll, pauses on hover */}
        <MarqueeStrip cards={rest} />

        {/* Compare CTA */}
        {compareCta && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              href={compareCta.href}
              className="group inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-[14px] font-semibold text-navy transition-all hover:-translate-y-0.5"
              style={{ background: "white", border: "1px solid rgba(13,18,130,0.15)", boxShadow: "0 8px 24px rgba(13,18,130,0.06)" }}
            >
              {compareCta.text}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function SupportingCard({ card }: { card: DestinationCard }) {
  return (
    <div>
      <Link
        href={card.href}
        className="group flex flex-col rounded-[20px] overflow-hidden bg-white h-full transition-all duration-300 hover:-translate-y-1"
        style={{ boxShadow: "0 8px 32px rgba(13,18,130,0.08)", border: "1px solid rgba(13,18,130,0.06)" }}
      >
        {/* Photo */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={card.image}
            alt={card.country}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,19,83,0.65) 100%)" }} />
          {/* Accent strip on hover */}
          <span
            aria-hidden
            className="absolute top-0 left-0 right-0 h-[3px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: card.accentColor ?? "#0D1282" }}
          />
          {/* Flag chip */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold bg-white/95 backdrop-blur-md text-navy">
            <span className="text-base leading-none">{card.flagEmoji}</span>
            {card.country}
          </div>
          {/* Students placed — bottom of image */}
          <div className="absolute bottom-3 left-4">
            <p className="font-bold text-white leading-none" style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "22px" }}>
              {card.studentsPlaced.split(" ")[0]}
            </p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-white/75 font-semibold mt-0.5">Students placed</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2">
            {card.avgVisaTime && (
              <span className="text-[12px] text-gray-dark">
                Visa in <span className="font-bold text-navy">{card.avgVisaTime}</span>
              </span>
            )}
          </div>

          <div className="mt-auto pt-4" style={{ borderTop: "1px dashed rgba(13,18,130,0.1)", marginTop: "12px" }}>
            <p className="text-[10px] uppercase tracking-[0.12em] text-gray-medium font-bold">Top university</p>
            <p className="text-[13.5px] font-semibold text-navy mt-1 leading-tight">{card.topUniversity}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] font-bold text-blue-dark">Explore programs</span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1"
              style={{ background: "rgba(13,18,130,0.08)" }}
            >
              <svg className="w-3.5 h-3.5 text-blue-dark" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function MarqueeStrip({ cards }: { cards: DestinationCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);

  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (el && !isPaused.current && !isDragging.current) {
      el.scrollLeft += 0.8;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  return (
    <div
      className="relative mt-5 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-scroll cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; isDragging.current = false; }}
        onMouseDown={(e) => {
          isDragging.current = true;
          dragStartX.current = e.pageX;
          dragScrollStart.current = scrollRef.current?.scrollLeft ?? 0;
        }}
        onMouseMove={(e) => {
          if (!isDragging.current || !scrollRef.current) return;
          e.preventDefault();
          scrollRef.current.scrollLeft = dragScrollStart.current - (e.pageX - dragStartX.current);
        }}
        onMouseUp={() => { isDragging.current = false; }}
        onTouchStart={(e) => {
          dragStartX.current = e.touches[0].pageX;
          dragScrollStart.current = scrollRef.current?.scrollLeft ?? 0;
          isPaused.current = true;
        }}
        onTouchMove={(e) => {
          if (!scrollRef.current) return;
          scrollRef.current.scrollLeft = dragScrollStart.current - (e.touches[0].pageX - dragStartX.current);
        }}
        onTouchEnd={() => { isPaused.current = false; }}
      >
        {[...cards, ...cards].map((card, i) => (
          <div key={`${card.country}-${i}`} className="w-[300px] flex-shrink-0">
            <SupportingCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}
