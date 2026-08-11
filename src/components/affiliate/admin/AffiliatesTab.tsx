"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Affiliate, AffiliateReferral, AffiliateClick, AffiliateAuthStatus } from "@/lib/affiliate/types";
import { updateAffiliateStatus, resendAffiliateInvite } from "@/lib/affiliate/api";

const TIER_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  "Starter":       { bg: "rgba(148,163,184,0.1)",  text: "#475569", border: "rgba(148,163,184,0.3)" },
  "Rising Star":   { bg: "rgba(49,66,156,0.08)",   text: "#31429C", border: "rgba(49,66,156,0.25)" },
  "Elite Partner": { bg: "rgba(252,183,48,0.1)",   text: "#b07400", border: "rgba(252,183,48,0.3)"  },
  "Admizz Legend": { bg: "rgba(253,237,34,0.12)",  text: "#7a6f00", border: "rgba(253,237,34,0.4)"  },
};

interface Props {
  affiliates:   Affiliate[];
  referrals:    AffiliateReferral[];
  clicks:       AffiliateClick[];
  authStatuses: AffiliateAuthStatus[];
  onRefresh:    () => Promise<void>;
}

export default function AffiliatesTab({ affiliates, referrals, clicks, authStatuses, onRefresh }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [statuses, setStatuses] = useState<Record<string, "active" | "suspended">>(
    Object.fromEntries(affiliates.map(a => [a.id, a.status]))
  );
  const [togglingId,  setTogglingId]  = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [resendMsg,   setResendMsg]   = useState<{ id: string; ok: boolean; text: string } | null>(null);

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

  // Map email → auth status for O(1) lookup in the table
  const authByEmail = useMemo(() => {
    const m = new Map<string, AffiliateAuthStatus>();
    for (const s of authStatuses) m.set(s.email.toLowerCase(), s);
    return m;
  }, [authStatuses]);

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

  const openDetail = (id: string) => {
    router.push(`/affiliate-admin/affiliate?id=${id}`);
  };

  const handleResendInvite = async (e: React.MouseEvent, id: string, email: string) => {
    e.stopPropagation();
    setResendingId(id);
    setResendMsg(null);
    const result = await resendAffiliateInvite(email);
    setResendMsg({
      id,
      ok: result.ok,
      text: result.ok ? "Invite sent!" : (result.error ?? "Failed to send"),
    });
    setResendingId(null);
    // Clear the message after 4 seconds
    setTimeout(() => setResendMsg(prev => prev?.id === id ? null : prev), 4000);
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
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Click an affiliate to open their full profile</p>
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
                  { label: "Activation" },
                  { label: "Status" },
                  { label: "Actions" },
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
                  <td colSpan={13} className="px-4 py-10 text-center text-sm" style={{ color: "#64748B" }}>
                    No affiliates match &ldquo;{search}&rdquo;
                  </td>
                </tr>
              )}
              {filtered.map((a, i) => {
                const tier = TIER_STYLE[a.tier] ?? TIER_STYLE["Starter"];
                const status = statuses[a.id] ?? a.status;
                const isToggling = togglingId === a.id;

                const authStatus      = authByEmail.get(a.email.toLowerCase());
                const emailConfirmed  = !!authStatus?.email_confirmed_at;
                const isActivated     = emailConfirmed && !authStatus?.must_change_password;
                const affClicks    = clicksByCode.get(a.referral_code.toUpperCase()) ?? [];
                const affReferrals = referralsById.get(a.id) ?? [];
                const convRate     = affReferrals.length > 0
                  ? Math.round((affReferrals.filter(r => r.status === "converted" || r.status === "paid").length / affReferrals.length) * 100)
                  : 0;

                return (
                  <tr
                    key={a.id}
                    onClick={() => openDetail(a.id)}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid #F1F2F6",
                      transition: "background-color 150ms",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFB"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td className="px-3 py-3.5 w-8" style={{ color: "#64748B" }}>
                      <svg
                        className="w-3.5 h-3.5"
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
                      USD {a.total_earned.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5">
                      {authStatus === undefined ? (
                        <span className="text-[12px]" style={{ color: "#94A3B8" }}>—</span>
                      ) : isActivated ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap"
                          style={{ background: "rgba(34,197,94,0.08)", color: "#15803d", border: "1px solid rgba(34,197,94,0.25)" }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#16a34a" }} />
                          Activated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap"
                          style={{ background: "rgba(220,38,38,0.06)", color: "#b91d3f", border: "1px solid rgba(220,38,38,0.2)" }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#dc2626" }} />
                          Not activated
                        </span>
                      )}
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
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      {!emailConfirmed ? (
                        resendMsg?.id === a.id ? (
                          <span className="text-[12px] font-semibold" style={{ color: resendMsg.ok ? "#16a34a" : "#dc2626" }}>
                            {resendMsg.text}
                          </span>
                        ) : (
                          <button
                            onClick={e => handleResendInvite(e, a.id, a.email)}
                            disabled={resendingId === a.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold transition-all whitespace-nowrap"
                            style={{
                              background: "rgba(49,66,156,0.07)",
                              color:      "#31429C",
                              border:     "1px solid rgba(49,66,156,0.2)",
                              opacity: resendingId === a.id ? 0.5 : 1,
                              cursor: resendingId === a.id ? "wait" : "pointer",
                            }}
                          >
                            {resendingId === a.id ? "Sending…" : "Resend Invite"}
                          </button>
                        )
                      ) : !isActivated ? (
                        <span className="text-[12px] font-semibold" style={{ color: "#94A3B8" }}>
                          Awaiting account setup
                        </span>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
