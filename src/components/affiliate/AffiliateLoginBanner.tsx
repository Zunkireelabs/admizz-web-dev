"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AffiliateLoginBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
      style={{
        background: "rgba(0,8,30,0.96)",
        borderBottom: "1px solid rgba(252,183,48,0.2)",
        backdropFilter: "blur(12px)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-base leading-none select-none" aria-hidden="true">🔐</span>
          <div>
            <span className="text-sm font-bold text-white">Already an Admizz Affiliate?</span>
            <span className="hidden sm:inline text-sm ml-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              Track your earnings, referrals, and tier progress.
            </span>
          </div>
        </div>
        <Link
          href="/affiliate-dashboard"
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap"
          style={{ background: "#FDED22", color: "#001353" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#FCB730"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#FDED22"; }}
        >
          Open Dashboard
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
