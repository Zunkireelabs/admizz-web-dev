"use client";

import { useState } from "react";
import type { AffiliateReferral, Affiliate } from "@/lib/affiliate/types";
import { markReferralPaid } from "@/lib/affiliate/api";

const TIER_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  "Starter":       { bg: "rgba(148,163,184,0.1)",  text: "#475569", border: "rgba(148,163,184,0.3)" },
  "Rising Star":   { bg: "rgba(49,66,156,0.08)",   text: "#31429C", border: "rgba(49,66,156,0.25)" },
  "Elite Partner": { bg: "rgba(252,183,48,0.1)",   text: "#b07400", border: "rgba(252,183,48,0.3)"  },
  "Admizz Legend": { bg: "rgba(253,237,34,0.12)",  text: "#7a6f00", border: "rgba(253,237,34,0.4)"  },
};

interface Props {
  referrals: AffiliateReferral[];
  affiliates: Affiliate[];
  onRefresh: () => Promise<void>;
}

export default function PayoutsTab({ referrals, affiliates, onRefresh }: Props) {
  const [markingId, setMarkingId] = useState<string | null>(null);

  const rows = affiliates
    .map(aff => {
      const converted = referrals.filter(r => r.affiliate_id === aff.id && r.status === "converted");
      const total = converted.reduce((s, r) => s + r.commission, 0);
      return { aff, converted, total };
    })
    .filter(e => e.total > 0)
    .sort((a, b) => b.total - a.total);

  const totalDue = rows.reduce((s, e) => s + e.total, 0);
  const totalReferrals = rows.reduce((s, e) => s + e.converted.length, 0);

  const handleMarkAllPaid = async (row: typeof rows[0]) => {
    setMarkingId(row.aff.id);
    const failures: string[] = [];
    for (const ref of row.converted) {
      const result = await markReferralPaid(ref.id, row.aff.id, ref.commission);
      if (!result.ok) failures.push(result.error);
    }
    setMarkingId(null);
    if (failures.length > 0) {
      alert(`${failures.length} payout(s) failed: ${failures[0]}`);
    }
    await onRefresh();
  };

  return (
    <div className="space-y-4">
      {/* Hero — total outstanding */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, rgba(252,183,48,0.04) 100%)",
          border: "1px solid rgba(252,183,48,0.32)",
          boxShadow: "0 4px 20px rgba(252,183,48,0.08), 0 1px 3px rgba(16,24,40,0.04)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, #FCB730, #FDED22, #FCB730)" }}
        />
        <div className="relative flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(252,183,48,0.12)", color: "#b07400", border: "1px solid rgba(252,183,48,0.3)" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p
              className="text-[12px] font-bold uppercase"
              style={{ color: "#64748B", letterSpacing: "0.08em" }}
            >
              Outstanding Payouts
            </p>
            <p className="text-sm font-bold mt-0.5" style={{ color: "#001353" }}>
              Total commissions owed to affiliates
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
              {totalReferrals} converted {totalReferrals === 1 ? "referral" : "referrals"} across {rows.length} {rows.length === 1 ? "affiliate" : "affiliates"}
            </p>
          </div>
        </div>
        <div className="relative text-right">
          <div
            className="text-[28px] md:text-[32px] font-extrabold tracking-tight"
            style={{ color: "#001353" }}
          >
            USD {totalDue.toLocaleString()}
          </div>
          <p className="text-xs" style={{ color: "#64748B" }}>
            Pending settlement
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div
          className="rounded-2xl p-12 flex flex-col items-center justify-center text-center"
          style={{ background: "#FFFFFF", border: "1px solid #EAECF0" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-semibold" style={{ color: "#001353" }}>All caught up</p>
          <p className="text-xs mt-1 max-w-sm" style={{ color: "#64748B" }}>
            There are no outstanding payouts. All converted referrals have been settled.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map(({ aff, converted, total }) => {
            const isMarking = markingId === aff.id;
            const tier = TIER_STYLE[aff.tier] ?? TIER_STYLE["Starter"];
            return (
              <div
                key={aff.id}
                className="rounded-2xl px-6 py-5"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #EAECF0",
                  boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-base" style={{ color: "#001353" }}>{aff.full_name}</p>
                      <span
                        className="text-[12px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{ background: tier.bg, color: tier.text, border: `1px solid ${tier.border}` }}
                      >
                        {aff.tier}
                      </span>
                      <span className="font-mono text-[12px] font-bold whitespace-nowrap" style={{ color: "#b07400" }}>
                        {aff.referral_code}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: "#64748B" }}>
                      {aff.city ?? "—"} · {converted.length} converted {converted.length === 1 ? "referral" : "referrals"} ready for payout
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-extrabold tabular-nums tracking-tight" style={{ color: "#001353" }}>
                        USD {total.toLocaleString()}
                      </div>
                      <p className="text-[11px]" style={{ color: "#64748B" }}>
                        Total owed
                      </p>
                    </div>
                    <button
                      onClick={() => handleMarkAllPaid({ aff, converted, total })}
                      disabled={isMarking}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200"
                      style={{
                        background: "#16a34a",
                        color: "#FFFFFF",
                        boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
                        opacity: isMarking ? 0.6 : 1,
                      }}
                      onMouseEnter={e => { if (!isMarking) { e.currentTarget.style.background = "#15803d"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(22,163,74,0.35)"; } }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(22,163,74,0.25)"; }}
                    >
                      {isMarking ? (
                        <>
                          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Processing
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Mark all paid
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Referral pills */}
                <div
                  className="flex flex-wrap gap-1.5 pt-3"
                  style={{ borderTop: "1px solid #F1F2F6" }}
                >
                  {converted.map(ref => (
                    <span
                      key={ref.id}
                      className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-md font-semibold"
                      style={{ background: "#FAFAFB", color: "#475569", border: "1px solid #EAECF0" }}
                    >
                      <span>{ref.flag_emoji}</span>
                      {ref.student_display}
                      <span className="font-bold" style={{ color: "#b07400" }}>
                        USD {ref.commission.toLocaleString()}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
