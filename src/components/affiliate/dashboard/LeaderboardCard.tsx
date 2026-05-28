"use client";

import type { LeaderboardEntry } from "@/lib/affiliate/types";

const TIER_COLORS: Record<string, string> = {
  "Starter":       "#94a3b8",
  "Rising Star":   "#31429C",
  "Elite Partner": "#FCB730",
  "Admizz Legend": "#FDED22",
};

const RANK_MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

interface Props {
  leaderboard: LeaderboardEntry[];
  currentAffiliateId: string;
}

export default function LeaderboardCard({ leaderboard, currentAffiliateId }: Props) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: "rgba(13,25,80,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-sm font-bold text-white">Top Affiliates</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Ranked by total referrals</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {leaderboard.length === 0 && (
          <p className="px-6 py-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            No affiliates yet.
          </p>
        )}
        {leaderboard.map(entry => {
          const isMe = entry.affiliate_id === currentAffiliateId;
          const tierColor = TIER_COLORS[entry.tier] ?? "#6b7280";
          const medal = RANK_MEDALS[entry.rank];
          return (
            <div
              key={entry.affiliate_id}
              className="flex items-center gap-3 px-5 py-3"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                background: isMe ? "rgba(253,237,34,0.05)" : "transparent",
              }}
            >
              <span className="w-7 text-center text-sm flex-shrink-0" style={{ color: medal ? "inherit" : "rgba(255,255,255,0.3)", fontWeight: 700 }}>
                {medal ?? `#${entry.rank}`}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: isMe ? "#FDED22" : "#fff" }}>
                  {entry.name} {isMe && <span className="text-xs font-normal opacity-60">(you)</span>}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{entry.city}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: tierColor + "20", color: tierColor }}>
                  {entry.tier.split(" ")[0]}
                </span>
                <span className="text-sm font-bold text-white">{entry.referral_count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
