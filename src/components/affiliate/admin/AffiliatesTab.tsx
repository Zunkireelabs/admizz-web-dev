"use client";

import { Fragment, useMemo, useState } from "react";
import type { Affiliate, AffiliateReferral, AffiliateClick } from "@/lib/affiliate/types";
import { updateAffiliateStatus, buildCountryBreakdown, buildActivityFeed } from "@/lib/affiliate/api";
import FunnelCard from "../dashboard/FunnelCard";
import CountryBreakdownCard from "../dashboard/CountryBreakdownCard";
import ActivityTimelineCard from "../dashboard/ActivityTimelineCard";
import StatsRow from "../dashboard/StatsRow";
import TierProgressCard from "../dashboard/TierProgressCard";
import PerformanceChart from "../dashboard/PerformanceChart";
import ReferralsTab from "./ReferralsTab";

const TIER_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  "Starter":       { bg: "rgba(148,163,184,0.1)",  text: "#475569", border: "rgba(148,163,184,0.3)" },
  "Rising Star":   { bg: "rgba(49,66,156,0.08)",   text: "#31429C", border: "rgba(49,66,156,0.25)" },
  "Elite Partner": { bg: "rgba(252,183,48,0.1)",   text: "#b07400", border: "rgba(252,183,48,0.3)"  },
  "Admizz Legend": { bg: "rgba(253,237,34,0.12)",  text: "#7a6f00", border: "rgba(253,237,34,0.4)"  },
};

interface Props {
  affiliates:  Affiliate[];
  referrals:   AffiliateReferral[];
  clicks:      AffiliateClick[];
  onRefresh:   () => Promise<void>;
}

