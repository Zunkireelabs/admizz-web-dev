"use client";

import type { Affiliate, AffiliateReferral, LeaderboardEntry } from "@/lib/affiliate/types";
import StatsRow from "./StatsRow";
import TierProgressCard from "./TierProgressCard";
import ReferralLinkBox from "./ReferralLinkBox";
import PerformanceChart from "./PerformanceChart";
import ReferralTable from "./ReferralTable";
import LeaderboardCard from "./LeaderboardCard";
import ResourcesQuickAccess from "./ResourcesQuickAccess";

const TIER_COLORS: Record<string, string> = {
  "Starter":       "#94a3b8",
  "Rising Star":   "#31429C",
  "Elite Partner": "#FCB730",
  "Admizz Legend": "#FDED22",
};

interface Props {
  affiliate: Affiliate;
  referrals: AffiliateReferral[];
  leaderboard: LeaderboardEntry[];
  onLogout: () => void;
}

export default function DashboardShell({ affiliate, referrals, leaderboard, onLogout }: Props) {
  const firstName = affiliate.full_name.split(" ")[0];
  const tierColor = TIER_COLORS[affiliate.tier] ?? "#FCB730";
  const myRank = leaderboard.find(e => e.affiliate_id === affiliate.id)?.rank ?? 0;

  return (
    <div style={{ background: "#020818", minHeight: "100vh" }}>
      <div
        className="sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between"
        style={{
          background: "rgba(0,8,30,0.97)",
          borderBottom: "1px solid rgba(252,183,48,0.2)",
          backdropFilter: "blur(16px)",
          height: "60px",
        }}
      >
        <div className="flex items-center gap-4">
          <a href="/affiliate-program">
            <img
              src="/images/logos/Admizz-Education-New-Logo-For-Dark-Background-1.png-1-1024x331.webp"
              alt="Admizz Education"
              className="h-7 w-auto"
            />
          </a>
          <div className="hidden sm:flex items-center gap-2" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }}>
            <div>
              <p className="text-sm font-bold text-white leading-none">{firstName}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Affiliate Dashboard</p>
            </div>
            <span
              className="text-[11px] font-extrabold px-2.5 py-1 rounded-full"
              style={{ background: tierColor + "18", color: tierColor, border: `1px solid ${tierColor}40` }}
            >
              {affiliate.tier}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/affiliate-program"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            ← Program page
          </a>
          <button
            onClick={onLogout}
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <StatsRow affiliate={affiliate} rank={myRank} />

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
          <TierProgressCard affiliate={affiliate} />
          <ReferralLinkBox affiliate={affiliate} />
        </div>

        <PerformanceChart referrals={referrals} />
        <ReferralTable referrals={referrals} />

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
          <LeaderboardCard leaderboard={leaderboard} currentAffiliateId={affiliate.id} />
          <ResourcesQuickAccess />
        </div>
      </div>
    </div>
  );
}
