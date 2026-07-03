"use client";

import { useEffect, useMemo, useState } from "react";
import type { Affiliate, AffiliateReferral, AffiliateClick, LeaderboardEntry } from "@/lib/affiliate/types";
import { buildCountryBreakdown, buildActivityFeed } from "@/lib/affiliate/api";
import FunnelCard from "./FunnelCard";
import GlobalRankCard from "./GlobalRankCard";
import CountryBreakdownCard from "./CountryBreakdownCard";
import ActivityTimelineCard from "./ActivityTimelineCard";
import TierProgressCard from "./TierProgressCard";
import ReferralLinkBox from "./ReferralLinkBox";
import PerformanceChart from "./PerformanceChart";
import ReferralTable from "./ReferralTable";
import ResourcesQuickAccess from "./ResourcesQuickAccess";
import ProfileEditModal from "./ProfileEditModal";

function getTimeBasedGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatToday(): string {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Starter":       { bg: "rgba(148,163,184,0.1)",  text: "#475569", border: "rgba(148,163,184,0.3)" },
  "Rising Star":   { bg: "rgba(49,66,156,0.08)",   text: "#31429C", border: "rgba(49,66,156,0.25)" },
  "Elite Partner": { bg: "rgba(252,183,48,0.1)",   text: "#b07400", border: "rgba(252,183,48,0.3)"  },
  "Admizz Legend": { bg: "rgba(253,237,34,0.12)",  text: "#7a6f00", border: "rgba(253,237,34,0.4)"  },
};

interface Props {
  affiliate: Affiliate;
  referrals: AffiliateReferral[];
  leaderboard: LeaderboardEntry[];
  clicks: AffiliateClick[];
  onLogout: () => void;
  affiliateCode: string;
}

export default function DashboardShell({ affiliate, referrals, leaderboard, clicks, onLogout, affiliateCode }: Props) {
  const [localAffiliate, setLocalAffiliate] = useState<Affiliate>(affiliate);
  const [profileOpen, setProfileOpen] = useState(false);

  const firstName = (localAffiliate.full_name ?? "Affiliate").split(" ")[0];
  const tier = TIER_COLORS[localAffiliate.tier] ?? TIER_COLORS["Starter"];
  const myRank = leaderboard.find(e => e.affiliate_id === localAffiliate.id)?.rank ?? 0;

  const breakdown = useMemo(() => buildCountryBreakdown(referrals), [referrals]);
  const activity  = useMemo(() => buildActivityFeed(clicks, referrals, 30), [clicks, referrals]);
  const clickCount = clicks.length;

  // Time-aware greeting + date (client-only to avoid SSR mismatch)
  const [greeting, setGreeting] = useState("Hello");
  const [today, setToday] = useState("");
  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
    setToday(formatToday());
  }, []);

  return (
    <div style={{ background: "#FAFAFB", minHeight: "100vh" }}>
      {/* Premium white top bar */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderBottom: "1px solid #EAECF0",
          backdropFilter: "blur(20px)",
          height: "64px",
          boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
        }}
      >
        <div className="flex items-center gap-4 min-w-0">
          <a href="/affiliate" className="flex-shrink-0">
            <img
              src="/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
              alt="Admizz Education"
              className="h-7 w-auto"
            />
          </a>
          <div
            className="hidden sm:flex items-center gap-3 min-w-0"
            style={{ borderLeft: "1px solid #EAECF0", paddingLeft: "16px" }}
          >
            <div className="min-w-0">
              <p className="text-sm font-bold leading-none truncate" style={{ color: "#001353" }}>{firstName}</p>
              <p className="text-[11px] mt-1" style={{ color: "#64748B" }}>Affiliate Dashboard</p>
            </div>
            <span
              className="text-[11px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap"
              style={{ background: tier.bg, color: tier.text, border: `1px solid ${tier.border}` }}
            >
              {affiliate.tier}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setProfileOpen(true)}
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5"
            style={{ color: "#475569", border: "1px solid #EAECF0", background: "#FFFFFF" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F8F9FC"; e.currentTarget.style.color = "#001353"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#475569"; }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="hidden sm:inline">Edit profile</span>
          </button>
          <button
            onClick={onLogout}
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
            style={{ color: "#475569", border: "1px solid #EAECF0", background: "#FFFFFF" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F8F9FC"; e.currentTarget.style.color = "#001353"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#475569"; }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Welcome */}
        <div className="mb-2">
          <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight" style={{ color: "#001353" }}>
            {greeting}, {firstName}
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "#475569" }}>
            {today ? `${today} · ` : ""}Here&apos;s your affiliate performance summary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2.33fr_1fr] gap-5">
          <FunnelCard
            clicks={clickCount}
            registrations={localAffiliate.total_referrals}
            conversions={localAffiliate.total_converted}
          />
          <GlobalRankCard rank={myRank} totalAffiliates={leaderboard.length} />
        </div>

        <ReferralTable referrals={referrals} />

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
          <TierProgressCard affiliate={localAffiliate} />
          <ReferralLinkBox affiliate={localAffiliate} />
        </div>

        <PerformanceChart referrals={referrals} />

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
          <CountryBreakdownCard breakdown={breakdown} />
          <ActivityTimelineCard events={activity} />
        </div>

        <ResourcesQuickAccess />
      </div>

      {profileOpen && (
        <ProfileEditModal
          affiliate={localAffiliate}
          onClose={() => setProfileOpen(false)}
          onSaved={(updated) => setLocalAffiliate(prev => ({ ...prev, ...updated }))}
        />
      )}
    </div>
  );
}
