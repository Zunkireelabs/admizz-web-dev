"use client";

import { useEffect, useState } from "react";
import { getAffiliateByCredentials, getAffiliateReferrals, getLeaderboard } from "@/lib/affiliate/api";
import type { Affiliate, AffiliateReferral, LeaderboardEntry } from "@/lib/affiliate/types";
import AffiliateLogin from "@/components/affiliate/dashboard/AffiliateLogin";
import DashboardShell from "@/components/affiliate/dashboard/DashboardShell";

const SESSION_KEY = "admizz_affiliate_session";

export default function AffiliateDashboardPage() {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Affiliate;
        loadDashboard(saved);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  const loadDashboard = async (aff: Affiliate) => {
    setAffiliate(aff);
    const [refs, lb] = await Promise.all([
      getAffiliateReferrals(aff.id),
      getLeaderboard(),
    ]);
    setReferrals(refs);
    setLeaderboard(lb);
  };

  const handleLogin = async (email: string, code: string): Promise<boolean> => {
    const aff = await getAffiliateByCredentials(email, code);
    if (!aff) return false;
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(aff)); } catch { /* ignore */ }
    await loadDashboard(aff);
    return true;
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
