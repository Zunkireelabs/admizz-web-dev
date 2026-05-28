"use client";

import { useState } from "react";
import type { Affiliate, AffiliateApplication, AffiliateReferral } from "@/lib/affiliate/types";
import OverviewStats from "./OverviewStats";
import ApplicationsTab from "./ApplicationsTab";
import AffiliatesTab from "./AffiliatesTab";
import ReferralsTab from "./ReferralsTab";
import PayoutsTab from "./PayoutsTab";

type Tab = "applications" | "affiliates" | "referrals" | "payouts";

interface Props {
  affiliates: Affiliate[];
  applications: AffiliateApplication[];
  referrals: AffiliateReferral[];
  onLogout: () => void;
  onRefresh: () => Promise<void>;
}

export default function AdminShell({ affiliates, applications, referrals, onLogout, onRefresh }: Props) {
  const [tab, setTab] = useState<Tab>("applications");
  const pendingCount = applications.filter(a => a.status === "new").length;

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: "applications", label: "Applications", badge: pendingCount },
    { key: "affiliates",   label: "Affiliates" },
    { key: "referrals",    label: "Referrals" },
    { key: "payouts",      label: "Payouts" },
  ];

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
          <img
            src="/images/logos/Admizz-Education-New-Logo-For-Dark-Background-1.png-1-1024x331.webp"
            alt="Admizz Education"
            className="h-7 w-auto"
          />
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }}>
            <p className="text-sm font-bold text-white leading-none">Admin Panel</p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Affiliate Program Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            ↻ Refresh
          </button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <OverviewStats affiliates={affiliates} applications={applications} referrals={referrals} />

        <div
          className="flex flex-wrap gap-2 mb-7 p-1.5 rounded-2xl w-fit"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2"
              style={{
                background: tab === t.key ? "#FDED22" : "transparent",
                color: tab === t.key ? "#001353" : "rgba(255,255,255,0.5)",
              }}
            >
              {t.label}
              {t.badge != null && t.badge > 0 && (
                <span
                  className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                  style={{
                    background: tab === t.key ? "rgba(0,0,0,0.2)" : "#FDED22",
                    color: "#001353",
                  }}
                >
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "applications" && <ApplicationsTab initialApplications={applications} onRefresh={onRefresh} />}
        {tab === "affiliates"   && <AffiliatesTab affiliates={affiliates} onRefresh={onRefresh} />}
        {tab === "referrals"    && <ReferralsTab referrals={referrals} affiliates={affiliates} onRefresh={onRefresh} />}
        {tab === "payouts"      && <PayoutsTab referrals={referrals} affiliates={affiliates} onRefresh={onRefresh} />}
      </div>
    </div>
  );
}
