"use client";

import { useEffect, useState } from "react";
import type { MockAffiliate, MockReferral } from "@/data/affiliate/mockData";
import { getAffiliateReferrals, getLeaderboard, type LeaderboardEntry } from "@/lib/affiliate/api";
import AffiliateLogin from "@/components/affiliate/dashboard/AffiliateLogin";
import DashboardShell from "@/components/affiliate/dashboard/DashboardShell";

const SESSION_KEY = "admizz_affiliate_session";

export default function AffiliateDashboardPage() {
  const [affiliate, setAffiliate] = useState<MockAffiliate | null>(null);
  const [referrals, setReferrals] = useState<MockReferral[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as MockAffiliate;
        handleLogin(saved);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  const handleLogin = async (aff: MockAffiliate) => {
    setAffiliate(aff);
    const [refs, lb] = await Promise.all([
      getAffiliateReferrals(aff.id),
      getLeaderboard(),
    ]);
    setReferrals(refs);
    setLeaderboard(lb);
  };

  const handleLogout = () => {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setAffiliate(null);
    setReferrals([]);
    setLeaderboard([]);
  };

  if (!hydrated) return null;

  if (!affiliate) {
    return <AffiliateLogin onLogin={handleLogin} />;
  }

  return (
    <DashboardShell
      affiliate={affiliate}
      referrals={referrals}
      leaderboard={leaderboard}
      onLogout={handleLogout}
    />
  );
}
