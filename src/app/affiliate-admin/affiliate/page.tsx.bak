"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getAllAffiliates, getAllReferrals, getAllClicks } from "@/lib/affiliate/api";
import type { Affiliate, AffiliateReferral, AffiliateClick } from "@/lib/affiliate/types";
import AffiliateDetail from "@/components/affiliate/admin/AffiliateDetail";

export default function AffiliateDetailPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AffiliateDetailInner />
    </Suspense>
  );
}

function AffiliateDetailInner() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
  const [clicks, setClicks] = useState<AffiliateClick[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.replace("/affiliate-admin");
          return;
        }
        const { data: isAdmin } = await supabase.rpc("is_admin");
        if (!isAdmin) {
          await supabase.auth.signOut();
          router.replace("/affiliate-admin");
          return;
        }
        if (!id) {
          if (!cancelled) { setHydrated(true); setLoading(false); }
          return;
        }
        const [affs, refs, clks] = await Promise.all([
          getAllAffiliates(),
          getAllReferrals(),
          getAllClicks(2000),
        ]);
        if (cancelled) return;
        const found = affs.find(a => a.id === id) ?? null;
        setAffiliate(found);
        if (found) {
          setReferrals(refs.filter(r => r.affiliate_id === found.id));
          const code = found.referral_code.toUpperCase();
          setClicks(clks.filter(c => (c.code || "").toUpperCase() === code));
        }
        setHydrated(true);
        setLoading(false);
      } catch {
        if (!cancelled) { setHydrated(true); setLoading(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [id, router]);

  const refreshData = async () => {
    if (!id) return;
    const [affs, refs, clks] = await Promise.all([
      getAllAffiliates(),
      getAllReferrals(),
      getAllClicks(2000),
    ]);
    const found = affs.find(a => a.id === id) ?? null;
    setAffiliate(found);
    if (found) {
      setReferrals(refs.filter(r => r.affiliate_id === found.id));
      const code = found.referral_code.toUpperCase();
      setClicks(clks.filter(c => (c.code || "").toUpperCase() === code));
    }
  };

  if (!hydrated || loading) return <LoadingState />;

  return (
    <div style={{ background: "#FAFAFB", minHeight: "100vh" }}>
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
          <img
            src="/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
            alt="Admizz Education"
            className="h-7 w-auto flex-shrink-0"
          />
          <div
            className="hidden sm:flex flex-col min-w-0"
            style={{ borderLeft: "1px solid #EAECF0", paddingLeft: "16px" }}
          >
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold leading-none" style={{ color: "#001353" }}>Admin Console</p>
              <span
                className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded uppercase"
                style={{
                  background: "rgba(49,66,156,0.08)",
                  color: "#31429C",
                  border: "1px solid rgba(49,66,156,0.22)",
                  letterSpacing: "0.08em",
                }}
              >
                Internal
              </span>
            </div>
            <p className="text-[11px] mt-1" style={{ color: "#64748B" }}>Affiliate Detail</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/affiliate-admin?tab=affiliates")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
          style={{ color: "#475569", border: "1px solid #EAECF0", background: "#FFFFFF" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#F8F9FC"; e.currentTarget.style.borderColor = "#D7DAE8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#EAECF0"; }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to affiliates
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {!affiliate ? (
          <div className="rounded-2xl p-16 flex flex-col items-center justify-center text-center" style={{ background: "#FFFFFF", border: "1px solid #EAECF0" }}>
            <p className="text-sm font-semibold" style={{ color: "#001353" }}>Affiliate not found</p>
            <p className="text-xs mt-1" style={{ color: "#64748B" }}>The affiliate id is missing or no longer exists.</p>
            <button
              onClick={() => router.push("/affiliate-admin?tab=affiliates")}
              className="mt-4 text-xs font-bold px-3 py-2 rounded-lg"
              style={{ background: "#001353", color: "#FFFFFF" }}
            >
              Back to affiliates
            </button>
          </div>
        ) : (
          <AffiliateDetail
            affiliate={affiliate}
            referrals={referrals}
            clicks={clicks}
            onRefresh={refreshData}
          />
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ background: "#FAFAFB", minHeight: "100vh" }} className="flex items-center justify-center">
      <div className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Loading affiliate detail…
      </div>
    </div>
  );
}
