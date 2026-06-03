"use client";

import { useState } from "react";
import type { AffiliateReferral, ReferralStatus } from "@/lib/affiliate/types";

const STATUS_STYLE: Record<ReferralStatus, { bg: string; color: string; border: string; label: string; dot: string }> = {
  pending:   { bg: "rgba(148,163,184,0.1)",  color: "#475569", border: "rgba(148,163,184,0.3)", label: "Pending verification", dot: "#64748B" },
  converted: { bg: "rgba(34,197,94,0.1)",    color: "#15803d", border: "rgba(34,197,94,0.25)",  label: "Converted",            dot: "#16a34a" },
  paid:      { bg: "rgba(252,183,48,0.1)",   color: "#b07400", border: "rgba(252,183,48,0.3)",  label: "Paid out",             dot: "#FCB730" },
};

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHr = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek === 1) return "1 week ago";
  if (diffWeek < 4) return `${diffWeek} weeks ago`;
  if (diffMonth === 1) return "1 month ago";
  if (diffMonth < 12) return `${diffMonth} months ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

type FilterStatus = "all" | ReferralStatus;

interface Props {
  referrals: AffiliateReferral[];
}

export default function ReferralTable({ referrals }: Props) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered = filter === "all" ? referrals : referrals.filter(r => r.status === filter);
  const filters: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all",       label: "All Activity",     count: referrals.length },
    { key: "pending",   label: "Awaiting",         count: referrals.filter(r => r.status === "pending").length },
    { key: "converted", label: "Converted",        count: referrals.filter(r => r.status === "converted").length },
    { key: "paid",      label: "Paid Out",         count: referrals.filter(r => r.status === "paid").length },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex flex-wrap items-center justify-between gap-3"
        style={{ borderBottom: "1px solid #F1F2F6" }}
      >
        <div>
          <p
            className="text-[12px] font-bold uppercase mb-1"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            Referral Activity
          </p>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
            Your Referred Students
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Track student progress from consultation to enrollment
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
              style={{
                background: filter === f.key ? "#001353" : "#FFFFFF",
                color: filter === f.key ? "#FFFFFF" : "#475569",
                border: filter === f.key ? "1px solid #001353" : "1px solid #EAECF0",
              }}
              onMouseEnter={e => {
                if (filter !== f.key) {
                  e.currentTarget.style.background = "#F8F9FC";
                  e.currentTarget.style.borderColor = "#D7DAE8";
                }
              }}
              onMouseLeave={e => {
                if (filter !== f.key) {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.borderColor = "#EAECF0";
                }
              }}
            >
              {f.label} <span style={{ opacity: 0.6 }}>({f.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table or empty state */}
      <div className="overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
              style={{ background: "#F1F2F6", color: "#64748B" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: "#001353" }}>
              {referrals.length === 0 ? "Your referrals will appear here" : "No matches for this filter"}
            </p>
            <p className="text-xs text-center max-w-sm leading-snug" style={{ color: "#64748B" }}>
              {referrals.length === 0
                ? "When a student registers using your link, they'll appear here with their current progress status."
                : "Try selecting a different status filter above."}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#FAFAFB" }}>
                {["Student", "Referred", "Destination", "Stage", "Status", "Earnings"].map(h => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[12px] font-bold uppercase whitespace-nowrap"
                    style={{ color: "#64748B", letterSpacing: "0.08em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const ss = STATUS_STYLE[r.status];
                return (
                  <tr
                    key={r.id}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid #F1F2F6",
                      transition: "background-color 150ms",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFB"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td className="px-5 py-4 font-semibold whitespace-nowrap" style={{ color: "#001353" }}>
                      {r.student_display}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-[13px]" style={{ color: "#475569" }}>
                      {formatRelativeDate(r.created_at)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-[13px]" style={{ color: "#001353" }}>
                      <span className="mr-1">{r.flag_emoji}</span>
                      {r.destination}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-[13px]" style={{ color: "#475569" }}>
                      {r.stage}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap"
                        style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: ss.dot }} />
                        {ss.label}
                      </span>
                    </td>
                    <td
                      className="px-5 py-4 font-bold whitespace-nowrap text-[13px]"
                      style={{ color: r.commission > 0 ? "#b07400" : "#64748B" }}
                    >
                      {r.commission > 0 ? `NPR ${r.commission.toLocaleString()}` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
