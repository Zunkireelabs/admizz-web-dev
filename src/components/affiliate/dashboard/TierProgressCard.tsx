"use client";

import type { Affiliate } from "@/lib/affiliate/types";
import { getNextTierInfo } from "@/lib/affiliate/api";

const TIER_COLORS: Record<string, string> = {
  "Starter":       "#94a3b8",
  "Rising Star":   "#31429C",
  "Elite Partner": "#FCB730",
  "Admizz Legend": "#FDED22",
};

const TIER_PERKS: Record<string, string[]> = {
  "Starter":       ["Base commission", "Affiliate kit", "Certificate", "Community access"],
  "Rising Star":   ["Higher commission", "Priority support", "Newsletter feature"],
  "Elite Partner": ["Premium commission", "Branded swag", "University fair invites", "Social co-features"],
  "Admizz Legend": ["Top-tier commission", "Monthly co-marketing", "Direct leadership access", "Annual recognition"],
};

interface Props {
  affiliate: Affiliate;
}

export default function TierProgressCard({ affiliate }: Props) {
  const { currentTier, nextTier, progressPercent, remaining } = getNextTierInfo(affiliate.total_referrals);
  const color = TIER_COLORS[currentTier] ?? "#FCB730";
  const perks = TIER_PERKS[currentTier] ?? [];

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "rgba(13,25,80,0.6)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Your Tier
          </p>
          <p className="text-xl font-extrabold" style={{ color }}>{currentTier}</p>
        </div>
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: color + "18", color, border: `1px solid ${color}40` }}
        >
          {affiliate.total_referrals} referral{affiliate.total_referrals !== 1 ? "s" : ""}
        </span>
      </div>

      {nextTier ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Progress to <span style={{ color: TIER_COLORS[nextTier] ?? "#fff" }}>{nextTier}</span>
            </span>
            <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>
              {remaining} more to go
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%`, background: `linear-gradient(90deg, ${color}, ${TIER_COLORS[nextTier] ?? color})` }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            {progressPercent}% of the way there
          </p>
        </div>
      ) : (
        <p className="text-sm font-semibold" style={{ color: "#FDED22" }}>
          🏆 You&apos;ve reached the highest tier!
        </p>
      )}

      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          Your perks
        </p>
        <ul className="space-y-1.5">
          {perks.map(perk => (
            <li key={perk} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span style={{ color }}>✓</span> {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