export default function AffiliatesTab({ affiliates, referrals, clicks, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [statuses, setStatuses] = useState<Record<string, "active" | "suspended">>(
    Object.fromEntries(affiliates.map(a => [a.id, a.status]))
  );
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Pre-bucket clicks & referrals by affiliate code/id once
  const clicksByCode = useMemo(() => {
    const m = new Map<string, AffiliateClick[]>();
    for (const c of clicks) {
      const k = (c.code || "").toUpperCase();
      const arr = m.get(k); if (arr) arr.push(c); else m.set(k, [c]);
    }
    return m;
  }, [clicks]);

  const referralsById = useMemo(() => {
    const m = new Map<string, AffiliateReferral[]>();
    for (const r of referrals) {
      const arr = m.get(r.affiliate_id); if (arr) arr.push(r); else m.set(r.affiliate_id, [r]);
    }
    return m;
  }, [referrals]);

  const filtered = [...affiliates]
    .filter(a => !search || a.full_name.toLowerCase().includes(search.toLowerCase()) || (a.city ?? "").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortDesc ? b.total_referrals - a.total_referrals : a.total_referrals - b.total_referrals);

  const toggleStatus = async (id: string) => {
    const current = statuses[id] ?? "active";
    const next: "active" | "suspended" = current === "active" ? "suspended" : "active";
    setTogglingId(id);
    const result = await updateAffiliateStatus(id, next);
    if (result.ok) setStatuses(prev => ({ ...prev, [id]: next }));
    else alert(`Status update failed: ${result.error}`);
    setTogglingId(null);
    await onRefresh();
  };

  if (affiliates.length === 0) {
    return (
      <div className="rounded-2xl p-16 flex flex-col items-center justify-center text-center" style={{ background: "#FFFFFF", border: "1px solid #EAECF0" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: "#F1F2F6", color: "#64748B" }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-sm font-semibold" style={{ color: "#001353" }}>No active affiliates yet</p>
        <p className="text-xs mt-1 max-w-xs" style={{ color: "#64748B" }}>Approve applications in the Applications tab to start growing your affiliate network.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-bold uppercase mb-1" style={{ color: "#64748B", letterSpacing: "0.08em" }}>Active Network</p>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
            {affiliates.filter(a => (statuses[a.id] ?? a.status) === "active").length} active affiliates
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Click any affiliate to drill into their performance</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or city"
            className="w-full sm:w-72 pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{ background: "#FFFFFF", border: "1px solid #EAECF0", color: "#001353" }}
          />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #EAECF0", boxShadow: "0 1px 3px rgba(16,24,40,0.04)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#FAFAFB" }}>
                {[
                  { label: "" },
                  { label: "Name" },
                  { label: "Code" },
                  { label: "City" },
                  { label: "Tier" },
                  { label: "Clicks" },
                  { label: "Referrals", sortable: true },
                  { label: "Conv. %" },
                  { label: "Converted" },
                  { label: "Earned" },
                  { label: "Status" },
                ].map(h => (
                  <th
                    key={h.label || "expand"}
                    className={`px-4 py-3 text-left text-[12px] font-bold uppercase whitespace-nowrap ${h.sortable ? "cursor-pointer" : ""}`}
                    style={{ color: "#64748B", letterSpacing: "0.08em" }}
                    onClick={() => h.sortable && setSortDesc(p => !p)}
                  >
                    {h.label}{h.sortable && (sortDesc ? " ↓" : " ↑")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-sm" style={{ color: "#64748B" }}>
                    No affiliates match &ldquo;{search}&rdquo;
                  </td>
                </tr>
              )}
              {filtered.map((a, i) => {
                const tier = TIER_STYLE[a.tier] ?? TIER_STYLE["Starter"];
                const status = statuses[a.id] ?? a.status;
                const isToggling = togglingId === a.id;
                const isOpen = expandedId === a.id;

                const affClicks    = clicksByCode.get(a.referral_code.toUpperCase()) ?? [];
                const affReferrals = referralsById.get(a.id) ?? [];
                const convRate     = affReferrals.length > 0
                  ? Math.round((affReferrals.filter(r => r.status === "converted" || r.status === "paid").length / affReferrals.length) * 100)
                  : 0;

                return (
                  <Fragment key={a.id}>
                    <tr
                      onClick={() => setExpandedId(p => p === a.id ? null : a.id)}
                      style={{
                        borderTop: i === 0 ? "none" : "1px solid #F1F2F6",
                        transition: "background-color 150ms",
                        cursor: "pointer",
                        background: isOpen ? "#FAFAFB" : undefined,
                      }}
                      onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "#FAFAFB"; }}
                      onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
                    >
                      <td className="px-3 py-3.5 w-8" style={{ color: "#64748B" }}>
                        <svg
                          className="w-3.5 h-3.5 transition-transform"
                          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                          fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                      <td className="px-4 py-3.5 font-semibold whitespace-nowrap" style={{ color: "#001353" }}>{a.full_name}</td>
                      <td className="px-4 py-3.5 font-mono text-[12.5px] font-bold whitespace-nowrap" style={{ color: "#b07400" }}>{a.referral_code}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: "#475569" }}>{a.city ?? "—"}</td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap" style={{ background: tier.bg, color: tier.text, border: `1px solid ${tier.border}` }}>
                          {a.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold tabular-nums" style={{ color: "#0EA5E9" }}>{affClicks.length}</td>
                      <td className="px-4 py-3.5 font-extrabold tabular-nums" style={{ color: "#001353" }}>{a.total_referrals}</td>
                      <td className="px-4 py-3.5 font-semibold tabular-nums" style={{ color: convRate > 0 ? "#16a34a" : "#94A3B8" }}>
                        {affReferrals.length > 0 ? `${convRate}%` : "—"}
                      </td>
                      <td className="px-4 py-3.5 font-semibold tabular-nums" style={{ color: "#16a34a" }}>{a.total_converted}</td>
                      <td className="px-4 py-3.5 font-bold tabular-nums whitespace-nowrap" style={{ color: "#b07400" }}>
                        NPR {a.total_earned.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => toggleStatus(a.id)}
                          disabled={isToggling}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold transition-all"
                          style={{
                            background: status === "active" ? "rgba(34,197,94,0.08)" : "rgba(220,38,38,0.06)",
                            color:      status === "active" ? "#15803d" : "#b91d3f",
                            border:     status === "active" ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(220,38,38,0.2)",
                            opacity: isToggling ? 0.5 : 1,
                            cursor: isToggling ? "wait" : "pointer",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: status === "active" ? "#16a34a" : "#dc2626" }} />
                          {status === "active" ? "Active" : "Suspended"}
                        </button>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr style={{ background: "#FAFAFB", borderTop: "1px solid #F1F2F6" }}>
                        <td colSpan={11} className="px-6 py-5">
                          <AffiliateDrillIn
                            affiliate={a}
                            referrals={affReferrals}
                            clicks={affClicks}
                            onRefresh={onRefresh}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AffiliateDrillIn({
  affiliate, referrals, clicks, onRefresh,
}: {
  affiliate: Affiliate;
  referrals: AffiliateReferral[];
  clicks: AffiliateClick[];
  onRefresh: () => Promise<void>;
}) {
  const breakdown  = useMemo(() => buildCountryBreakdown(referrals), [referrals]);
  const activity   = useMemo(() => buildActivityFeed(clicks, referrals, 30), [clicks, referrals]);
  const converted  = referrals.filter(r => r.status === "converted" || r.status === "paid").length;
  const refLink    = `https://admizzeducation.com/register?ref=${affiliate.referral_code}`;
  const joined     = new Date(affiliate.joined_at ?? affiliate.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-4">
      {/* Header chip */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md" style={{ background: "#E0E7FF", color: "#3730A3", letterSpacing: "0.06em" }}>
          Affiliate detail · admin view
        </span>
        <span className="text-[12px]" style={{ color: "#64748B" }}>
          Joined {joined}
        </span>
      </div>

      {/* Profile card — full PII for admin */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #EAECF0", boxShadow: "0 1px 3px rgba(16,24,40,0.04)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 mb-4">
          <Field label="Full name"        value={affiliate.full_name} />
          <Field label="Email"            value={affiliate.email} mono />
          <Field label="Phone"            value={affiliate.phone ?? "—"} mono />
          <Field label="City"             value={affiliate.city ?? "—"} />
          <Field label="Referral code"    value={affiliate.referral_code} mono />
          <Field label="Tier"             value={affiliate.tier} />
          <Field label="Status"           value={affiliate.status} />
          <Field label="Application id"   value={affiliate.application_id ?? "—"} mono small />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
          <span className="text-[11px] font-bold uppercase" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>Personal link</span>
          <code className="text-[12px] px-2 py-1 rounded-md font-mono" style={{ background: "#FAFAFB", color: "#001353", border: "1px solid #EAECF0" }}>{refLink}</code>
          <button
            onClick={() => { navigator.clipboard.writeText(refLink).catch(() => {}); }}
            className="text-[11px] font-bold px-2.5 py-1 rounded-md"
            style={{ background: "#FFFFFF", color: "#b07400", border: "1px solid rgba(252,183,48,0.32)" }}
          >
            Copy link
          </button>
          <a
            href={`mailto:${affiliate.email}`}
            className="text-[11px] font-bold px-2.5 py-1 rounded-md"
            style={{ background: "#001353", color: "#FFFFFF" }}
          >
            Email
          </a>
          {affiliate.phone && (
            <a
              href={`https://wa.me/${affiliate.phone.replace(/[^0-9]/g, "")}`}
              target="_blank" rel="noopener noreferrer"
              className="text-[11px] font-bold px-2.5 py-1 rounded-md"
              style={{ background: "#25D366", color: "#FFFFFF" }}
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>

      {/* Stats parity with the affiliate's own dashboard */}
      <StatsRow affiliate={affiliate} rank={0} clicks={clicks.length} />

      {/* Funnel */}
      <FunnelCard clicks={clicks.length} registrations={referrals.length} conversions={converted} />

      {/* Tier progress + performance chart side by side */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        <TierProgressCard affiliate={affiliate} />
        <PerformanceChart referrals={referrals} />
      </div>

      {/* Country + activity timeline */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        <CountryBreakdownCard breakdown={breakdown} />
        <ActivityTimelineCard events={activity} />
      </div>

      {/* Full referrals table with per-row lead drill-in (Email/WhatsApp/student info).
          Reuses the Referrals tab UI — filtered to this affiliate, so admin can manage
          status mutations + see linked register_leads rows without leaving the panel. */}
      <div>
        <p className="text-[12px] font-bold uppercase mb-2" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
          Referrals — click any row to see the full lead
        </p>
        <ReferralsTab referrals={referrals} affiliates={[affiliate]} onRefresh={onRefresh} />
      </div>
    </div>
  );
}

function Field({ label, value, mono = false, small = false }: { label: string; value: string; mono?: boolean; small?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase mb-0.5" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>{label}</div>
      <div
        className="font-semibold break-words"
        style={{
          color: "#001353",
          fontSize: small ? 11 : 13,
          fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined,
        }}
      >
        {value}
      </div>
    </div>
  );
}
