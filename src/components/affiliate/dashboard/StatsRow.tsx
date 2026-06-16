"use client";

import { useEffect, useRef, useState } from "react";
import type { Affiliate } from "@/lib/affiliate/types";

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

interface Props {
  affiliate: Affiliate;
  rank: number;
  clicks: number;
}

const ICON_STUDENTS = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const ICON_CONVERTED = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const ICON_USD = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ICON_CLICKS = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
);
const ICON_RANK = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export default function StatsRow({ affiliate, rank, clicks }: Props) {
  const clickVal  = useCountUp(clicks);
  const referrals = useCountUp(affiliate.total_referrals);
  const converted = useCountUp(affiliate.total_converted);
  const earned    = useCountUp(affiliate.total_earned);
  const rankVal   = useCountUp(rank);

  const stats = [
    {
      label:     "Link Clicks",
      value:     String(clickVal),
      sub:       "Visits to your referral link",
      icon:      ICON_CLICKS,
      iconBg:    "rgba(14,165,233,0.1)",
      iconColor: "#0EA5E9",
      featured:  false,
    },
    {
      label:     "Total Referrals",
      value:     String(referrals),
      sub:       "Students registered through your link",
      icon:      ICON_STUDENTS,
      iconBg:    "rgba(49,66,156,0.08)",
      iconColor: "#31429C",
      featured:  false,
    },
    {
      label:     "Conversions",
      value:     String(converted),
      sub:       "Progressed past consultation",
      icon:      ICON_CONVERTED,
      iconBg:    "rgba(34,197,94,0.1)",
      iconColor: "#16a34a",
      featured:  false,
    },
    // Total Earnings hidden temporarily per client request (2026-06-14)
    {
      label:     "Global Rank",
      value:     rankVal > 0 ? `#${rankVal}` : "—",
      sub:       rankVal > 0 ? "Position on leaderboard" : "Convert your first to rank",
      icon:      ICON_RANK,
      iconBg:    "rgba(148,163,184,0.12)",
      iconColor: "#475569",
      featured:  false,
    },
  ];

  return (
    <div className="grid grid-cols-2 tablet:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(s => (
        <div
          key={s.label}
          className="rounded-2xl px-5 py-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-200"
          style={{
            background: "#FFFFFF",
            border: s.featured ? "1px solid rgba(252,183,48,0.32)" : "1px solid #EAECF0",
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
