"use client";

import { useState } from "react";
import type { AffiliateReferral, ReferralStatus } from "@/lib/affiliate/types";

const STATUS_STYLE: Record<ReferralStatus, { bg: string; color: string; label: string }> = {
  pending:   { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", label: "Pending" },
  converted: { bg: "rgba(34,197,94,0.12)",  color: "#4ade80",               label: "Converted" },
  paid:      { bg: "rgba(252,183,48,0.15)", color: "#FCB730",               label: "Paid ✓" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

type FilterStatus = "all" | ReferralStatus;

interface Props {
  referrals: AffiliateReferral[];
}

export default function ReferralTable({ referrals }: Props) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered = filter === "all" ? referrals : referrals.filter(r => r.status === filter);
  const filters: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all",       label: "All",       count: referrals.length },
    { key: "pending",   label: "Pending",   count: referrals.filter(r => r.status === "pending").length },
    { key: "converted", label: "Converted", count: referrals.filter(r => r.status === "converted").length },
    { key: "paid",      label: "Paid",      count: referrals.filter(r => r.status === "paid").length },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(13,25,80,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-sm font-bold text-white">Your Referrals</p>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1 rounded-full text-xs font-bold transition-all"
              style={{
                background: filter === f.key ? "#FDED22" : "rgba(255,255,255,0.07)",
                color: filter === f.key ? "#000" : "rgba(255,255,255,0.5)",
              }}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["Student", "Date", "Destination", "Stage", "Status", "Commission"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {referrals.length === 0 ? "No referrals yet. Share your link to get started!" : "No referrals match this filter."}
                </td>
              </tr>
            )}
            {filtered.map((r, i) => {
              const ss = STATUS_STYLE[r.status];
              return (
                <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <td className="px-5 py-3 font-medium text-white whitespace-nowrap">{r.student_display}</td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.45)" }}>{formatDate(r.created_at)}</td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.6)" }}>{r.flag_emoji} {r.destination}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{r.stage}</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: ss.bg, color: ss.color }}>
                      {ss.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold whitespace-nowrap" style={{ color: r.commission > 0 ? "#FCB730" : "rgba(255,255,255,0.3)" }}>
                    {r.commission > 0 ? `NPR ${r.commission.toLocaleString()}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
