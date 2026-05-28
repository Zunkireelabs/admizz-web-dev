"use client";

import type { MockAffiliate } from "@/data/affiliate/mockData";
import { getNextTierInfo, getTierThresholds } from "@/lib/affiliate/api";

const TIER_COLORS: Record<string, string> = {
  "Starter":       "#94a3b8",
  "Rising Star":   "#31429C",
  "Elite Partner": "#FCB730",
  "Admizz Legend": "#FDED22",
};

interface Props {
  affiliate: MockAffiliate;
}

export default function TierProgressCard({ affiliate }: Props) {
  const info = getNextTierInfo(affiliate.referralCount);
  const thresholds = getTierThresholds();
  const color = TIER_COLORS[info.currentTier] ?? "#FCB730";
  const currentIdx = thresholds.findIndex(t => t.tier === info.currentTier);

  return (
    <div
      className="rounded-[12px] px-5 py-5 flex flex-col gap-4"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
          Your Tier
        </span>
        <span
          className="text-xs font-extrabold px-3 py-1 rounded-full"
          style={{ background: color + "22", color, border: `1px solid ${color}55` }}
        >
          {info.currentTier}
        </span>
      </div>

      {/* Tier milestone steps */}
      <div className="relative">
        <div className="flex items-center justify-between relative">
          {/* Track line */}
          <div className="absolute top-3 left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div
            className="absolute top-3 left-0 h-[2px] transition-all duration-1000"
            style={{
              width: `${(currentIdx / (thresholds.length - 1)) * 100}%`,
              background: "linear-gradient(90deg, #FCB730, #FDED22)",
            }}
          />

          {thresholds.map((t, i) => {
            const isReached = i <= currentIdx;
            const isCurrent = i === currentIdx;
            const tc = TIER_COLORS[t.tier] ?? "#6b7280";
            return (
              <div key={t.tier} className="relative flex flex-col items-center gap-1.5 z-10">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: isReached ? tc : "rgba(255,255,255,0.08)",
                    border: isCurrent ? `2px solid ${tc}` : "2px solid transparent",
                    boxShadow: isCurrent ? `0 0 10px ${tc}66` : "none",
                  }}
                >
                  {isReached && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-[9px] font-bold text-center leading-tight whitespace-nowrap"
                  style={{ color: isReached ? tc : "rgba(255,255,255,0.3)", maxWidth: 56 }}
                >
                  {t.tier.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      {info.nextTier ? (
        <div>
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>{affiliate.referralCount} referrals</span>
            <span style={{ color: TIER_COLORS[info.nextTier] ?? "#fff" }}>
              {info.remaining} more → {info.nextTier.split(" ")[0]}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${info.progressPercent}%`,
                background: "linear-gradient(90deg, #FCB730, #FDED22)",
                boxShadow: "0 0 8px rgba(252,183,48,0.5)",
              }}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm font-bold" style={{ color: "#FCB730" }}>
          Top tier — Admizz Legend
        </p>
      )}
    </div>
  );
}
