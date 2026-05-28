"use client";

import { useState } from "react";
import type { AffiliateReferral, Affiliate } from "@/lib/affiliate/types";
import { markReferralPaid } from "@/lib/affiliate/api";

const TIER_COLORS: Record<string, string> = {
  "Starter":       "#94a3b8",
  "Rising Star":   "#31429C",
  "Elite Partner": "#FCB730",
  "Admizz Legend": "#FDED22",
};

interface Props {
  referrals: AffiliateReferral[];
  affiliates: Affiliate[];
  onRefresh: () => Promise<void>;
}

export default function PayoutsTab({ referrals, affiliates, onRefresh }: Props) {
  const [markingId, setMarkingId] = useState<string | null>(null);

  // Group converted (unpaid) referrals by affiliate
  const rows = affiliates
    .map(aff => {
      const converted = referrals.filter(r => r.affiliate_id === aff.id && r.status === "converted");
      const total = converted.reduce((s, r) => s + r.commission, 0);
      return { aff, converted, total };
    })
    .filter(e => e.total > 0)
    .sort((a, b) => b.total - a.total);

  const totalDue = rows.reduce((s, e) => s + e.total, 0);

  const handleMarkAllPaid = async (row: typeof rows[0]) => {
    setMarkingId(row.aff.id);
    for (const ref of row.converted) {
      await markReferralPaid(ref.id, row.aff.id, ref.commission);
    }
    setMarkingId(null);
    await onRefresh();
  };

  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 rounded-[12px]"
        style={{ background: "rgba(252,183,48,0.08)", border: "1px solid rgba(252,183,48,0.2)" }}
      >
        <div>
          <p className="text-sm font-bold text-white">Total Outstanding Payouts</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Converted referrals not yet marked paid</p>
        </div>
        <span className="text-2xl font-extrabold" style={{ color: "#FCB730" }}>
          NPR {totalDue.toLocaleString()}
        </span>
      </div>

      {rows.length === 0 && (
        <div className="text-center py-12 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          No outstanding payouts. All converted referrals have been paid.
        </div>
      )}

      <div className="space-y-2">
        {rows.map(({ aff, converted, total }) => {
          const isMarking = markingId === aff.id;
          const tierColor = TIER_COLORS[aff.tier] ?? "#6b7280";
          return (
            <div
              key={aff.id}
              className="rounded-[12px] px-5 py-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white">{aff.full_name}</p>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: tierColor + "22", color: tierColor }}
                    >
                      {aff.tier}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "#FCB730" }}>{aff.referral_code}</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {aff.city} · {converted.length} converted referral{converted.length !== 1 ? "s" : ""}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {converted.map(ref => (
                      <span key={ref.id} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                        {ref.flag_emoji} {ref.student_display} — NPR {ref.commission.toLocaleString()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-bold text-lg" style={{ color: "#FCB730" }}>
                    NPR {total.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleMarkAllPaid({ aff, converted, total })}
                    disabled={isMarking}
                    className="text-xs font-bold px-4 py-2 rounded-xl transition-all"
                    style={{
                      background: "rgba(34,197,94,0.15)",
                      color: "#4ade80",
                      border: "1px solid rgba(34,197,94,0.3)",
                      opacity: isMarking ? 0.6 : 1,
                    }}
                    onMouseEnter={e => { if (!isMarking) e.currentTarget.style.background = "rgba(34,197,94,0.25)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.15)"; }}
                  >
                    {isMarking ? "Marking…" : "Mark All Paid ✓"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
