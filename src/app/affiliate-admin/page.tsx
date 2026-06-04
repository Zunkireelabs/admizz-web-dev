"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getAllAffiliates, getAllApplications, getAllReferrals, getAllClicks, getAffiliateLeads } from "@/lib/affiliate/api";
import type { Affiliate, AffiliateApplication, AffiliateReferral, AffiliateClick, AdminLeadRow } from "@/lib/affiliate/types";
import AdminLogin from "@/components/affiliate/admin/AdminLogin";
import AdminShell from "@/components/affiliate/admin/AdminShell";

export default function AffiliateAdminPage() {
  const [authed, setAuthed]           = useState(false);
  const [hydrated, setHydrated]       = useState(false);
  const [affiliates, setAffiliates]   = useState<Affiliate[]>([]);
  const [applications, setApplications] = useState<AffiliateApplication[]>([]);
  const [referrals, setReferrals]     = useState<AffiliateReferral[]>([]);
  const [clicks, setClicks]           = useState<AffiliateClick[]>([]);
  const [leads, setLeads]             = useState<AdminLeadRow[]>([]);

  // On mount: check if a Supabase Auth session exists and confirm admin role.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: isAdmin } = await supabase.rpc("is_admin");
          if (isAdmin && !cancelled) {
            await onLogin();
          } else if (!isAdmin) {
            await supabase.auth.signOut();
          }
        }
      } catch { /* ignore */ }
      if (!cancelled) setHydrated(true);
    })();

    // React to sign-out from other tabs / token expiry
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
        if (event === "SIGNED_OUT") setAuthed(false);
      }
    });

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const onLogin = async () => {
    const [affs, apps, refs, clks, lds] = await Promise.all([
      getAllAffiliates(),
      getAllApplications(),
      getAllReferrals(),
      getAllClicks(2000),
      getAffiliateLeads(500),
    ]);
    setAffiliates(affs);
    setApplications(apps);
    setReferrals(refs);
    setClicks(clks);
    setLeads(lds);
    setAuthed(true);
  };

  const onLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
    setAffiliates([]);
    setApplications([]);
    setReferrals([]);
    setClicks([]);
    setLeads([]);
  };

  const refreshData = async () => {
    const [affs, apps, refs, clks, lds] = await Promise.all([
      getAllAffiliates(),
      getAllApplications(),
      getAllReferrals(),
      getAllClicks(2000),
      getAffiliateLeads(500),
    ]);
    setAffiliates(affs);
    setApplications(apps);
    setReferrals(refs);
    setClicks(clks);
    setLeads(lds);
  };

  if (!hydrated) return null;
  if (!authed) return <AdminLogin onLogin={onLogin} />;

  return (
    <AdminShell
      affiliates={affiliates}
      applications={applications}
      referrals={referrals}
      clicks={clicks}
      leads={leads}
      onLogout={onLogout}
      onRefresh={refreshData}
    />
  );
}
