"use client";

import type { AffiliateReferral } from "@/lib/affiliate/types";

interface Props {
  referrals: AffiliateReferral[];
}

function getLast6Months() {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleDateString("en-GB", { month: "short" }) });
  }
  return months;
}

export default function PerformanceChart({ referrals }: Props) {
  const months = getLast6Months();

  const data = months.map(m => {
    const monthRefs = referrals.filter(r => r.created_at.startsWith(m.key));
    return {
      label: m.label,
      clicks: monthRefs.length,
      conversions: monthRefs.filter(r => r.status !== "pending").length,
    };
  });

  const maxClicks = Math.max(...data.map(d => d.clicks), 1);

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(13,25,80,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-bold text-white">Referral Activity</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Last 6 months</p>
        </div>
        <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#FCB730" }} />Referrals</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#4ade80" }} />Converted</span>
        </div>
      </div>

      {referrals.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          No referral data yet. Share your link to start tracking!
        </div>
      ) : (
        <div className="flex items-end gap-3 h-32">
          {data.map(d => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex items-end gap-0.5" style={{ height: "96px" }}>
                <div
                  className="flex-1 rounded-t-md transition-all duration-500"
                  style={{
                    height: `${Math.max(4, (d.clicks / maxClicks) * 96)}px`,
                    background: "rgba(252,183,48,0.5)",
                  }}
                />
                {d.conversions > 0 && (
                  <div
                    className="flex-1 rounded-t-md transition-all duration-500"
                    style={{
                      height: `${Math.max(4, (d.conversions / maxClicks) * 96)}px`,
                      background: "rgba(74,222,128,0.6)",
                    }}
                  />
                )}
              </div>
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{d.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
