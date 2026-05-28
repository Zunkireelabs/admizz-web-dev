"use client";

import type { LeaderboardEntry } from "@/lib/affiliate/api";

interface Props {
  leaderboard: LeaderboardEntry[];
  currentAffiliateId: string;
}

const TIER_COLORS: Record<string, string> = {
  "Starter":       "#94a3b8",
  "Rising Star":   "#31429C",
  "Elite Partner": "#FCB730",
  "Admizz Legend": "#FDED22",
};

export default function LeaderboardCard({ leaderboard, currentAffiliateId }: Props) {
  const myEntry = leaderboard.find(e => e.affiliateId === currentAffiliateId);
  const inTop5 = myEntry && myEntry.rank <= 5;

  return (
    <div
      className="rounded-[12px] px-5 py-5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
          Monthly Leaderboard
        </span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Top affiliates</span>
      </div>

      <div className="space-y-1.5">
        {leaderboard.slice(0, 5).map(entry => {
          const isMe = entry.affiliateId === currentAffiliateId;
          const tierColor = TIER_COLORS[entry.tier] ?? "#6b7280";
          return (
            <div
              key={entry.affiliateId}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{
                background: isMe ? "rgba(252,183,48,0.08)" : "rgba(255,255,255,0.03)",
                borderLeft: isMe ? "3px solid #FCB730" : "3px solid transparent",
              }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                style={{
                  background: entry.rank === 1
                    ? "rgba(253,237,34,0.2)"
                    : entry.rank === 2
                    ? "rgba(148,163,184,0.15)"
                    : entry.rank === 3
                    ? "rgba(252,183,48,0.15)"
                    : "rgba(255,255,255,0.06)",
                  color: entry.rank === 1
                    ? "#FDED22"
                    : entry.rank === 2
                    ? "#94a3b8"
                    : entry.rank === 3
                    ? "#FCB730"
                    : "rgba(255,255,255,0.3)",
                  border: entry.rank <= 3
                    ? `1px solid ${entry.rank === 1 ? "rgba(253,237,34,0.3)" : entry.rank === 2 ? "rgba(148,163,184,0.2)" : "rgba(252,183,48,0.25)"}`
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {entry.rank}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-white truncate">
                    {entry.name}
                  </p>
                  {isMe && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: "rgba(252,183,48,0.15)", color: "#FCB730" }}>you</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{entry.city}</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: tierColor + "22", color: tierColor }}>
                    {entry.tier.split(" ")[0]}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold block" style={{ color: isMe ? "#FCB730" : "rgba(255,255,255,0.7)" }}>
                  {entry.referralCount}
                </span>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>refs</span>
              </div>
            </div>
          );
        })}

        {/* Show my rank if not in top 5 */}
        {myEntry && !inTop5 && (
          <>
            <div className="py-1 text-center text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>· · ·</div>
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: "rgba(252,183,48,0.08)", borderLeft: "3px solid #FCB730" }}
            >
              <span className="w-6 text-center text-sm font-bold" style={{ color: "#FCB730" }}>{myEntry.rank}.</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold" style={{ color: "#FCB730" }}>{myEntry.name}</p>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(252,183,48,0.15)", color: "#FCB730" }}>you</span>
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{myEntry.city}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold block" style={{ color: "#FCB730" }}>{myEntry.referralCount}</span>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>refs</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
