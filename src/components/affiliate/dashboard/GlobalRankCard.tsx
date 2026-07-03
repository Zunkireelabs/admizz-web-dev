"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  rank: number;
  totalAffiliates?: number;
}

function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current || target === 0) { setValue(target); return; }
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

export default function GlobalRankCard({ rank, totalAffiliates }: Props) {
  const rankVal = useCountUp(rank);
  const hasRank = rankVal > 0;
  const percentile =
    hasRank && totalAffiliates && totalAffiliates > 0
      ? Math.max(1, Math.round((rankVal / totalAffiliates) * 100))
      : null;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col h-full relative overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.05)",
      }}
    >
      <div className="flex items-start justify-between mb-1">
        <span
          className="text-[12px] font-bold uppercase"
          style={{ color: "#64748B", letterSpacing: "0.08em" }}
        >
          Global Rank
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(148,163,184,0.12)", color: "#475569" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
      </div>

      <p className="text-[11px]" style={{ color: "#64748B" }}>
        {hasRank ? "Position on leaderboard" : "Convert your first to rank"}
      </p>

      <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
        <div
          className="text-[64px] md:text-[72px] font-extrabold leading-none tracking-tight"
          style={{ color: "#001353" }}
        >
          {hasRank ? `#${rankVal}` : "—"}
        </div>
        {percentile !== null && (
          <div
            className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase"
            style={{
              background: "rgba(252,183,48,0.1)",
              border: "1px solid rgba(252,183,48,0.3)",
              color: "#B8770F",
              letterSpacing: "0.06em",
            }}
          >
            Top {percentile}%
          </div>
        )}
        {hasRank && totalAffiliates && totalAffiliates > 0 && (
          <p className="text-[11px] mt-2.5" style={{ color: "#94A3B8" }}>
            of {totalAffiliates} affiliates
          </p>
        )}
      </div>
    </div>
  );
}
