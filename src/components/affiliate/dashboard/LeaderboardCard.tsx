"use client";

import type { LeaderboardEntry } from "@/lib/affiliate/types";

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Starter":       { bg: "rgba(148,163,184,0.1)",  text: "#475569", border: "rgba(148,163,184,0.3)" },
  "Rising Star":   { bg: "rgba(49,66,156,0.08)",   text: "#31429C", border: "rgba(49,66,156,0.25)" },
  "Elite Partner": { bg: "rgba(252,183,48,0.1)",   text: "#b07400", border: "rgba(252,183,48,0.3)"  },
  "Admizz Legend": { bg: "rgba(253,237,34,0.12)",  text: "#7a6f00", border: "rgba(253,237,34,0.4)"  },
};

const MEDALS: Record<number, { emoji: string; bg: string; ring: string }> = {
  1: { emoji: "🥇", bg: "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)", ring: "rgba(252,183,48,0.4)" },
  2: { emoji: "🥈", bg: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)", ring: "rgba(148,163,184,0.4)" },
  3: { emoji: "🥉", bg: "linear-gradient(135deg, #FED7AA 0%, #FB923C 100%)", ring: "rgba(251,146,60,0.4)" },
};

interface Props {
  leaderboard: LeaderboardEntry[];
  currentAffiliateId: string;
}

export default function LeaderboardCard({ leaderboard, currentAffiliateId }: Props) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
      }}
    >
      <div className="px-6 py-5" style={{ borderBottom: "1px solid #F1F2F6" }}>
        <p
          className="text-[12px] font-bold uppercase mb-1"
          style={{ color: "#64748B", letterSpacing: "0.08em" }}
        >
          Affiliate Rankings
        </p>
        <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
          Top Performers
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
          Ranked by total enrolled referrals · Updated daily
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {leaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
              style={{ background: "#F1F2F6", color: "#64748B" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M9 7a3 3 0 116 0 3 3 0 01-6 0z" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: "#001353" }}>
              Rankings unavailable
            </p>
            <p className="text-xs mt-1 max-w-[220px] text-center leading-snug" style={{ color: "#64748B" }}>
              Rankings will appear once affiliates start converting referrals.
            </p>
          </div>
        ) : (
          leaderboard.map((entry, idx) => {
            const isMe = entry.affiliate_id === currentAffiliateId;
            const tier = TIER_COLORS[entry.tier] ?? TIER_COLORS["Starter"];
            const medal = MEDALS[entry.rank];
            return (
              <div
                key={entry.affiliate_id}
                className="flex items-center gap-3 px-6 py-4 transition-colors duration-150"
                style={{
                  borderTop: idx === 0 ? "none" : "1px solid #F1F2F6",
                  background: isMe ? "rgba(252,183,48,0.05)" : "transparent",
                }}
                onMouseEnter={e => { if (!isMe) e.currentTarget.style.background = "#FAFAFB"; }}
                onMouseLeave={e => { if (!isMe) e.currentTarget.style.background = "transparent"; }}
              >
                {/* Rank / Medal */}
                {medal ? (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                    style={{ background: medal.bg, boxShadow: `0 0 0 3px ${medal.ring}` }}
                  >
                    {medal.emoji}
                  </div>
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-extrabold"
                    style={{ background: "#F1F2F6", color: "#5C7189" }}
                  >
                    #{entry.rank}
                  </div>
                )}

                {/* Name + city */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: "#001353" }}>
                    {entry.name}
                    {isMe && (
                      <span
                        className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{ background: "rgba(252,183,48,0.15)", color: "#b07400", letterSpacing: "0.06em" }}
                      >
                        Your position
                      </span>
                    )}
                  </p>
                  <p className="text-[12px]" style={{ color: "#64748B" }}>
                    {entry.city || "—"}
                  </p>
                </div>

                {/* Tier + count */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className="text-[12px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: tier.bg, color: tier.text, border: `1px solid ${tier.border}` }}
                  >
                    {(entry.tier ?? "Starter").split(" ")[0]}
                  </span>
                  <span
                    className="text-[15px] font-extrabold tabular-nums tracking-tight"
                    style={{ color: "#001353" }}
                  >
                    {entry.referral_count}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
