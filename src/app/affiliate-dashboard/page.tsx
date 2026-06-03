"use client";

import { useEffect, useState } from "react";
import { getAffiliateByCredentials, getAffiliateReferrals, getLeaderboard, getAffiliateClicks } from "@/lib/affiliate/api";
import type { Affiliate, AffiliateReferral, LeaderboardEntry, AffiliateClick } from "@/lib/affiliate/types";
import AffiliateLogin from "@/components/affiliate/dashboard/AffiliateLogin";
import DashboardShell from "@/components/affiliate/dashboard/DashboardShell";

const SESSION_KEY = "admizz_affiliate_session";

function isValidAffiliate(value: unknown): value is Affiliate {
  if (!value || typeof value !== "object") return false;
  const a = value as Partial<Affiliate>;
  return (
    typeof a.id === "string" && a.id.length > 0 &&
    typeof a.full_name === "string" && a.full_name.length > 0 &&
    typeof a.email === "string" &&
    typeof a.referral_code === "string"
  );
}

export default function AffiliateDashboardPage() {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [clicks, setClicks] = useState<AffiliateClick[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (isValidAffiliate(saved)) {
          loadDashboard(saved);
        } else {
          // Corrupt or stale session — clear it
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    }
    setHydrated(true);
  }, []);

  const loadDashboard = async (aff: Affiliate) => {
    try {
      setAffiliate(aff);
      const [refs, lb, clk] = await Promise.all([
        getAffiliateReferrals(aff.id).catch(() => [] as AffiliateReferral[]),
        getLeaderboard().catch(() => [] as LeaderboardEntry[]),
        getAffiliateClicks(aff.referral_code, 200).catch(() => [] as AffiliateClick[]),
      ]);
      setReferrals(refs);
      setLeaderboard(lb);
      setClicks(clk);
    } catch (err) {
      console.error("[dashboard load]", err);
    }
  };

  const handleLogin = async (email: string, code: string): Promise<boolean> => {
    const aff = await getAffiliateByCredentials(email, code);
    if (!aff || !isValidAffiliate(aff)) return false;
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(aff)); } catch { /* ignore */ }
    await loadDashboard(aff);
    return true;
  };

  const handleLogout = () => {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setAffiliate(null);
    setReferrals([]);
    setLeaderboard([]);
    setClicks([]);
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
      clicks={clicks}
      onLogout={handleLogout}
    />
  );
}
