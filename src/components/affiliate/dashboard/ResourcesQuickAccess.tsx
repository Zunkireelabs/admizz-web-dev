"use client";

import { useState } from "react";

const RESOURCES = [
  {
    title: "Instagram Posts",
    desc: "12 ready-to-use posts with captions and reels",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "WhatsApp Templates",
    desc: "8 conversation starters and follow-ups",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Email Copy",
    desc: "Professional outreach templates",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Banners & Graphics",
    desc: "Stories, posts, and web banners",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Brand Style Guide",
    desc: "Logo usage, palette, voice rules",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Monthly Newsletter",
    desc: "Strategy insights and top performers",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
];

export default function ResourcesQuickAccess() {
  const [toast, setToast] = useState("");

  const handleDownload = (title: string) => {
    setToast(`${title} will be available in your inbox after approval. Your complete marketing toolkit is sent within 48 hours of joining.`);
    setTimeout(() => setToast(""), 4500);
  };

  return (
    <div
      className="rounded-2xl p-6 flex flex-col"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p
            className="text-[12px] font-bold uppercase mb-1"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            Resources
          </p>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: "#001353" }}>
            Marketing Toolkit
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Pre-built assets to help you convert your audience
          </p>
        </div>
        <span
          className="text-[12px] font-bold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(252,183,48,0.1)",
            color: "#b07400",
            border: "1px solid rgba(252,183,48,0.3)",
          }}
        >
          {RESOURCES.length} assets
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
        {RESOURCES.map(r => (
          <button
            key={r.title}
            onClick={() => handleDownload(r.title)}
            className="flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150"
            style={{
              background: "#FFFFFF",
              border: "1px solid #EAECF0",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#FAFAFB";
              e.currentTarget.style.borderColor = "rgba(252,183,48,0.32)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(16,24,40,0.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.borderColor = "#EAECF0";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(252,183,48,0.08)",
                color: "#b07400",
                border: "1px solid rgba(252,183,48,0.2)",
              }}
            >
              {r.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-bold truncate" style={{ color: "#001353" }}>
                {r.title}
              </p>
              <p className="text-[12px]" style={{ color: "#64748B" }}>
                {r.desc}
              </p>
            </div>
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              style={{ color: "#64748B" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {toast && (
        <div
          className="mt-4 px-4 py-3 rounded-xl text-xs text-center flex items-center justify-center gap-2"
          style={{
            background: "rgba(252,183,48,0.08)",
            color: "#b07400",
            border: "1px solid rgba(252,183,48,0.3)",
          }}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}
