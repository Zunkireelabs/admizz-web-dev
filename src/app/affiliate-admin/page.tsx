"use client";

import { useEffect, useState } from "react";
import type { MockAffiliate, MockApplication, MockReferral } from "@/data/affiliate/mockData";
import { getAllAffiliates, getAllApplications, getAllReferrals } from "@/lib/affiliate/api";
import AdminLogin from "@/components/affiliate/admin/AdminLogin";
import AdminShell from "@/components/affiliate/admin/AdminShell";

const SESSION_KEY = "admizz_admin_session";

export default function AffiliateAdminPage() {
  const [authed, setAuthed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [affiliates, setAffiliates] = useState<MockAffiliate[]>([]);
  const [applications, setApplications] = useState<MockApplication[]>([]);
  const [referrals, setReferrals] = useState<MockReferral[]>([]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        handleLogin();
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  const handleLogin = async () => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
    const [affs, apps, refs] = await Promise.all([
      getAllAffiliates(),
      getAllApplications(),
      getAllReferrals(),
    ]);
    setAffiliates(affs);
    setApplications(apps);
    setReferrals(refs);
    setAuthed(true);
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setAuthed(false);
  };

  if (!hydrated) return null;
  if (!authed) return <AdminLogin onLogin={handleLogin} />;

  return (
    <AdminShell
      affiliates={affiliates}
      applications={applications}
      referrals={referrals}
      onLogout={handleLogout}
    />
  );
}
