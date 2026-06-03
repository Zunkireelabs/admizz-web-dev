"use client";

import { Fragment, useState } from "react";
import type { AffiliateReferral, Affiliate, ReferralStatus, RegisterLead } from "@/lib/affiliate/types";
import { addReferral, updateReferralStatus, getLeadById } from "@/lib/affiliate/api";

const STATUS_STYLE: Record<ReferralStatus, { bg: string; color: string; border: string; label: string; dot: string }> = {
  pending:   { bg: "rgba(148,163,184,0.1)",  color: "#475569", border: "rgba(148,163,184,0.3)", label: "Awaiting",  dot: "#64748B" },
  converted: { bg: "rgba(34,197,94,0.08)",   color: "#15803d", border: "rgba(34,197,94,0.25)",  label: "Converted", dot: "#16a34a" },
  paid:      { bg: "rgba(252,183,48,0.1)",   color: "#b07400", border: "rgba(252,183,48,0.3)",  label: "Paid out",  dot: "#FCB730" },
};

const DESTINATIONS = [
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🌍",  name: "Other" },
];

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDay = Math.floor(diffMs / 86_400_000);
  const diffHr = Math.floor(diffMs / 3_600_000);
  if (diffHr < 1) return "Just now";
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

type FilterStatus = "all" | ReferralStatus;

interface Props {
  referrals: AffiliateReferral[];
  affiliates: Affiliate[];
  onRefresh: () => Promise<void>;
}

const inputStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #EAECF0",
  color: "#001353",
};

