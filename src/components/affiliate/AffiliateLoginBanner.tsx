"use client";

import Link from "next/link";

export default function AffiliateLoginBanner() {
  return (
    <div
      style={{
        background: "rgba(0,8,30,0.95)",
        borderBottom: "1px solid rgba(252,183,48,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center md:text-left">
          <span className="text-lg leading-none select-none" aria-hidden="true">🔐</span>
          <div>
            <span className="text-sm font-bold text-white">Already an Admizz Affiliate?</span>
            <span
              className="hidden sm:inline text-sm ml-2"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Track your earnings, referrals, and tier progress in your dashboard.
            </span>
          </div>
        </div>
        <Link
          href="/affiliate-dashboard"
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap"
          style={{
            background: "#FDED22",
            color: "#001353",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#FCB730";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#FDED22";
          }}
        >
          Open Dashboard
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
