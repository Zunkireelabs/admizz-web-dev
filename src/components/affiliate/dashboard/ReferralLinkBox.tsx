"use client";

import { useState } from "react";
import type { MockAffiliate } from "@/data/affiliate/mockData";

interface Props {
  affiliate: MockAffiliate;
}

export default function ReferralLinkBox({ affiliate }: Props) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const url = `https://admizzeducation.com?ref=${affiliate.code}`;

  const copy = (text: string, which: "url" | "code") => {
    navigator.clipboard.writeText(text).catch(() => {});
    if (which === "url") {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      className="rounded-[12px] px-5 py-5 flex flex-col gap-3"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
        Your Referral Link
      </span>

      {/* Code pill */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1"
          style={{ background: "rgba(252,183,48,0.08)", border: "1px solid rgba(252,183,48,0.2)" }}
        >
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Code</span>
          <span className="font-mono font-extrabold tracking-widest text-sm" style={{ color: "#FCB730" }}>
            {affiliate.code}
          </span>
        </div>
        <button
          onClick={() => copy(affiliate.code, "code")}
          className="shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200"
          style={{
            background: copiedCode ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
            color: copiedCode ? "#4ade80" : "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {copiedCode ? "✓" : "Copy code"}
        </button>
      </div>

      {/* Full URL */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="flex-1 text-xs font-mono truncate" style={{ color: "rgba(255,255,255,0.55)" }}>
          {url}
        </span>
        <button
          onClick={() => copy(url, "url")}
          className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
          style={{
            background: copiedUrl ? "rgba(252,183,48,0.25)" : "rgba(252,183,48,0.12)",
            color: "#FCB730",
            border: "1px solid rgba(252,183,48,0.25)",
          }}
        >
          {copiedUrl ? "Copied ✓" : "Copy link"}
        </button>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
        Share on Instagram, WhatsApp, or your bio. Visitors get a 30-day cookie — you earn commission on any conversion.
      </p>
    </div>
  );
}