export default function ReferralsTab({ referrals, affiliates, onRefresh }: Props) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [leadCache, setLeadCache] = useState<Record<string, RegisterLead | "loading" | "missing">>({});

  const toggleExpand = async (r: AffiliateReferral) => {
    if (expandedId === r.id) { setExpandedId(null); return; }
    setExpandedId(r.id);
    if (!r.lead_id) return;
    if (leadCache[r.lead_id]) return;
    setLeadCache(p => ({ ...p, [r.lead_id!]: "loading" }));
    const lead = await getLeadById(r.lead_id);
    setLeadCache(p => ({ ...p, [r.lead_id!]: lead ?? "missing" }));
  };
  const [newRef, setNewRef] = useState({
    affiliate_id: "",
    student_display: "",
    destination: "United Kingdom",
    stage: "Consultation" as AffiliateReferral["stage"],
    status: "pending" as ReferralStatus,
    commission: 0,
  });

  const filtered = filter === "all" ? referrals : referrals.filter(r => r.status === filter);
  const filters: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all",       label: "All Activity",  count: referrals.length },
    { key: "pending",   label: "Awaiting",      count: referrals.filter(r => r.status === "pending").length },
    { key: "converted", label: "Converted",     count: referrals.filter(r => r.status === "converted").length },
    { key: "paid",      label: "Paid Out",      count: referrals.filter(r => r.status === "paid").length },
  ];

  const getAffiliateName = (id: string) => affiliates.find(a => a.id === id)?.full_name?.split(" ")[0] ?? id.slice(0, 8);
  const getAffiliateCode = (id: string) => affiliates.find(a => a.id === id)?.referral_code ?? "";

  const handleAddReferral = async () => {
    if (!newRef.affiliate_id || !newRef.student_display) return;
    setSaving(true);
    const dest = DESTINATIONS.find(d => d.name === newRef.destination);
    const result = await addReferral({
      affiliate_id:    newRef.affiliate_id,
      affiliate_code:  getAffiliateCode(newRef.affiliate_id),
      student_display: newRef.student_display,
      destination:     newRef.destination,
      flag_emoji:      dest?.flag ?? "🌍",
      stage:           newRef.stage,
      status:          newRef.status,
      commission:      newRef.commission,
    });
    setSaving(false);
    if (!result.ok) {
      alert(`Add referral failed: ${result.error}`);
      return;
    }
    setShowAdd(false);
    setNewRef({ affiliate_id: "", student_display: "", destination: "United Kingdom", stage: "Consultation", status: "pending", commission: 0 });
    await onRefresh();
  };

  const handleStatusChange = async (r: AffiliateReferral, status: ReferralStatus) => {
    const result = await updateReferralStatus(r.id, status, r.commission);
    if (!result.ok) {
      alert(`Status update failed: ${result.error}`);
      return;
    }
    await onRefresh();
  };

  return (
    <div className="space-y-4">
      {/* Header + actions */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p
            className="text-[12px] font-bold uppercase mb-1"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            Referral Lifecycle
          </p>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
            {referrals.length} total {referrals.length === 1 ? "referral" : "referrals"}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Update stage and status as students progress through the funnel
          </p>
        </div>
        <button
          onClick={() => setShowAdd(p => !p)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
          style={{
            background: showAdd ? "#FFFFFF" : "#001353",
            color: showAdd ? "#475569" : "#FFFFFF",
            border: showAdd ? "1px solid #EAECF0" : "1px solid #001353",
            boxShadow: showAdd ? "none" : "0 2px 8px rgba(0,19,83,0.25)",
          }}
        >
          {showAdd ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Manual Referral
            </>
          )}
        </button>
      </div>

      {/* Filters */}
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
          >
            {f.label} <span style={{ opacity: 0.6 }}>({f.count})</span>
          </button>
        ))}
      </div>

      {/* Add referral modal */}
      {showAdd && (
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(252,183,48,0.3)",
            boxShadow: "0 8px 24px rgba(252,183,48,0.08), 0 1px 3px rgba(16,24,40,0.04)",
          }}
        >
          <div>
            <p className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
              Add a manual referral
            </p>
            <p className="text-xs mt-1" style={{ color: "#64748B" }}>
              Use this when a referral didn&apos;t come through the affiliate link
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
                Affiliate
              </label>
              <select
                value={newRef.affiliate_id}
                onChange={e => setNewRef(p => ({ ...p, affiliate_id: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
              >
                <option value="">Select an affiliate…</option>
                {affiliates.filter(a => a.status === "active").map(a => (
                  <option key={a.id} value={a.id}>{a.full_name} — {a.referral_code}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
                Student display name
              </label>
              <input
                type="text"
                value={newRef.student_display}
                onChange={e => setNewRef(p => ({ ...p, student_display: e.target.value }))}
                placeholder="e.g. Suraj Y."
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
                Destination country
              </label>
              <select
                value={newRef.destination}
                onChange={e => setNewRef(p => ({ ...p, destination: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle}
              >
                {DESTINATIONS.map(d => <option key={d.name} value={d.name}>{d.flag} {d.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
                Funnel stage
              </label>
              <select
                value={newRef.stage}
                onChange={e => setNewRef(p => ({ ...p, stage: e.target.value as AffiliateReferral["stage"] }))}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle}
              >
                {["Consultation", "Enrolled", "University Confirmed", "Visa Approved"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
                Status
              </label>
              <select
                value={newRef.status}
                onChange={e => setNewRef(p => ({ ...p, status: e.target.value as ReferralStatus }))}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle}
              >
                <option value="pending">Awaiting conversion</option>
                <option value="converted">Converted</option>
                <option value="paid">Paid out</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
                Commission (NPR)
              </label>
              <input
                type="number"
                value={newRef.commission}
                onChange={e => setNewRef(p => ({ ...p, commission: Number(e.target.value) }))}
                placeholder="0"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddReferral}
              disabled={saving || !newRef.affiliate_id || !newRef.student_display}
              className="px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-200 flex items-center gap-2"
              style={{
                background: "#FDED22",
                color: "#001353",
                opacity: saving || !newRef.affiliate_id || !newRef.student_display ? 0.5 : 1,
                boxShadow: "0 2px 8px rgba(253,237,34,0.4)",
              }}
            >
              {saving ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving…
                </>
              ) : "Save Referral"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: "#FFFFFF", color: "#475569", border: "1px solid #EAECF0" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: "1px solid #EAECF0",
          boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#FAFAFB" }}>
                {["", "Affiliate", "Student", "Email", "Created", "Destination", "Stage", "Status", "Commission"].map(h => (
                  <th
                    key={h}
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
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                        style={{ background: "#F1F2F6", color: "#64748B" }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: "#001353" }}>
                        {referrals.length === 0 ? "No referrals yet" : "No matches for this filter"}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#64748B" }}>
                        {referrals.length === 0
                          ? "Referrals will appear here as students register through affiliate links."
                          : "Try selecting a different filter above."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.map((r, i) => {
                const ss = STATUS_STYLE[r.status];
                const isOpen   = expandedId === r.id;
                const leadInfo = r.lead_id ? leadCache[r.lead_id] : undefined;
                const lead     = leadInfo && leadInfo !== "loading" && leadInfo !== "missing" ? leadInfo : null;
                return (
                  <Fragment key={r.id}>
                    <tr
                      onClick={() => toggleExpand(r)}
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
                        {getAffiliateName(r.affiliate_id)}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: "#001353" }}>
                        {r.student_display}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: r.email ? "#475569" : "#94A3B8" }}>
                        {r.email ?? <span title="Manually-added referral — no linked lead">—</span>}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: "#475569" }}>
                        {formatRelativeDate(r.created_at)}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: "#001353" }}>
                        <span className="mr-1">{r.flag_emoji}</span>{r.destination}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[13px]" style={{ color: "#475569" }}>
                        {r.stage}
                      </td>
                      <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                        <select
                          value={r.status}
                          onChange={e => handleStatusChange(r, e.target.value as ReferralStatus)}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-bold outline-none cursor-pointer"
                          style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}
                        >
                          <option value="pending">Awaiting</option>
                          <option value="converted">Converted</option>
                          <option value="paid">Paid out</option>
                        </select>
                      </td>
                      <td className="px-4 py-3.5 font-bold whitespace-nowrap text-[13px]" style={{ color: r.commission > 0 ? "#b07400" : "#64748B" }}>
                        {r.commission > 0 ? `NPR ${r.commission.toLocaleString()}` : "—"}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr style={{ background: "#FAFAFB", borderTop: "1px solid #F1F2F6" }}>
                        <td colSpan={9} className="px-6 py-5">
                          {!r.lead_id ? (
                            <div className="text-[13px]" style={{ color: "#64748B" }}>
                              <span className="font-bold" style={{ color: "#001353" }}>No linked lead.</span>{" "}
                              This referral was either added manually or created before lead-linking was enabled.
                            </div>
                          ) : leadInfo === "loading" ? (
                            <div className="text-[13px]" style={{ color: "#64748B" }}>Loading lead details…</div>
                          ) : leadInfo === "missing" || !lead ? (
                            <div className="text-[13px]" style={{ color: "#b91c1c" }}>
                              Linked lead <code className="px-1 py-0.5 rounded" style={{ background: "#FEE2E2" }}>{r.lead_id}</code> not found in register_leads.
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md" style={{ background: "#E0E7FF", color: "#3730A3", letterSpacing: "0.06em" }}>
                                  Lead details
                                </span>
                                <span className="text-[12px]" style={{ color: "#64748B" }}>
                                  from register_leads · {formatRelativeDate(lead.created_at)}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                                <Field label="Full name"          value={lead.full_name} />
                                <Field label="Email"              value={lead.email} mono />
                                <Field label="Phone"              value={lead.phone ?? "—"} mono />
                                <Field label="Countries"          value={lead.countries ?? "—"} />
                                <Field label="Intake"             value={lead.intake || "—"} />
                                <Field label="Field of study"     value={lead.field || "—"} />
                                <Field label="Education"          value={lead.education || "—"} />
                                <Field label="Preferred contact"  value={lead.contact_pref || "—"} />
                                <Field label="Source"             value={lead.source || "—"} />
                              </div>
                              <div className="mt-4 flex gap-2">
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold"
                                  style={{ background: "#001353", color: "#FFFFFF" }}
                                >
                                  Email student
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
                              </div>
                            </div>
                          )}
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

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase mb-0.5" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>
        {label}
      </div>
      <div
        className="text-[13px] font-semibold break-words"
        style={{ color: "#001353", fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined }}
      >
        {value}
      </div>
    </div>
  );
}
