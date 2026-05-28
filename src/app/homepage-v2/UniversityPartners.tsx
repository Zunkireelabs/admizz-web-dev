"use client";

export interface University {
  name: string;
  logo: string;
}

interface Props {
  universities: University[];
}

// Calibrate speed: ~10.9s per card (matching USA's 11 cards at 120s)
const SECONDS_PER_CARD = 120 / Math.ceil(22 / 2);
const MIN_CARDS_PER_SET = 8;

function fillRow(row: { name: string; logo: string }[]) {
  if (row.length === 0) return [];
  const repeats = Math.ceil(MIN_CARDS_PER_SET / row.length);
  const set: typeof row = [];
  for (let r = 0; r < repeats; r++) set.push(...row);
  return [...set, ...set];
}

export default function UniversityPartners({ universities }: Props) {
  const mid = Math.ceil(universities.length / 2);
  const row1 = universities.slice(0, mid);
  const row2 = universities.slice(mid);
  const filled1 = fillRow(row1);
  const filled2 = fillRow(row2);
  const row1Duration = Math.max((filled1.length / 2) * SECONDS_PER_CARD, 20);
  const row2Duration = Math.max((filled2.length / 2) * SECONDS_PER_CARD, 20);

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: "#F8F9FF" }}>
      <div className="max-w-7xl mx-auto px-4 mb-14">
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
        <div className="flex items-center justify-center gap-6 md:gap-10">
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

      {/* Row 1 — scrolls left */}
      <div className="marquee-row relative overflow-hidden mb-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #F8F9FF, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #F8F9FF, transparent)" }} />

        <div className="marquee-track flex w-max gap-5" style={{ animation: `marquee-left ${row1Duration}s linear infinite` }}>
          {filled1.map((uni, i) => (
            <div
              key={`r1-${i}`}
              className="uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6]"
              style={{
                width: 200,
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
                  loading={i < mid ? "eager" : "lazy"}
                  style={{ maxHeight: 48, objectFit: "contain" }}
                />
              </div>
              <p
                className="text-[11px] font-medium text-center leading-snug tracking-wide"
                style={{ color: "#6b7280" }}
              >
                {uni.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="marquee-row relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #F8F9FF, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #F8F9FF, transparent)" }} />

        <div className="marquee-track flex w-max gap-5" style={{ animation: `marquee-right ${row2Duration}s linear infinite` }}>
          {filled2.map((uni, i) => (
            <div
              key={`r2-${i}`}
              className="uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6]"
              style={{
                width: 200,
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
                className="text-[11px] font-medium text-center leading-snug tracking-wide"
                style={{ color: "#6b7280" }}
              >
                {uni.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
