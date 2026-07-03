"use client";

import { useEffect, useRef, useState } from "react";
import type { Affiliate, AffiliateApplication, AffiliateReferral } from "@/lib/affiliate/types";

function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current || target === 0) { setValue(target); return; }
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

const ICON_AFFILIATES = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const ICON_PENDING = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ICON_USD = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface Props {
  affiliates: Affiliate[];
  applications: AffiliateApplication[];
  referrals: AffiliateReferral[];
}

export default function OverviewStats({ affiliates, applications, referrals }: Props) {
  const totalAffiliates = affiliates.filter(a => a.status === "active").length;
  const pendingApps     = applications.filter(a => a.status === "new").length;
  const commissionsOwed = referrals.filter(r => r.status === "converted").reduce((sum, r) => sum + r.commission, 0);
  const totalPaidOut    = referrals.filter(r => r.status === "paid").reduce((sum, r) => sum + r.commission, 0);

  const cAffiliates = useCountUp(totalAffiliates);
  const cPending    = useCountUp(pendingApps);
  const cOwed       = useCountUp(commissionsOwed);
  const cPaid       = useCountUp(totalPaidOut);

  const stats = [
    {
      label:     "Active Affiliates",
      value:     String(cAffiliates),
      sub:       "Enrolled and active",
      icon:      ICON_AFFILIATES,
      iconBg:    "rgba(49,66,156,0.08)",
      iconColor: "#31429C",
      featured:  false,
    },
    {
      label:     "Pending Applications",
      value:     String(cPending),
      sub:       pendingApps > 0 ? "Awaiting your review" : "All caught up",
      icon:      ICON_PENDING,
      iconBg:    pendingApps > 0 ? "rgba(252,183,48,0.12)" : "rgba(34,197,94,0.1)",
      iconColor: pendingApps > 0 ? "#b07400" : "#16a34a",
      featured:  pendingApps > 0,
    },
    {
      label:     "Commissions Owed",
      value:     `USD ${cOwed.toLocaleString()}`,
      sub:       totalPaidOut > 0 ? `USD ${cPaid.toLocaleString()} paid out lifetime` : "No payouts yet",
      icon:      ICON_USD,
      iconBg:    "rgba(252,183,48,0.12)",
      iconColor: "#b07400",
      featured:  commissionsOwed > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(s => (
        <div
          key={s.label}
          className="rounded-2xl px-5 py-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-200"
          style={{
            background: "#FFFFFF",
            border: s.featured ? "1px solid rgba(252,183,48,0.3)" : "1px solid #EAECF0",
            boxShadow: s.featured
              ? "0 4px 20px rgba(252,183,48,0.1), 0 1px 3px rgba(16,24,40,0.04)"
              : "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.05)",
          }}
        >
          {s.featured && (
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, #FCB730, #FDED22, #FCB730)" }}
            />
          )}

          <div className="flex items-start justify-between">
            <span
              className="text-[12px] font-bold uppercase"
              style={{ color: "#64748B", letterSpacing: "0.08em" }}
            >
              {s.label}
            </span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: s.iconBg, color: s.iconColor }}
            >
              {s.icon}
            </div>
          </div>

          <div>
            <div
              className="text-[26px] md:text-[28px] font-extrabold leading-none tracking-tight"
              style={{ color: "#001353" }}
            >
              {s.value}
            </div>
            <div className="text-[11px] mt-1.5" style={{ color: "#64748B" }}>
              {s.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
