"use client";

import type { Affiliate } from "@/lib/affiliate/types";
import { getNextTierInfo } from "@/lib/affiliate/api";

const TIER_COLORS: Record<string, { primary: string; soft: string; border: string; chip: string }> = {
  "Starter":       { primary: "#475569", soft: "rgba(148,163,184,0.1)",  border: "rgba(148,163,184,0.3)", chip: "rgba(148,163,184,0.12)" },
  "Rising Star":   { primary: "#31429C", soft: "rgba(49,66,156,0.08)",   border: "rgba(49,66,156,0.25)",  chip: "rgba(49,66,156,0.1)"   },
  "Elite Partner": { primary: "#b07400", soft: "rgba(252,183,48,0.1)",   border: "rgba(252,183,48,0.3)",  chip: "rgba(252,183,48,0.14)" },
  "Admizz Legend": { primary: "#7a6f00", soft: "rgba(253,237,34,0.1)",   border: "rgba(253,237,34,0.32)", chip: "rgba(253,237,34,0.15)" },
};

const TIER_PERKS: Record<string, string[]> = {
  "Starter":       [
    "Complete marketing toolkit on approval",
    "Official Admizz affiliate certificate",
    "Private affiliate community access",
  ],
  "Rising Star":   [
    "Priority WhatsApp & email support",
    "Featured in monthly affiliate newsletter",
  ],
  "Elite Partner": [
    "Exclusive Admizz-branded swag pack",
    "Invitations to university fairs and events",
    "Co-branded social media spotlights",
  ],
  "Admizz Legend": [
    "Monthly co-marketing campaigns with Admizz",
    "Direct access to founding team",
    "Annual Legend Award recognition",
  ],
};

const NEXT_TIER_REQUIREMENT: Record<string, number> = {
  "Starter":       5,
  "Rising Star":   15,
  "Elite Partner": 30,
  "Admizz Legend": 0,
};

interface Props {
  affiliate: Affiliate;
}

export default function TierProgressCard({ affiliate }: Props) {
  const { currentTier, nextTier, progressPercent, remaining } = getNextTierInfo(affiliate.total_referrals);
  const tier = TIER_COLORS[currentTier] ?? TIER_COLORS["Starter"];
  const nextTierColor = nextTier ? (TIER_COLORS[nextTier]?.primary ?? "#FCB730") : "#FCB730";
  const perks = TIER_PERKS[currentTier] ?? [];

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-6"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-[12px] font-bold uppercase mb-2"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            Tier Progression
          </p>
          <h3 className="text-xl font-extrabold tracking-tight" style={{ color: "#001353" }}>
            {currentTier}
          </h3>
        </div>
        <span
          className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
          style={{ background: tier.chip, color: tier.primary, border: `1px solid ${tier.border}` }}
        >
          {affiliate.total_referrals} {affiliate.total_referrals === 1 ? "referral" : "referrals"}
        </span>
      </div>

      {nextTier ? (
        <div>
          <div className="flex items-center justify-between mb-2.5 gap-2">
            <span className="text-[12.5px]" style={{ color: "#475569" }}>
              Next tier:{" "}
              <span className="font-bold" style={{ color: nextTierColor }}>
                {nextTier}
              </span>
            </span>
            <span className="text-[12.5px] font-bold whitespace-nowrap" style={{ color: "#001353" }}>
              {remaining} more required
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "#F1F2F6" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${tier.primary}, ${nextTierColor})`,
                boxShadow: `0 0 12px ${nextTierColor}40`,
              }}
            />
          </div>
          <p className="text-[12px] mt-2" style={{ color: "#64748B" }}>
            {affiliate.total_referrals} of {NEXT_TIER_REQUIREMENT[currentTier] ?? 5} referrals needed
            ({progressPercent}% complete)
          </p>
        </div>
      ) : (
        <div
          className="px-4 py-3.5 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(253,237,34,0.08)", border: "1px solid rgba(253,237,34,0.3)" }}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#b07400" }}>
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>
          <p className="text-[13px] font-bold" style={{ color: "#7a6f00" }}>
            You&apos;ve reached the highest tier — Admizz Legend.
          </p>
        </div>
      )}

      <div style={{ borderTop: "1px solid #F1F2F6", paddingTop: "20px" }}>
        <p
          className="text-[12px] font-bold uppercase mb-3"
          style={{ color: "#64748B", letterSpacing: "0.08em" }}
        >
          Current tier benefits
        </p>
        <ul className="space-y-2.5">
          {perks.map(perk => (
            <li
              key={perk}
              className="flex items-center gap-2.5 text-[13.5px]"
              style={{ color: "#475569" }}
            >
              <span
                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: tier.soft, color: tier.primary }}
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
