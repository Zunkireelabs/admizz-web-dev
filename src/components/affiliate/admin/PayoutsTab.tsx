"use client";

import { useState } from "react";
import type { MockReferral } from "@/data/affiliate/mockData";
import { mockAffiliates } from "@/data/affiliate/mockData";

interface Props {
  referrals: MockReferral[];
}

export default function PayoutsTab({ referrals: initialReferrals }: Props) {
  const [paidIds, setPaidIds] = useState<Set<string>>(new Set());

  const rows = mockAffiliates
    .map(aff => {
      const key = aff.id;
      const converted = initialReferrals.filter(r => r.affiliateId === aff.id && r.status === "converted");
      const total = converted.reduce((s, r) => s + r.commission, 0);
      return { key, name: aff.fullName, city: aff.city, tier: aff.tier, total, count: converted.length };
    })
    .filter(e => e.total > 0)
    .sort((a, b) => b.total - a.total);

  const totalDue = rows.filter(e => !paidIds.has(e.key)).reduce((s, e) => s + e.total, 0);
  const paidCount = paidIds.size;

  const markPaid = (key: string) => setPaidIds(prev => new Set([...prev, key]));

  const TIER_COLORS: Record<string, string> = {
    "Starter":       "#94a3b8",
    "Rising Star":   "#31429C",
    "Elite Partner": "#FCB730",
    "Admizz Legend": "#FDED22",
  };

  return (
    <div className="space-y-4">
      {/* Summary banner */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 rounded-[12px]"
        style={{ background: "rgba(252,183,48,0.08)", border: "1px solid rgba(252,183,48,0.2)" }}
      >
        <div>
          <p className="text-sm font-bold text-white">Total Due This Month</p>
          {paidCount > 0 && (
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              {paidCount} payout{paidCount !== 1 ? "s" : ""} marked paid
            </p>
          )}
        </div>
        <span className="text-2xl font-extrabold transition-all duration-500" style={{ color: "#FCB730" }}>
          NPR {totalDue.toLocaleString()}
        </span>
      </div>

      <div className="space-y-2">
        {rows.map(e => {
          const isPaid = paidIds.has(e.key);
          const tierColor = TIER_COLORS[e.tier] ?? "#6b7280";
          return (
            <div
              key={e.key}
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 rounded-[12px] transition-all duration-300"
              style={{
                background: isPaid ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isPaid ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)"}`,
                opacity: isPaid ? 0.45 : 1,
              }}
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{e.name}</p>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: tierColor + "22", color: tierColor }}
                    >
                      {e.tier.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {e.city} · {e.count} converted referral{e.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="font-bold text-lg transition-all duration-300"
                  style={{ color: isPaid ? "rgba(255,255,255,0.25)" : "#FCB730" }}
                >
                  NPR {e.total.toLocaleString()}
                </span>
                {isPaid ? (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-xl"
                    style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80" }}
                  >
                    Paid ✓
                  </span>
                ) : (
                  <button
                    onClick={() => markPaid(e.key)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                    style={{ background: "rgba(252,183,48,0.12)", color: "#FCB730", border: "1px solid rgba(252,183,48,0.25)" }}
                    onMouseEnter={ev => { ev.currentTarget.style.background = "rgba(252,183,48,0.25)"; }}
                    onMouseLeave={ev => { ev.currentTarget.style.background = "rgba(252,183,48,0.12)"; }}
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <div className="text-center py-12 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            No outstanding payouts this month.
          </div>
        )}
      </div>
    </div>
  );
}
