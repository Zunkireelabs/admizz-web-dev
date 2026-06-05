"use client";

import { useState } from "react";
import type { AffiliateApplication } from "@/lib/affiliate/types";
import { approveApplication, rejectApplication } from "@/lib/affiliate/api";

function DetailRow({
  label, value, copyable = false, link, multiline = false, mono = false, className = "",
}: {
  label: string;
  value: string;
  copyable?: boolean;
  link?: string;
  multiline?: boolean;
  mono?: boolean;
  className?: string;
}) {
  const isEmpty = !value || value.trim() === "";
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span
        className="text-[10.5px] font-bold uppercase tracking-widest"
        style={{ color: "#94A3B8" }}
      >
        {label}
      </span>
      {isEmpty ? (
        <span className="text-[13px]" style={{ color: "#CBD5E1", fontStyle: "italic" }}>—</span>
      ) : link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-medium underline break-all"
          style={{ color: "#b07400" }}
        >
          {value}
        </a>
      ) : (
        <div className="flex items-start gap-2">
          <span
            className={`text-[13.5px] ${multiline ? "" : "truncate"} ${mono ? "font-mono" : "font-medium"}`}
            style={{
              color: "#1f2a47",
              whiteSpace: multiline ? "pre-wrap" : "normal",
              wordBreak: "break-word",
            }}
          >
            {value}
          </span>
          {copyable && (
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(value)}
              className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded transition-colors flex-shrink-0"
              style={{ background: "#F1F2F6", color: "#64748B", letterSpacing: "0.06em" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#FCB73022"; e.currentTarget.style.color = "#b07400"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F1F2F6"; e.currentTarget.style.color = "#64748B"; }}
            >
              Copy
            </button>
          )}
        </div>
      )}
    </div>
  );
}

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
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

interface Props {
  initialApplications: AffiliateApplication[];
  onRefresh: () => Promise<void>;
}

