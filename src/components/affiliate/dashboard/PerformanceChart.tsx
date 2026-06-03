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
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-GB", { month: "short" }),
    });
  }
  return months;
}

export default function PerformanceChart({ referrals }: Props) {
  const months = getLast6Months();

  const data = months.map(m => {
    const monthRefs = referrals.filter(r => r.created_at.startsWith(m.key));
    return {
      label: m.label,
      referrals: monthRefs.length,
      conversions: monthRefs.filter(r => r.status !== "pending").length,
    };
  });

  const maxValue = Math.max(...data.map(d => Math.max(d.referrals, d.conversions)), 1);

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-7">
        <div>
          <p
            className="text-[12px] font-bold uppercase mb-1.5"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            Activity Overview
          </p>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
            Monthly Referrals & Conversions
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Past 6 months · Updated in real time
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px]" style={{ color: "#475569" }}>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#FCB730" }} />
            New referrals
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#16a34a" }} />
            Converted to enrolled
          </span>
        </div>
      </div>

      {/* Chart body */}
      {referrals.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 px-6 rounded-xl"
          style={{ background: "#FAFAFB", border: "1px dashed #EAECF0" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{ background: "rgba(252,183,48,0.1)", color: "#b07400" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#001353" }}>
            No activity to display
          </p>
          <p className="text-xs text-center max-w-xs leading-snug" style={{ color: "#64748B" }}>
            Once students start registering through your link, monthly trends will appear here.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Grid lines */}
          <div className="absolute inset-x-0 top-0" style={{ height: "140px" }}>
            {[0, 25, 50, 75, 100].map(p => (
              <div
                key={p}
                className="absolute left-0 right-0 border-t border-dashed"
                style={{ top: `${p}%`, borderColor: "#F1F2F6" }}
              />
            ))}
          </div>

          {/* Bars */}
          <div className="relative flex items-end gap-3" style={{ height: "140px" }}>
            {data.map(d => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-1" style={{ height: "140px" }}>
                  <div
                    className="flex-1 rounded-t-md transition-all duration-700 max-w-[14px]"
                    style={{
                      height: `${Math.max(3, (d.referrals / maxValue) * 100)}%`,
                      background: "linear-gradient(180deg, #FCB730 0%, #d99518 100%)",
                      boxShadow: d.referrals > 0 ? "0 2px 4px rgba(252,183,48,0.2)" : "none",
                    }}
                  />
                  <div
                    className="flex-1 rounded-t-md transition-all duration-700 max-w-[14px]"
                    style={{
                      height: `${Math.max(3, (d.conversions / maxValue) * 100)}%`,
                      background: "linear-gradient(180deg, #16a34a 0%, #15803d 100%)",
                      boxShadow: d.conversions > 0 ? "0 2px 4px rgba(34,197,94,0.18)" : "none",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex gap-3 mt-3">
            {data.map(d => (
              <div key={d.label} className="flex-1 text-center">
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "#64748B" }}
                >
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
