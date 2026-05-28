"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CRMFormEmbed from "@/components/ui/CRMFormEmbed";
import RotatingWord from "../components/RotatingWord";
import ActivityTicker from "../components/ActivityTicker";
import CityLandmarkSvg from "../components/CityLandmarkSvg";
import type { CityHeroData, InlineTrustBadge } from "@/data/cities/types";

interface CityHeroProps {
  city: string;
  data: CityHeroData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TRUST_ICONS: Record<string, React.ReactNode> = {
  star: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  graduate: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-5 9 5-9 5-9-5zm0 0v6m18-6v6M7 13v4a5 5 0 0010 0v-4" />
    </svg>
  ),
  shieldCheck: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 4.5-3.5 8.4-8 9-4.5-.6-8-4.5-8-9V6l8-3zm-3 9l2 2 4-4" />
    </svg>
  ),
  certified: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m-9 4a8 8 0 1116 0 8 8 0 01-16 0z" />
    </svg>
  ),
};

export default function CityHero({ city, data }: CityHeroProps) {
  const headingParts = data.highlightedWord
    ? data.heading.split(data.highlightedWord)
    : null;

  const usesRotator =
    !!data.destinationRotator && data.destinationRotator.length > 0;

  return (
    <section
      id="hero-form"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #001353 0%, #0D1282 50%, #1B0F4F 100%)",
      }}
    >
      {/* Background landmark photo — Birgunj (and any future city with a photo) */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.backgroundImage}
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden
          />
          {/* Left-heavy overlay: text stays readable, right side lets the photo glow through */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,19,83,0.90) 0%, rgba(13,18,130,0.78) 30%, rgba(13,18,130,0.42) 58%, rgba(27,15,79,0.30) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background: "linear-gradient(to top, rgba(0,19,83,0.85), transparent)",
            }}
          />
        </div>
      )}

      {/* Hyperlocal landmark silhouette — only shown when no real photo */}
      {data.landmarkKey && !data.backgroundImage && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] flex justify-center text-white"
          style={{ opacity: 0.08 }}
        >
          <CityLandmarkSvg
            landmarkKey={data.landmarkKey}
            className="h-full w-auto max-w-[1100px]"
          />
        </div>
      )}

      {/* Decorative blurred orbs (slow float) */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 25, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 -left-40 w-[460px] h-[460px] rounded-full"
        style={{
          background: "radial-gradient(circle, #FCB730 0%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.5,
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, -25, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          filter: "blur(160px)",
          opacity: 0.4,
        }}
      />

      {/* Grid noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 tablet:py-8">
        <div className="grid tablet:grid-cols-[3fr_2fr] gap-12 tablet:gap-16 items-center">
          {/* ─────────────  Left: storytelling stack  ───────────── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >

            {/* Eyebrow */}
            {data.eyebrow && (
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] text-white/90"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {data.eyebrow}
                </span>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 text-white font-bold leading-[1.04] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontSize: "clamp(36px, 5.4vw, 64px)",
              }}
            >
              {usesRotator && data.destinationRotator ? (
                <>
                  {city}&apos;s gateway to{" "}
                  <RotatingWord
                    words={data.destinationRotator}
                    intervalMs={2500}
                    className="font-bold"
                  />
                </>
              ) : headingParts ? (
                <>
                  {headingParts[0]}
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg, #FDED22 0%, #FCB730 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {data.highlightedWord}
                  </span>
                  {headingParts[1]}
                </>
              ) : (
                data.heading
              )}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-5 text-[16px] tablet:text-[17px] leading-relaxed text-white/80 max-w-[560px]"
            >
              {data.subheading}
            </motion.p>

            {/* Inline trust badges row */}
            {data.inlineTrustBadges && data.inlineTrustBadges.length > 0 && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
              >
                {data.inlineTrustBadges.map((b) => (
                  <TrustBadgeChip key={`${b.value}-${b.label}`} badge={b} />
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <a
                href={data.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-[12px] px-7 py-3.5 text-[15px] font-semibold text-black transition-all touch-target-min hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)",
                  boxShadow: "0 12px 30px rgba(252, 183, 48, 0.4)",
                }}
              >
                {data.primaryCta.text}
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
              {data.secondaryCta && (
                <a
                  href={data.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-semibold text-white transition-all touch-target-min hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.99.61 3.86 1.66 5.4L2 22l4.78-1.61a9.85 9.85 0 0 0 5.26 1.51c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01A9.86 9.86 0 0 0 12.04 2zm5.07 13.4c-.22.61-1.27 1.18-1.74 1.21-.45.03-.93.04-1.5-.18-.34-.13-.78-.27-1.34-.5-2.36-1-3.91-3.34-4.03-3.5-.12-.16-.97-1.27-.97-2.43 0-1.16.61-1.73.83-1.97.22-.24.49-.3.65-.3.16 0 .32 0 .47.01.15 0 .35-.06.55.41.21.49.71 1.65.78 1.77.06.12.1.27.02.43-.07.16-.11.27-.22.41-.11.14-.23.31-.33.42-.11.11-.23.23-.1.45.13.22.6.97 1.28 1.59.88.78 1.61 1.02 1.84 1.13.23.11.36.1.49-.06.13-.16.56-.66.71-.88.15-.22.31-.18.52-.11.21.07 1.36.65 1.58.77.22.11.37.16.43.25.06.09.06.55-.16 1.16z" />
                  </svg>
                  {data.secondaryCta.text}
                </a>
              )}
            </motion.div>

            {/* Activity ticker — rotating live notifications */}
            {data.activityFeed && data.activityFeed.length > 0 && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-7"
              >
                <ActivityTicker entries={data.activityFeed} />
              </motion.div>
            )}
          </motion.div>

          {/* ─────────────  Right: clean form card  ───────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div
              className="rounded-[24px] overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #F0ECF9, #FFFFFF)",
                border: "1px solid #D4955A",
                boxShadow:
                  "0 24px 60px rgba(0, 0, 0, 0.25), 0 8px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="px-5 pt-3 pb-1 text-center">
                <h3
                  className="text-[14px] font-bold"
                  style={{
                    color: "#001353",
                    fontFamily: "var(--font-rubik), sans-serif",
                  }}
                >
                  Talk to a counsellor today
                </h3>
              </div>

              <div className="pb-3">
                <CRMFormEmbed height={540} mobileHeight={400} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustBadgeChip({ badge }: { badge: InlineTrustBadge }) {
  const icon = TRUST_ICONS[badge.iconKey] ?? TRUST_ICONS.star;
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-blue-dark"
        style={{
          background:
            "linear-gradient(135deg, rgba(253,237,34,0.85) 0%, rgba(252,183,48,0.85) 100%)",
        }}
      >
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[14px] font-bold text-white">
          {badge.value}
        </span>
        <span className="block text-[11px] text-white/60 -mt-0.5">
          {badge.label}
        </span>
      </span>
    </div>
  );
}