export default function ApplicationsTab({ initialApplications, onRefresh }: Props) {
  const [apps, setApps] = useState(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [approvedCodes, setApprovedCodes] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setSuccessMsg(null);
    setTimeout(() => setErrorMsg(null), 8000);
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setErrorMsg(null);
    setTimeout(() => setSuccessMsg(null), 6000);
  };

  const handleApprove = async (app: AffiliateApplication) => {
    setLoadingId(app.id);
    const result = await approveApplication(app);
    if (result.ok) {
      setApps(prev => prev.map(a => a.id === app.id ? { ...a, status: "approved" as const } : a));
      setApprovedCodes(prev => ({ ...prev, [app.id]: result.data.code }));
      showSuccess(`Approved ${app.full_name} — referral code: ${result.data.code}`);
    } else {
      showError(`Approval failed for ${app.full_name}: ${result.error}`);
    }
    setLoadingId(null);
    await onRefresh();
  };

  const handleReject = async (id: string, name: string) => {
    setLoadingId(id);
    const result = await rejectApplication(id);
    if (result.ok) {
      setApps(prev => prev.map(a => a.id === id ? { ...a, status: "rejected" as const } : a));
      showSuccess(`Rejected ${name}`);
    } else {
      showError(`Reject failed: ${result.error}`);
    }
    setLoadingId(null);
    await onRefresh();
  };

  const pending = apps.filter(a => a.status === "new");
  const decided = apps.filter(a => a.status !== "new");

  return (
    <div className="space-y-4">
      {/* Toast strip */}
      {(errorMsg || successMsg) && (
        <div
          className="rounded-xl px-4 py-3 flex items-start gap-3 text-sm"
          style={
            errorMsg
              ? { background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.25)", color: "#b91d3f" }
              : { background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", color: "#15803d" }
          }
        >
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            {errorMsg ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            )}
          </svg>
          <span className="flex-1 leading-snug font-medium">{errorMsg ?? successMsg}</span>
          <button
            onClick={() => { setErrorMsg(null); setSuccessMsg(null); }}
            className="text-xs opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Section header */}
      {pending.length > 0 && (
        <div className="mb-2">
          <p
            className="text-[12px] font-bold uppercase mb-1"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            Pending Review
          </p>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
            {pending.length} {pending.length === 1 ? "application" : "applications"} awaiting your decision
          </h3>
        </div>
      )}

      {pending.length === 0 && decided.length === 0 && (
        <div
          className="rounded-2xl p-16 flex flex-col items-center justify-center text-center"
          style={{ background: "#FFFFFF", border: "1px solid #EAECF0" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{ background: "#F1F2F6", color: "#64748B" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-sm font-semibold" style={{ color: "#001353" }}>No applications yet</p>
          <p className="text-xs mt-1 max-w-xs" style={{ color: "#64748B" }}>
            Applications submitted through the public affiliate page will appear here for review.
          </p>
        </div>
      )}

      {pending.length === 0 && decided.length > 0 && (
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3 text-sm"
          style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", color: "#15803d" }}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold">All caught up · No pending applications</span>
        </div>
      )}

      {[...pending, ...decided].map(app => {
        const isLoading = loadingId === app.id;
        const assignedCode = approvedCodes[app.id];
        const isPending = app.status === "new";
        const isExpanded = expandedId === app.id;
        return (
          <div
            key={app.id}
            className="rounded-2xl px-5 py-5 transition-all duration-200 cursor-pointer"
            style={{
              background: "#FFFFFF",
              border: isPending ? "1px solid #EAECF0" : "1px solid #F1F2F6",
              boxShadow: isPending ? "0 1px 3px rgba(16,24,40,0.04)" : "none",
              opacity: isPending ? 1 : 0.7,
            }}
            onClick={() => setExpandedId(isExpanded ? null : app.id)}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Name + status */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <svg
                    className="w-4 h-4 transition-transform duration-200"
                    style={{ color: "#94A3B8", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-bold text-base" style={{ color: "#001353" }}>{app.full_name}</span>
                  {app.status === "approved" && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(34,197,94,0.08)", color: "#15803d", border: "1px solid rgba(34,197,94,0.3)" }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Approved · {assignedCode ?? app.affiliate_code ?? "—"}
                    </span>
                  )}
                  {app.status === "rejected" && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(220,38,38,0.06)", color: "#b91d3f", border: "1px solid rgba(220,38,38,0.22)" }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Rejected
                    </span>
                  )}
                </div>

                {/* Metadata grid */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px]" style={{ color: "#475569" }}>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {app.email}
                  </span>
                  {app.city && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {app.city}
                    </span>
                  )}
                  {app.platform && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {app.platform}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Applied {formatRelativeDate(app.created_at)}
                  </span>
                  {app.has_referred && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold"
                      style={{ background: "rgba(34,197,94,0.1)", color: "#15803d", border: "1px solid rgba(34,197,94,0.25)" }}
                    >
                      Prior experience
                    </span>
                  )}
                  {app.organization && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {app.organization}
                    </span>
                  )}
                </div>

                {/* Motivation quote */}
                {app.motivation && (
                  <div
                    className="mt-3 px-3.5 py-2.5 rounded-lg text-[12.5px] leading-relaxed border-l-2"
                    style={{
                      background: "#FAFAFB",
                      borderColor: "#FCB730",
                      color: "#475569",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{app.motivation}&rdquo;
                  </div>
                )}

                {/* Profile link */}
                {app.profile_link && (
                  <a
                    href={app.profile_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold underline"
                    style={{ color: "#b07400" }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    View profile
                  </a>
                )}
              </div>

              {/* Action buttons */}
              {isPending && (
                <div className="flex gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => handleApprove(app)}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    style={{
                      background: "#16a34a",
                      color: "#FFFFFF",
                      boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
                      opacity: isLoading ? 0.6 : 1,
                    }}
                    onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.background = "#15803d"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(22,163,74,0.35)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(22,163,74,0.25)"; }}
                  >
                    {isLoading ? (
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isLoading ? "Approving" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(app.id, app.full_name)}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    style={{
                      background: "#FFFFFF",
                      color: "#475569",
                      border: "1px solid #EAECF0",
                      opacity: isLoading ? 0.6 : 1,
                    }}
                    onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.background = "rgba(220,38,38,0.06)"; e.currentTarget.style.color = "#b91d3f"; e.currentTarget.style.borderColor = "rgba(220,38,38,0.3)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "#EAECF0"; }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              )}
            </div>

            {/* Expanded detail panel */}
            {isExpanded && (
              <div
                className="mt-4 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[13px]"
                style={{ borderTop: "1px solid #EAECF0", color: "#1f2a47" }}
                onClick={e => e.stopPropagation()}
              >
                <DetailRow label="Full name" value={app.full_name} />
                <DetailRow label="Email" value={app.email} copyable />
                <DetailRow label="Phone" value={app.phone} copyable />
                <DetailRow label="City" value={app.city} />
                <DetailRow label="Institution / Organization" value={app.organization} />
                <DetailRow label="Promotion method" value={app.promotion_method} />
                <DetailRow label="Platform" value={app.platform} />
                <DetailRow label="Audience size" value={app.audience_size} />
                <DetailRow label="Prior referral experience" value={app.has_referred ? "Yes" : "No"} />
                <DetailRow label="Affiliate code (referrer)" value={app.affiliate_code ?? ""} mono />
                <DetailRow label="Application status" value={app.status} />
                <DetailRow label="Submitted at" value={new Date(app.created_at).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })} />
                <DetailRow label="Profile link" value={app.profile_link} link={app.profile_link} className="sm:col-span-2" />
                <DetailRow label="Motivation (full)" value={app.motivation} multiline className="sm:col-span-2" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
