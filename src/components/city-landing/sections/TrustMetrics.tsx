"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedCounter from "../components/AnimatedCounter";
import type { TrustMetric, PartnerLogo } from "@/data/cities/types";

interface TrustMetricsProps {
  eyebrow: string;
  heading: string;
  metrics: TrustMetric[];
  partnerUniLogos: PartnerLogo[];
}

export default function TrustMetrics({
  eyebrow,
  heading,
  metrics,
  partnerUniLogos,
}: TrustMetricsProps) {
  const [hero, ...rest] = metrics;
  const logoTrack = [...partnerUniLogos, ...partnerUniLogos];

  return (
    <section
      className="relative py-20 tablet:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #001353 0%, #0D1282 50%, #1B0F4F 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #FCB730 0%, transparent 70%)",
          filter: "blur(120px)",
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
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-yellow">
            {eyebrow}
          </p>
          <h2
            className="mt-3 text-white font-bold"
            style={{
              fontFamily: "var(--font-rubik), sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            {heading}
          </h2>
        </motion.div>

        {/* Asymmetric: hero stat + stacked trio */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-12 grid tablet:grid-cols-[1.15fr_1fr] gap-5 tablet:gap-6"
        >
          {hero && <HeroMetric metric={hero} />}

          <div className="grid gap-4 tablet:gap-5">
            {rest.map((m, idx) => (
              <CompactMetric key={m.label} metric={m} iconIndex={idx} />
            ))}
          </div>
        </motion.div>

        {partnerUniLogos.length > 0 && (
          <div className="mt-16">
            <p className="text-center text-[12px] uppercase tracking-[0.18em] text-white/60 mb-6">
              Partner universities
            </p>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <div className="flex animate-scroll-carousel gap-8 w-max">
                {logoTrack.map((logo, idx) => (
                  <div
                    key={`${logo.name}-${idx}`}
                    className="relative w-[160px] h-[80px] rounded-[12px] flex items-center justify-center bg-white/95 px-4 flex-shrink-0"
                  >
                    <Image
                      src={logo.logo}
                      alt={logo.name}
                      fill
                      sizes="160px"
                      className="object-contain p-3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HeroMetric({ metric }: { metric: TrustMetric }) {
  const pct =
    typeof metric.numericValue === "number" ? metric.numericValue : 100;
  const radius = 78;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="relative rounded-[24px] p-6 tablet:p-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(252,183,48,0.1) 0%, rgba(255,255,255,0.04) 65%)",
        border: "1px solid rgba(252,183,48,0.22)",
        backdropFilter: "blur(20px)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, #FCB730 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative flex flex-col tablet:flex-row items-center tablet:items-center gap-6 tablet:gap-8 h-full">
        {/* Progress ring */}
        <div className="flex-shrink-0">
          <svg width="200" height="200" viewBox="-100 -100 200 200">
            <defs>
              <linearGradient
                id="hero-ring-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FDED22" />
                <stop offset="100%" stopColor="#FCB730" />
              </linearGradient>
            </defs>
            <circle
              r={radius}
              cx={0}
              cy={0}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="10"
            />
            <motion.circle
              r={radius}
              cx={0}
              cy={0}
              fill="none"
              stroke="url(#hero-ring-grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{
                strokeDashoffset: circumference * (1 - pct / 100),
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              transform="rotate(-90)"
            />
            <text
              x={0}
              y={-2}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              style={{
                fontSize: "44px",
                fontWeight: 700,
                fontFamily: "var(--font-rubik), sans-serif",
              }}
            >
              {pct}%
            </text>
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 text-center tablet:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow">
            Headline metric
          </p>
          <h3
            className="mt-2 text-white text-[20px] tablet:text-[24px] font-bold leading-tight"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {metric.label}
          </h3>
          {metric.sublabel && (
            <p className="mt-2 text-white/65 text-[13px]">
              {metric.sublabel}
            </p>
          )}
          <p
            className="mt-4 text-white/80 text-[13px] leading-relaxed pl-3 italic"
            style={{ borderLeft: "2px solid rgba(252,183,48,0.5)" }}
          >
            Verified across every Birgunj application since 2018.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const COMPACT_ICONS = [
  // 1) Graduation cap — students placed
  <svg
    key="cap"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l6.16-3.422a12.08 12.08 0 01.665 6.479A11.95 11.95 0 0012 20.055a11.95 11.95 0 00-6.824-2.998 12.08 12.08 0 01.665-6.479L12 14z"
    />
  </svg>,
  // 2) Building — partner universities
  <svg
    key="building"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>,
  // 3) Medal — scholarships unlocked
  <svg
    key="medal"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15a4 4 0 100-8 4 4 0 000 8z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.5 14.5l-2.5 7 2.5-1 1.5 2.5 2.5-7M15.5 14.5l2.5 7-2.5-1-1.5 2.5-2.5-7"
    />
  </svg>,
];

function CompactMetric({
  metric,
  iconIndex,
}: {
  metric: TrustMetric;
  iconIndex: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="rounded-[18px] p-5 flex items-center gap-4"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-[12px] flex items-center justify-center text-yellow"
        style={{
          background:
            "linear-gradient(135deg, rgba(252,183,48,0.18) 0%, rgba(253,237,34,0.1) 100%)",
          border: "1px solid rgba(252,183,48,0.3)",
        }}
      >
        {COMPACT_ICONS[iconIndex] ?? COMPACT_ICONS[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="font-bold leading-none"
          style={{
            fontFamily: "var(--font-rubik), sans-serif",
            fontSize: "clamp(24px, 2.6vw, 30px)",
            background:
              "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {typeof metric.numericValue === "number" ? (
            <AnimatedCounter
              to={metric.numericValue}
              prefix={metric.prefix}
              suffix={metric.suffix}
            />
          ) : (
            metric.value
          )}
        </div>
        <p className="mt-1 text-white text-[13.5px] font-semibold leading-tight">
          {metric.label}
        </p>
        {metric.sublabel && (
          <p className="text-white/55 text-[11.5px] mt-0.5">
            {metric.sublabel}
          </p>
        )}
      </div>
    </motion.div>
  );
}
