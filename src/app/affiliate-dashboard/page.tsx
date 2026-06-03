"use client";

import { useEffect, useState } from "react";
import {
  getAffiliateByCredentials,
  getAffiliateReferrals,
  getLeaderboard,
  getAffiliateClicks,
  refreshAffiliate,
} from "@/lib/affiliate/api";
import type { Affiliate, AffiliateReferral, LeaderboardEntry, AffiliateClick } from "@/lib/affiliate/types";
import AffiliateLogin from "@/components/affiliate/dashboard/AffiliateLogin";
import DashboardShell from "@/components/affiliate/dashboard/DashboardShell";

const SESSION_KEY = "admizz_affiliate_session";

// Credentials are the de-facto session under the RLS model. The cached affiliate
// object is a UI convenience; every subsequent read is validated against (email,
// referral_code) server-side via the RPCs in supabase/migrations/002_rls_and_auth.sql.
interface CachedSession {
  affiliate: Affiliate;
  email: string;
  code: string;
}

function isValidCachedSession(value: unknown): value is CachedSession {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<CachedSession>;
  if (typeof v.email !== "string" || typeof v.code !== "string") return false;
  if (!v.affiliate || typeof v.affiliate !== "object") return false;
  const a = v.affiliate as Partial<Affiliate>;
  return (
    typeof a.id === "string" && a.id.length > 0 &&
    typeof a.full_name === "string" && a.full_name.length > 0 &&
    typeof a.referral_code === "string"
  );
}

export default function AffiliateDashboardPage() {
  const [session, setSession]         = useState<CachedSession | null>(null);
  const [referrals, setReferrals]     = useState<AffiliateReferral[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [clicks, setClicks]           = useState<AffiliateClick[]>([]);
  const [hydrated, setHydrated]       = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (isValidCachedSession(saved)) {
          loadDashboard(saved);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    }
    setHydrated(true);
  }, []);

  const loadDashboard = async (s: CachedSession) => {
    try {
      setSession(s);
      const creds = { email: s.email, code: s.code };
      const [fresh, refs, lb, clk] = await Promise.all([
        refreshAffiliate(creds).catch(() => null),
        getAffiliateReferrals(creds).catch(() => [] as AffiliateReferral[]),
        getLeaderboard().catch(() => [] as LeaderboardEntry[]),
        getAffiliateClicks(creds, 200).catch(() => [] as AffiliateClick[]),
      ]);
      if (fresh) {
        const next = { ...s, affiliate: fresh };
        setSession(next);
        try { localStorage.setItem(SESSION_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      }
      setReferrals(refs);
      setLeaderboard(lb);
      setClicks(clk);
    } catch (err) {
      console.error("[dashboard load]", err);
    }
  };

  const handleLogin = async (email: string, code: string): Promise<boolean> => {
    const aff = await getAffiliateByCredentials(email, code);
    if (!aff) return false;
    const next: CachedSession = { affiliate: aff, email: email.trim().toLowerCase(), code: code.trim().toUpperCase() };
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    await loadDashboard(next);
    return true;
  };

  const handleLogout = () => {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setSession(null);
    setReferrals([]);
    setLeaderboard([]);
    setClicks([]);
  };

  if (!hydrated) return null;
  if (!session) return <AffiliateLogin onLogin={handleLogin} />;

  return (
    <DashboardShell
      affiliate={session.affiliate}
      referrals={referrals}
      leaderboard={leaderboard}
      clicks={clicks}
      onLogout={handleLogout}
    />
  );
}
