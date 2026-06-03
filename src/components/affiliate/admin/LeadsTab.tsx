"use client";

import { Fragment, useMemo, useState } from "react";
import type { AdminLeadRow, ReferralStatus } from "@/lib/affiliate/types";
import { updateReferralStatus } from "@/lib/affiliate/api";

interface Props {
  leads:     AdminLeadRow[];
  onRefresh: () => Promise<void>;
}

const STATUS_STYLE: Record<ReferralStatus, { bg: string; color: string; border: string; label: string }> = {
  pending:   { bg: "rgba(148,163,184,0.1)",  color: "#475569", border: "rgba(148,163,184,0.3)", label: "Pending verification" },
  converted: { bg: "rgba(34,197,94,0.08)",   color: "#15803d", border: "rgba(34,197,94,0.25)",  label: "Converted"            },
  paid:      { bg: "rgba(252,183,48,0.1)",   color: "#b07400", border: "rgba(252,183,48,0.3)",  label: "Paid out"             },
};

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1)   return "Just now";
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7)   return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatAbs(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const CHANNEL_LABEL: Record<string, { emoji: string; name: string }> = {
  whatsapp:  { emoji: "💬", name: "WhatsApp"  },
  instagram: { emoji: "📸", name: "Instagram" },
  facebook:  { emoji: "👤", name: "Facebook"  },
  tiktok:    { emoji: "🎵", name: "TikTok"    },
  email:     { emoji: "✉️", name: "Email"     },
};

type AttribFilter = "all" | "affiliated" | "direct";

export default function LeadsTab({ leads, onRefresh }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState<AttribFilter>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter(row => {
      if (filter === "affiliated" && !row.referral) return false;
      if (filter === "direct"     &&  row.referral) return false;
      if (!q) return true;
      const hay = [
        row.lead.full_name, row.lead.email, row.lead.phone, row.lead.source,
        row.affiliate_name, row.referral?.affiliate_code,
      ].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [leads, search, filter]);

  const totalAffiliated = leads.filter(r => r.referral).length;
  const totalDirect     = leads.length - totalAffiliated;

  const changeStatus = async (row: AdminLeadRow, status: ReferralStatus) => {
    if (!row.referral) return;
    setUpdatingId(row.lead.id);
    const result = await updateReferralStatus(row.referral.id, status, row.referral.commission);
    setUpdatingId(null);
    if (!result.ok) {
      alert(`Status update failed: ${result.error}`);
      return;
    }
    await onRefresh();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-bold uppercase mb-1" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
            Lead Inbox
          </p>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
            {leads.length} total {leads.length === 1 ? "lead" : "leads"}
            <span style={{ color: "#64748B", fontWeight: 500 }}> · {totalAffiliated} via affiliate · {totalDirect} direct</span>
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Every lead captured via the website. Click a row to see the full journey + update status.
          </p>
        </div>
        <div className="relative w-full sm:w-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email, phone, affiliate code…"
            className="w-full sm:w-80 pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{ background: "#FFFFFF", border: "1px solid #EAECF0", color: "#001353" }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5">
        {([
          { key: "all" as AttribFilter,        label: "All",        count: leads.length },
          { key: "affiliated" as AttribFilter, label: "Affiliated", count: totalAffiliated },
          { key: "direct" as AttribFilter,     label: "Direct",     count: totalDirect },
        ]).map(f => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: active ? "#001353" : "#FFFFFF",
                color:      active ? "#FFFFFF" : "#475569",
                border:     active ? "1px solid #001353" : "1px solid #EAECF0",
              }}
            >
              {f.label} <span style={{ opacity: 0.6 }}>({f.count})</span>
            </button>
          );
        })}
      </div>

      {/* Banner: scope limitation */}
      <div
        className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl text-[12px]"
        style={{ background: "rgba(49,66,156,0.04)", border: "1px solid rgba(49,66,156,0.15)", color: "#475569" }}
      >
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "#31429C" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          Shows website-captured leads. Iframe forms (test-prep, register-v2) and CRM-direct entries are not yet integrated — coming soon.
        </span>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid #EAECF0", boxShadow: "0 1px 3px rgba(16,24,40,0.04)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#FAFAFB" }}>
                {["", "Lead", "Email", "Phone", "Came from", "Landed on", "Status", "When"].map(h => (
                  <th
                    key={h || "x"}
                    className="px-4 py-3 text-left text-[12px] font-bold uppercase whitespace-nowrap"
                    style={{ color: "#64748B", letterSpacing: "0.08em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: "#F1F2F6", color: "#64748B" }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: "#001353" }}>
                        {leads.length === 0 ? "No leads yet" : "No leads match this filter"}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#64748B" }}>
                        {leads.length === 0
                          ? "Leads will appear here as students register through the website."
                          : "Try a different search or filter."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.map((row, i) => {
                const isOpen = expandedId === row.lead.id;
                const ss = row.referral ? STATUS_STYLE[row.referral.status] : null;
                const chan = row.channel ? CHANNEL_LABEL[row.channel.toLowerCase()] : null;

                return (
                  <Fragment key={row.lead.id}>
                    <tr
                      onClick={() => setExpandedId(p => p === row.lead.id ? null : row.lead.id)}
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
                      <td className="px-4 py-3.5 font-semibold whitespace-nowrap" style={{ color: "#001353" }}>
                        {row.lead.full_name || "Unnamed"}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: "#475569", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {row.lead.email}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: row.lead.phone ? "#475569" : "#94A3B8", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {row.lead.phone ?? "—"}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]">
                        {row.referral ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold" style={{ color: "#b07400" }}>{row.referral.affiliate_code}</span>
                            <span style={{ color: "#64748B" }}>· {row.affiliate_name?.split(" ")[0] ?? ""}</span>
                            {chan && <span style={{ color: "#94A3B8" }}>· {chan.emoji} {chan.name}</span>}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background: "rgba(148,163,184,0.1)", color: "#64748B", border: "1px solid rgba(148,163,184,0.3)" }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#94A3B8" }} />
                            Direct
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[12.5px]" style={{ color: "#475569" }}>
                        {row.landing_page ? (
                          <code className="px-1.5 py-0.5 rounded" style={{ background: "#F1F5F9" }}>{row.landing_page}</code>
                        ) : (
                          <span style={{ color: "#94A3B8" }}>—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {ss ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold" style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                            {ss.label}
                          </span>
                        ) : (
                          <span className="text-[11px]" style={{ color: "#94A3B8" }}>—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: "#475569" }}>
                        {formatRelative(row.lead.created_at)}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr style={{ background: "#FAFAFB", borderTop: "1px solid #F1F2F6" }}>
                        <td colSpan={8} className="px-6 py-5">
                          <LeadDrillIn
                            row={row}
                            updating={updatingId === row.lead.id}
                            onChangeStatus={(s) => changeStatus(row, s)}
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

function LeadDrillIn({
  row, updating, onChangeStatus,
}: {
  row: AdminLeadRow;
  updating: boolean;
  onChangeStatus: (s: ReferralStatus) => void;
}) {
  const { lead, referral, affiliate_name, landing_page, channel, first_click_at } = row;
  const ss = referral ? STATUS_STYLE[referral.status] : null;
  const chan = channel ? CHANNEL_LABEL[channel.toLowerCase()] : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md" style={{ background: "#E0E7FF", color: "#3730A3", letterSpacing: "0.06em" }}>
          Lead detail
        </span>
        <span className="text-[12px]" style={{ color: "#64748B" }}>
          captured {formatAbs(lead.created_at)}
        </span>
      </div>

      {/* Full lead fields */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
        <Field label="Full name"          value={lead.full_name || "—"} />
        <Field label="Email"              value={lead.email} mono />
        <Field label="Phone"              value={lead.phone ?? "—"} mono />
        <Field label="Countries"          value={lead.countries ?? "—"} />
        <Field label="Intake"             value={lead.intake || "—"} />
        <Field label="Field of study"     value={lead.field || "—"} />
        <Field label="Education"          value={lead.education || "—"} />
        <Field label="Preferred contact"  value={lead.contact_pref || "—"} />
        <Field label="Source"             value={lead.source || "—"} />
      </div>

      {/* Journey timeline */}
      <div className="rounded-xl p-4" style={{ background: "#FFFFFF", border: "1px solid #EAECF0" }}>
        <p className="text-[11px] font-bold uppercase mb-3" style={{ color: "#64748B", letterSpacing: "0.06em" }}>
          Journey
        </p>
        <ol className="space-y-2.5 text-[13px]">
          {first_click_at && (
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#31429C" }} />
              <div>
                <div style={{ color: "#001353" }}>
                  <span className="font-bold">Clicked link</span>{" "}
                  {chan ? <>via {chan.emoji} <strong>{chan.name}</strong></> : null}
                  {landing_page ? <> · landed on <code className="text-[12px] px-1 py-0.5 rounded" style={{ background: "#F1F5F9" }}>{landing_page}</code></> : null}
                </div>
                <div className="text-[11px]" style={{ color: "#94A3B8" }}>{formatAbs(first_click_at)}</div>
              </div>
            </li>
          )}
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#0EA5E9" }} />
            <div>
              <div style={{ color: "#001353" }}>
                <span className="font-bold">Registered</span> via form (source: <code className="text-[12px] px-1 py-0.5 rounded" style={{ background: "#F1F5F9" }}>{lead.source || "website"}</code>)
              </div>
              <div className="text-[11px]" style={{ color: "#94A3B8" }}>{formatAbs(lead.created_at)}</div>
            </div>
          </li>
          {referral && (
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ss?.color ?? "#64748B" }} />
              <div>
                <div style={{ color: "#001353" }}>
                  <span className="font-bold">Credited to {affiliate_name ?? "affiliate"}</span> <span style={{ color: "#b07400" }}>· {referral.affiliate_code}</span> ·
                  current status <strong style={{ color: ss?.color ?? "#64748B" }}>{ss?.label ?? referral.status}</strong> ·
                  stage <strong>{referral.stage}</strong>
                  {referral.commission > 0 && <span> · NPR {referral.commission.toLocaleString()}</span>}
                </div>
                <div className="text-[11px]" style={{ color: "#94A3B8" }}>last updated {formatAbs(referral.updated_at)}</div>
              </div>
            </li>
          )}
          {!referral && (
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#94A3B8" }} />
              <div>
                <div style={{ color: "#475569" }}>
                  <span className="font-bold">No affiliate attribution</span> — direct registration
                </div>
              </div>
            </li>
          )}
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`mailto:${lead.email}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold"
          style={{ background: "#001353", color: "#FFFFFF" }}
        >
          Email
        </a>
        {lead.phone && (
          <a
            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold"
            style={{ background: "#25D366", color: "#FFFFFF" }}
          >
            WhatsApp
          </a>
        )}
        {referral && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>Update status</span>
            <select
              value={referral.status}
              onChange={e => onChangeStatus(e.target.value as ReferralStatus)}
              disabled={updating}
              className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-[12px] font-bold outline-none cursor-pointer"
              style={{ background: ss?.bg, color: ss?.color, border: `1px solid ${ss?.border}` }}
            >
              <option value="pending">Pending verification</option>
              <option value="converted">Converted</option>
              <option value="paid">Paid out</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase mb-0.5" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>{label}</div>
      <div
        className="text-[13px] font-semibold break-words"
        style={{ color: "#001353", fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined }}
      >
        {value}
      </div>
    </div>
  );
}
