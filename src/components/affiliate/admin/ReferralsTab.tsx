"use client";

import { useState } from "react";
import type { AffiliateReferral, Affiliate, ReferralStatus } from "@/lib/affiliate/types";
import { addReferral, updateReferralStatus } from "@/lib/affiliate/api";

const STATUS_STYLE: Record<ReferralStatus, { bg: string; color: string; label: string }> = {
  pending:   { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", label: "Pending" },
  converted: { bg: "rgba(34,197,94,0.12)",  color: "#4ade80",               label: "Converted" },
  paid:      { bg: "rgba(252,183,48,0.15)", color: "#FCB730",               label: "Paid ✓" },
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

type FilterStatus = "all" | ReferralStatus;

interface Props {
  referrals: AffiliateReferral[];
  affiliates: Affiliate[];
  onRefresh: () => Promise<void>;
}

export default function ReferralsTab({ referrals, affiliates, onRefresh }: Props) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
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
    { key: "all",       label: "All",       count: referrals.length },
    { key: "pending",   label: "Pending",   count: referrals.filter(r => r.status === "pending").length },
    { key: "converted", label: "Converted", count: referrals.filter(r => r.status === "converted").length },
    { key: "paid",      label: "Paid",      count: referrals.filter(r => r.status === "paid").length },
  ];

  const getAffiliateName = (id: string) => affiliates.find(a => a.id === id)?.full_name?.split(" ")[0] ?? id.slice(0, 8);
  const getAffiliateCode = (id: string) => affiliates.find(a => a.id === id)?.referral_code ?? "";

  const handleAddReferral = async () => {
    if (!newRef.affiliate_id || !newRef.student_display) return;
    setSaving(true);
    const dest = DESTINATIONS.find(d => d.name === newRef.destination);
    await addReferral({
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
    setShowAdd(false);
    setNewRef({ affiliate_id: "", student_display: "", destination: "United Kingdom", stage: "Consultation", status: "pending", commission: 0 });
    await onRefresh();
  };

  const handleStatusChange = async (r: AffiliateReferral, status: ReferralStatus) => {
    await updateReferralStatus(r.id, status, r.commission);
    await onRefresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: filter === f.key ? "#FDED22" : "rgba(255,255,255,0.07)",
                color: filter === f.key ? "#000" : "rgba(255,255,255,0.6)",
              }}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAdd(p => !p)}
          className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
          style={{ background: "rgba(252,183,48,0.15)", color: "#FCB730", border: "1px solid rgba(252,183,48,0.3)" }}
        >
          + Add Referral
        </button>
      </div>

      {showAdd && (
        <div className="rounded-[12px] p-5 space-y-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(252,183,48,0.2)" }}>
          <p className="text-sm font-bold text-white">Add Manual Referral</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Affiliate</label>
              <select
                value={newRef.affiliate_id}
                onChange={e => setNewRef(p => ({ ...p, affiliate_id: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              >
                <option value="">Select affiliate…</option>
                {affiliates.filter(a => a.status === "active").map(a => (
                  <option key={a.id} value={a.id}>{a.full_name} — {a.referral_code}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Student (display name)</label>
              <input
                type="text"
                value={newRef.student_display}
                onChange={e => setNewRef(p => ({ ...p, student_display: e.target.value }))}
                placeholder="e.g. Suraj Y."
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Destination</label>
              <select
                value={newRef.destination}
                onChange={e => setNewRef(p => ({ ...p, destination: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              >
                {DESTINATIONS.map(d => <option key={d.name} value={d.name}>{d.flag} {d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Stage</label>
              <select
                value={newRef.stage}
                onChange={e => setNewRef(p => ({ ...p, stage: e.target.value as AffiliateReferral["stage"] }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              >
                {["Consultation", "Enrolled", "University Confirmed", "Visa Approved"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Status</label>
              <select
                value={newRef.status}
                onChange={e => setNewRef(p => ({ ...p, status: e.target.value as ReferralStatus }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              >
                <option value="pending">Pending</option>
                <option value="converted">Converted</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Commission (NPR)</label>
              <input
                type="number"
                value={newRef.commission}
                onChange={e => setNewRef(p => ({ ...p, commission: Number(e.target.value) }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddReferral}
              disabled={saving || !newRef.affiliate_id || !newRef.student_display}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: "#FDED22", color: "#000", opacity: saving ? 0.6 : 1 }}
            >
              {saving ? "Saving…" : "Save Referral"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-[12px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Affiliate", "Student", "Date", "Destination", "Stage", "Status", "Commission"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                    No referrals found.
                  </td>
                </tr>
              )}
              {filtered.map((r, i) => {
                const ss = STATUS_STYLE[r.status];
                return (
                  <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{getAffiliateName(r.affiliate_id)}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.7)" }}>{r.student_display}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.45)" }}>{formatDate(r.created_at)}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.6)" }}>{r.flag_emoji} {r.destination}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{r.stage}</td>
                    <td className="px-4 py-3">
                      <select
                        value={r.status}
                        onChange={e => handleStatusChange(r, e.target.value as ReferralStatus)}
                        className="px-2.5 py-1 rounded-full text-xs font-bold outline-none cursor-pointer"
                        style={{ background: ss.bg, color: ss.color, border: "none" }}
                      >
                        <option value="pending">Pending</option>
                        <option value="converted">Converted</option>
                        <option value="paid">Paid ✓</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: r.commission > 0 ? "#FCB730" : "rgba(255,255,255,0.3)" }}>
                      {r.commission > 0 ? `NPR ${r.commission.toLocaleString()}` : "—"}
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
