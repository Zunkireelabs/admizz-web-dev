"use client";

import { useEffect, useRef, useState } from "react";
import type { MockAffiliate } from "@/data/affiliate/mockData";

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
  affiliate: MockAffiliate;
  rank: number;
}

export default function StatsRow({ affiliate, rank }: Props) {
  const referrals = useCountUp(affiliate.referralCount);
  const converted = useCountUp(affiliate.convertedCount);
  const earned = useCountUp(affiliate.totalEarned);
  const rankVal = useCountUp(rank);

  const stats = [
    { label: "Referred Students",  value: String(referrals),                  sub: "total sent",  highlight: false },
    { label: "Converted",          value: String(converted),                  sub: "enrolled",    highlight: false },
    { label: "Commissions Earned", value: `NPR ${earned.toLocaleString()}`,   sub: "all time",    highlight: true  },
    { label: "Leaderboard Rank",   value: rankVal > 0 ? `#${rankVal}` : "—", sub: "this month",  highlight: false },
  ];

  return (
    <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
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
