"use client";

import { useState } from "react";
import type { Affiliate } from "@/lib/affiliate/types";
import { updateAffiliateStatus } from "@/lib/affiliate/api";

const TIER_COLORS: Record<string, string> = {
  "Starter":       "#94a3b8",
  "Rising Star":   "#31429C",
  "Elite Partner": "#FCB730",
  "Admizz Legend": "#FDED22",
};

interface Props {
  affiliates: Affiliate[];
  onRefresh: () => Promise<void>;
}

export default function AffiliatesTab({ affiliates, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [statuses, setStatuses] = useState<Record<string, "active" | "suspended">>(
    Object.fromEntries(affiliates.map(a => [a.id, a.status]))
  );
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const filtered = [...affiliates]
    .filter(a => !search || a.full_name.toLowerCase().includes(search.toLowerCase()) || (a.city ?? "").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortDesc ? b.total_referrals - a.total_referrals : a.total_referrals - b.total_referrals);

  const toggleStatus = async (id: string) => {
    const current = statuses[id] ?? "active";
    const next: "active" | "suspended" = current === "active" ? "suspended" : "active";
    setTogglingId(id);
    await updateAffiliateStatus(id, next);
    setStatuses(prev => ({ ...prev, [id]: next }));
    setTogglingId(null);
    await onRefresh();
  };

  if (affiliates.length === 0) {
    return (
      <div className="text-center py-12 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        No approved affiliates yet. Approve applications to see them here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or city..."
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
        />
      </div>

      <div className="rounded-[12px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Name", "Code", "City", "Tier", "Refs ↕", "Converted", "Earned (NPR)", "Status"].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onClick={() => h === "Refs ↕" && setSortDesc(p => !p)}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const color = TIER_COLORS[a.tier] ?? "#6b7280";
                const status = statuses[a.id] ?? a.status;
                return (
                  <tr key={a.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{a.full_name}</td>
                    <td className="px-4 py-3 font-mono text-xs whitespace-nowrap" style={{ color: "#FCB730" }}>{a.referral_code}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.5)" }}>{a.city ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap"
                        style={{ background: color + "22", color, border: `1px solid ${color}44` }}>
                        {a.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-white">{a.total_referrals}</td>
                    <td className="px-4 py-3" style={{ color: "#4ade80" }}>{a.total_converted}</td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: "#FCB730" }}>
                      {a.total_earned.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(a.id)}
                        disabled={togglingId === a.id}
                        className="px-2.5 py-1 rounded-full text-xs font-bold transition-all"
                        style={{
                          background: status === "active" ? "rgba(34,197,94,0.12)" : "rgba(224,69,98,0.12)",
                          color: status === "active" ? "#4ade80" : "#e04562",
                          opacity: togglingId === a.id ? 0.5 : 1,
                        }}
                      >
                        {status === "active" ? "Active" : "Suspended"}
                      </button>
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
