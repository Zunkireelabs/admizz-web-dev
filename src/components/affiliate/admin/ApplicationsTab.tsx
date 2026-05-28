"use client";

import { useState } from "react";
import type { MockApplication } from "@/data/affiliate/mockData";
import { approveApplication, rejectApplication, generateAffiliateCode } from "@/lib/affiliate/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

interface Props {
  initialApplications: MockApplication[];
}

export default function ApplicationsTab({ initialApplications }: Props) {
  const [apps, setApps] = useState(initialApplications);

  const handleApprove = async (id: string) => {
    await approveApplication(id);
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: "approved" as const } : a));
  };

  const handleReject = async (id: string) => {
    await rejectApplication(id);
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: "rejected" as const } : a));
  };

  const pending = apps.filter(a => a.status === "pending");
  const decided = apps.filter(a => a.status !== "pending");

  return (
    <div className="space-y-4">
      {pending.length === 0 && (
        <div className="text-center py-12 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          No pending applications 🎉
        </div>
      )}

      {[...pending, ...decided].map(app => (
        <div
          key={app.id}
          className="rounded-[12px] px-5 py-4"
          style={{
            background: app.status === "pending" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            opacity: app.status === "pending" ? 1 : 0.5,
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-white">{app.fullName}</span>
                {app.status !== "pending" && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: app.status === "approved" ? "rgba(34,197,94,0.15)" : "rgba(224,69,98,0.12)",
                      color: app.status === "approved" ? "#4ade80" : "#e04562",
                    }}
                  >
                    {app.status === "approved" ? `✓ Approved — ${generateAffiliateCode(app.fullName)}` : "✗ Rejected"}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span>📧 {app.email}</span>
                <span>📍 {app.city}</span>
                <span>📱 {app.platform}</span>
                <span>👥 {app.audienceSize}</span>
                <span>📅 {formatDate(app.appliedAt)}</span>
                {app.hasReferred && <span>✅ Prior referrals</span>}
              </div>
              {app.motivation && (
                <p className="mt-2 text-xs italic line-clamp-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                  &ldquo;{app.motivation}&rdquo;
                </p>
              )}
            </div>

            {app.status === "pending" && (
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleApprove(app.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.15)"; }}
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleReject(app.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(224,69,98,0.12)"; e.currentTarget.style.color = "#e04562"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  ✗ Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
