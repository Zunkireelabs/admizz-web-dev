"use client";

import { useState } from "react";

export interface University {
  name: string;
  logo: string;
  country: string;
}

interface Props {
  universities: University[];
}

function toEmoji(code: string) {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397)).join("");
}

const countryTabs = [
  { label: "All", key: "All", flag: "" },
  { label: "USA", key: "USA", flag: "us" },
  { label: "UK", key: "UK", flag: "gb" },
  { label: "Australia", key: "Australia", flag: "au" },
  { label: "Canada", key: "Canada", flag: "ca" },
  { label: "India", key: "India", flag: "in" },
  { label: "New Zealand", key: "New Zealand", flag: "nz" },
  { label: "Finland", key: "Finland", flag: "fi" },
  { label: "Germany", key: "Germany", flag: "de" },
  { label: "France", key: "France", flag: "fr" },
];

function UniCard({ uni }: { uni: University }) {
  return (
    <div
      className="uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[200px]"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div className="w-full flex items-center justify-center" style={{ height: 52 }}>
        <img
          src={uni.logo}
          alt={uni.name}
          width={140}
          height={48}
          decoding="async"
          loading="lazy"
          style={{ maxHeight: 48, objectFit: "contain" }}
        />
      </div>
      <p
        className="text-[13px] font-medium text-center leading-snug tracking-wide"
        style={{ color: "#6b7280" }}
      >
        {uni.name}
      </p>
    </div>
  );
}

// USA has 22 universities — calibrate speed so all countries match USA's visual pace
// USA row1 has ceil(22/2)=11 cards at 120s → ~10.9s per card
const SECONDS_PER_CARD = 120 / Math.ceil(22 / 2);
// Card width (200px) + gap (20px) = 220px; need enough to fill ~1400px viewport
const MIN_CARDS_PER_SET = 8;

function fillRow(row: University[]): University[] {
  if (row.length === 0) return [];
  const repeats = Math.ceil(MIN_CARDS_PER_SET / row.length);
  const set: University[] = [];
  for (let r = 0; r < repeats; r++) set.push(...row);
  // Duplicate the full set for seamless loop (translateX(-50%))
  return [...set, ...set];
}

function MarqueeRows({ universities: unis, keyPrefix }: { universities: University[]; keyPrefix: string }) {
  // Use single row for small sets (≤8 universities) to avoid sparse repetition
  const useSingleRow = unis.length <= 8;

  const row1 = useSingleRow ? unis : unis.slice(0, Math.ceil(unis.length / 2));
  const row2 = useSingleRow ? [] : unis.slice(Math.ceil(unis.length / 2));

  const filled1 = fillRow(row1);
  const filled2 = fillRow(row2);

  // Duration scales with the number of cards in one set (half of filled array)
  const set1Count = filled1.length / 2;
  const set2Count = filled2.length / 2;
  const row1Duration = Math.max(set1Count * SECONDS_PER_CARD, 20);
  const row2Duration = Math.max(set2Count * SECONDS_PER_CARD, 20);

  return (
    <>
      {/* Row 1 — scrolls left */}
      <div className="marquee-row relative overflow-hidden mb-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #F8F9FF, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #F8F9FF, transparent)" }} />
        <div className="marquee-track flex w-max gap-5" style={{ animation: `marquee-left ${row1Duration}s linear infinite` }}>
          {filled1.map((uni, i) => (
            <UniCard key={`${keyPrefix}-r1-${i}`} uni={uni} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (only for larger sets) */}
      {row2.length > 0 && (
        <div className="marquee-row relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #F8F9FF, transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #F8F9FF, transparent)" }} />
          <div className="marquee-track flex w-max gap-5" style={{ animation: `marquee-right ${row2Duration}s linear infinite` }}>
            {filled2.map((uni, i) => (
              <UniCard key={`${keyPrefix}-r2-${i}`} uni={uni} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function UniversityPartners({ universities }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? universities
    : universities.filter((u) => u.country === activeFilter);

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: "#F8F9FF" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Header */}
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
          style={{ color: "#1E6DEB" }}
        >
          Trusted Partners
        </p>
        <h2
          className="text-[28px] md:text-[38px] font-bold text-center mb-5 leading-tight"
          style={{ color: "#0D1282" }}
        >
          Trusted by 100+ Universities, Colleges
          <br className="hidden md:block" />
          &amp; Schools Worldwide
        </h2>
        <p
          className="text-center text-[15px] max-w-2xl mx-auto mb-8"
          style={{ color: "#5a6275", lineHeight: 1.7 }}
        >
          We partner with leading institutions worldwide to provide our students
          with the best opportunities.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 mb-10">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#EBF2FF" }}
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="#1E6DEB" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold" style={{ color: "#3d4663" }}>
              100+ Institutions
            </span>
          </div>
          <div className="w-px h-5" style={{ background: "#d0d5dd" }} />
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#EBF2FF" }}
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="#1E6DEB" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold" style={{ color: "#3d4663" }}>
              Verified Partners
            </span>
          </div>
        </div>

        {/* Country Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {countryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                activeFilter === tab.key
                  ? "text-white shadow-md"
                  : "bg-white text-[#3d4663] border border-[#e2e6ed] hover:border-[#1E6DEB] hover:text-[#1E6DEB]"
              }`}
              style={activeFilter === tab.key ? { background: "#1E6DEB" } : undefined}
            >
              {tab.flag && (
                <span className="text-base leading-none shrink-0">{toEmoji(tab.flag)}</span>
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Marquee animation styles */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused;
        }
        .uni-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .uni-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(30, 109, 235, 0.12) !important;
        }
      `}</style>

      {(activeFilter === "All" ? universities.length > 0 : filtered.length > 0) ? (
        <MarqueeRows universities={activeFilter === "All" ? universities : filtered} keyPrefix={activeFilter} />
      ) : (
        /* Coming soon message */
        <div className="max-w-md mx-auto px-4 text-center py-10">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{ background: "#EBF2FF" }}
          >
            <svg className="w-8 h-8" fill="none" stroke="#1E6DEB" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
            </svg>
          </div>
          <h3
            className="text-[18px] font-bold mb-2"
            style={{ color: "#0D1282" }}
          >
            Partner Universities Coming Soon
          </h3>
          <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
            We&apos;re expanding our network in {activeFilter}. Check back soon for partner institutions.
          </p>
        </div>
      )}
    </section>
  );
}
