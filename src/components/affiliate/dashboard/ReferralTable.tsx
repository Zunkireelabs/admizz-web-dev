"use client";

import { useState } from "react";
import type { MockReferral, ReferralStatus, CommissionStage } from "@/data/affiliate/mockData";

const STATUS_STYLE: Record<ReferralStatus, { bg: string; color: string; label: string }> = {
  pending:   { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", label: "Pending" },
  converted: { bg: "rgba(34,197,94,0.12)",  color: "#4ade80",               label: "Converted" },
  paid:      { bg: "rgba(252,183,48,0.15)", color: "#FCB730",               label: "Paid ✓" },
};

const STAGE_STYLE: Record<CommissionStage, { bg: string; color: string }> = {
  "Consultation":         { bg: "rgba(49,66,156,0.15)",  color: "#7b8fd4" },
  "Enrolled":             { bg: "rgba(49,66,156,0.25)",  color: "#a5b4fc" },
  "University Confirmed": { bg: "rgba(252,183,48,0.12)", color: "#FCB730" },
  "Visa Approved":        { bg: "rgba(253,237,34,0.12)", color: "#FDED22" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

type FilterStatus = "all" | ReferralStatus;

interface Props {
  referrals: MockReferral[];
}

export default function ReferralTable({ referrals }: Props) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered = filter === "all" ? referrals : referrals.filter(r => r.status === filter);
  const totalEarned = filtered.filter(r => r.commission > 0).reduce((s, r) => s + r.commission, 0);

  const filters: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all",       label: "All",       count: referrals.length },
    { key: "pending",   label: "Pending",   count: referrals.filter(r => r.status === "pending").length },
    { key: "converted", label: "Converted", count: referrals.filter(r => r.status === "converted").length },
    { key: "paid",      label: "Paid",      count: referrals.filter(r => r.status === "paid").length },
  ];

  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
          Referral History
        </span>
        <div className="flex items-center gap-2">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1 rounded-full text-xs font-bold transition-all"
              style={{
                background: filter === f.key ? "#FDED22" : "rgba(255,255,255,0.07)",
                color: filter === f.key ? "#000" : "rgba(255,255,255,0.55)",
              }}
            >
              {f.label} {f.count > 0 && <span className="opacity-70">({f.count})</span>}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          {filter === "all" ? "No referrals yet. Share your link to get started!" : `No ${filter} referrals.`}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Student", "Date", "Destination", "Stage", "Status", "Commission"].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const ss = STATUS_STYLE[r.status];
                  const stage = STAGE_STYLE[r.stage];
                  return (
                    <tr
                      key={r.id}
                      style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                    >
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{r.studentDisplay}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.5)" }}>{formatDate(r.date)}</td>
                      <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {r.flagEmoji} {r.destination}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
                          style={{ background: stage.bg, color: stage.color }}
                        >
                          {r.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                          style={{ background: ss.bg, color: ss.color }}
                        >
                          {ss.label}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 font-semibold whitespace-nowrap"
                        style={{ color: r.commission > 0 ? "#FCB730" : "rgba(255,255,255,0.3)" }}
                      >
                        {r.commission > 0 ? `NPR ${r.commission.toLocaleString()}` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalEarned > 0 && (
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(252,183,48,0.04)" }}
            >
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
                {filter === "all" ? "Total earned (shown)" : `Total — ${filter}`}
              </span>
              <span className="text-sm font-extrabold" style={{ color: "#FCB730" }}>
                NPR {totalEarned.toLocaleString()}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
