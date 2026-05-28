"use client";

import type { MockAffiliate, MockApplication, MockReferral } from "@/data/affiliate/mockData";

interface Props {
  affiliates: MockAffiliate[];
  applications: MockApplication[];
  referrals: MockReferral[];
}

export default function OverviewStats({ affiliates, applications, referrals }: Props) {
  const totalAffiliates = affiliates.filter(a => a.status === "active").length;
  const pendingApps = applications.filter(a => a.status === "pending").length;
  const totalReferrals = referrals.length;
  const commissionsOwed = referrals
    .filter(r => r.status === "converted")
    .reduce((sum, r) => sum + r.commission, 0);

  const stats = [
    { label: "Active Affiliates",    value: String(totalAffiliates),                   sub: "enrolled",       highlight: false },
    { label: "Pending Applications", value: String(pendingApps),                       sub: "awaiting review", highlight: pendingApps > 0 },
    { label: "Total Referrals",      value: String(totalReferrals),                    sub: "all time",       highlight: false },
    { label: "Commissions Owed",     value: `NPR ${commissionsOwed.toLocaleString()}`, sub: "unpaid",         highlight: true  },
  ];

  return (
    <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4 mb-7">
      {stats.map(s => (
        <div
          key={s.label}
          className="rounded-2xl px-5 py-5 flex flex-col gap-1 relative overflow-hidden"
          style={{
            background: "rgba(13,25,80,0.6)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: s.highlight ? "#FCB730" : "rgba(252,183,48,0.35)" }}
          />
          <span className="text-2xl font-extrabold text-white tracking-tight">{s.value}</span>
          <span
            className="text-[11px] font-bold uppercase tracking-widest mt-0.5"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {s.label}
          </span>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>{s.sub}</span>
        </div>
      ))}
    </div>
  );
}
