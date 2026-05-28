"use client";

import { useState } from "react";
import type { AffiliateApplication } from "@/lib/affiliate/types";
import { approveApplication, rejectApplication } from "@/lib/affiliate/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

interface Props {
  initialApplications: AffiliateApplication[];
  onRefresh: () => Promise<void>;
}

export default function ApplicationsTab({ initialApplications, onRefresh }: Props) {
  const [apps, setApps] = useState(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [approvedCodes, setApprovedCodes] = useState<Record<string, string>>({});

  const handleApprove = async (app: AffiliateApplication) => {
    setLoadingId(app.id);
    const result = await approveApplication(app);
    if (result) {
      setApps(prev => prev.map(a => a.id === app.id ? { ...a, status: "approved" as const } : a));
      setApprovedCodes(prev => ({ ...prev, [app.id]: result.code }));
    }
    setLoadingId(null);
    await onRefresh();
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    await rejectApplication(id);
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: "rejected" as const } : a));
    setLoadingId(null);
    await onRefresh();
  };

  const pending = apps.filter(a => a.status === "new");
  const decided = apps.filter(a => a.status !== "new");

  return (
    <div className="space-y-4">
      {pending.length === 0 && decided.length === 0 && (
        <div className="text-center py-12 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          No applications yet.
        </div>
      )}

      {pending.length === 0 && decided.length > 0 && (
        <div className="text-center py-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          No pending applications 🎉
        </div>
      )}

      {[...pending, ...decided].map(app => {
        const isLoading = loadingId === app.id;
        const assignedCode = approvedCodes[app.id];
        return (
          <div
            key={app.id}
            className="rounded-[12px] px-5 py-4"
            style={{
              background: app.status === "new" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              opacity: app.status === "new" ? 1 : 0.55,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-white">{app.full_name}</span>
                  {app.status === "approved" && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}
                    >
                      ✓ Approved — {assignedCode ?? app.affiliate_code ?? "—"}
                    </span>
                  )}
                  {app.status === "rejected" && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(224,69,98,0.12)", color: "#e04562" }}
                    >
                      ✗ Rejected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span>📧 {app.email}</span>
                  <span>📍 {app.city}</span>
                  {app.platform && <span>📱 {app.platform}</span>}
                  {app.audience_size && <span>👥 {app.audience_size}</span>}
                  <span>📅 {formatDate(app.created_at)}</span>
                  {app.has_referred && <span>✅ Prior referrals</span>}
                  {app.organization && <span>🏛 {app.organization}</span>}
                </div>
                {app.motivation && (
                  <p className="mt-2 text-xs italic line-clamp-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    &ldquo;{app.motivation}&rdquo;
                  </p>
                )}
                {app.profile_link && (
                  <a
                    href={app.profile_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-xs underline block"
                    style={{ color: "rgba(252,183,48,0.6)" }}
                  >
                    {app.profile_link}
                  </a>
                )}
              </div>

              {app.status === "new" && (
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleApprove(app)}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", opacity: isLoading ? 0.6 : 1 }}
                    onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = "rgba(34,197,94,0.25)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.15)"; }}
                  >
                    {isLoading ? "…" : "✓ Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(app.id)}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", opacity: isLoading ? 0.6 : 1 }}
                    onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.background = "rgba(224,69,98,0.12)"; e.currentTarget.style.color = "#e04562"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    {isLoading ? "…" : "✗ Reject"}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
