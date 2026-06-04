"use client";

import { Suspense, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import type { Affiliate, AffiliateApplication, AffiliateReferral, AffiliateClick, AdminLeadRow } from "@/lib/affiliate/types";
import { buildCountryBreakdown, buildActivityFeed } from "@/lib/affiliate/api";
import OverviewStats from "./OverviewStats";
import ApplicationsTab from "./ApplicationsTab";
import AffiliatesTab from "./AffiliatesTab";
import ReferralsTab from "./ReferralsTab";
import PayoutsTab from "./PayoutsTab";
import LeadsTab from "./LeadsTab";
import FunnelCard from "../dashboard/FunnelCard";
import CountryBreakdownCard from "../dashboard/CountryBreakdownCard";
import ActivityTimelineCard from "../dashboard/ActivityTimelineCard";

type Tab = "applications" | "affiliates" | "referrals" | "payouts" | "leads";

interface Props {
  affiliates: Affiliate[];
  applications: AffiliateApplication[];
  referrals: AffiliateReferral[];
  clicks: AffiliateClick[];
  leads: AdminLeadRow[];
  onLogout: () => void;
  onRefresh: () => Promise<void>;
}

const TAB_DESCRIPTIONS: Record<Tab, string> = {
  applications: "Review and approve new affiliate applications.",
  affiliates:   "Manage approved affiliates and their account status.",
  referrals:    "Track and update referral stages and statuses.",
  payouts:      "Process commission payouts to converted affiliates.",
  leads:        "Every lead captured via the website, with affiliate attribution and full journey.",
};

export default function AdminShell(props: Props) {
  return (
    <Suspense fallback={null}>
      <AdminShellInner {...props} />
    </Suspense>
  );
}

const VALID_TABS: Tab[] = ["applications", "affiliates", "referrals", "payouts", "leads"];

function AdminShellInner({ affiliates, applications, referrals, clicks, leads, onLogout, onRefresh }: Props) {
  const params = useSearchParams();
  const initialTab: Tab = (() => {
    const q = params.get("tab");
    return q && (VALID_TABS as string[]).includes(q) ? (q as Tab) : "applications";
  })();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [refreshing, setRefreshing] = useState(false);
  const pendingCount = applications.filter(a => a.status === "new").length;

  const breakdown = useMemo(() => buildCountryBreakdown(referrals), [referrals]);
  const activity  = useMemo(() => buildActivityFeed(clicks, referrals, 30), [clicks, referrals]);
  const totalConverted = useMemo(() => referrals.filter(r => r.status === "converted" || r.status === "paid").length, [referrals]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const tabs: { key: Tab; label: string; badge?: number; icon: ReactNode }[] = [
    {
      key: "applications",
      label: "Applications",
      badge: pendingCount,
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      key: "affiliates",
      label: "Affiliates",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      key: "referrals",
      label: "Referrals",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      key: "payouts",
      label: "Payouts",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: "leads",
      label: "Leads",
      badge: leads.length,
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: "#FAFAFB", minHeight: "100vh" }}>
      {/* Premium top bar */}
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
            <p className="text-[11px] mt-1" style={{ color: "#64748B" }}>Affiliate Program Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
            style={{
              color: "#475569",
              border: "1px solid #EAECF0",
              background: "#FFFFFF",
              opacity: refreshing ? 0.6 : 1,
            }}
            onMouseEnter={e => { if (!refreshing) { e.currentTarget.style.background = "#F8F9FC"; e.currentTarget.style.borderColor = "#D7DAE8"; } }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#EAECF0"; }}
          >
            <svg
              className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {refreshing ? "Refreshing…" : "Refresh data"}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Welcome */}
        <div className="mb-1">
          <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight" style={{ color: "#001353" }}>
            Program Overview
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "#475569" }}>
            Live snapshot of your affiliate program · {TAB_DESCRIPTIONS[tab]}
          </p>
        </div>

        <OverviewStats affiliates={affiliates} applications={applications} referrals={referrals} clicks={clicks} />

        <FunnelCard
          clicks={clicks.length}
          registrations={referrals.length}
          conversions={totalConverted}
        />

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
          <CountryBreakdownCard breakdown={breakdown} />
          <ActivityTimelineCard events={activity} />
        </div>

        {/* Premium tab navigation */}
        <div
          className="flex flex-wrap gap-1 p-1 rounded-2xl w-fit"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EAECF0",
            boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
          }}
        >
          {tabs.map(t => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2"
                style={{
                  background: active ? "#001353" : "transparent",
                  color: active ? "#FFFFFF" : "#475569",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#F8F9FC"; e.currentTarget.style.color = "#001353"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; } }}
              >
                {t.icon}
                {t.label}
                {t.badge != null && t.badge > 0 && (
                  <span
                    className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                    style={{
                      background: active ? "rgba(252,183,48,0.3)" : "rgba(252,183,48,0.15)",
                      color: active ? "#FDED22" : "#b07400",
                    }}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {tab === "applications" && <ApplicationsTab initialApplications={applications} onRefresh={onRefresh} />}
        {tab === "affiliates"   && <AffiliatesTab affiliates={affiliates} referrals={referrals} clicks={clicks} onRefresh={onRefresh} />}
        {tab === "referrals"    && <ReferralsTab referrals={referrals} affiliates={affiliates} onRefresh={onRefresh} />}
        {tab === "payouts"      && <PayoutsTab referrals={referrals} affiliates={affiliates} onRefresh={onRefresh} />}
        {tab === "leads"        && <LeadsTab leads={leads} onRefresh={onRefresh} />}
      </div>
    </div>
  );
}
