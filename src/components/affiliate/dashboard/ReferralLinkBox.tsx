"use client";

import { useState } from "react";
import type { Affiliate } from "@/lib/affiliate/types";

interface Props {
  affiliate: Affiliate;
}

export default function ReferralLinkBox({ affiliate }: Props) {
  const [copied, setCopied] = useState<"link" | "code" | null>(null);

  const baseUrl = "https://admizzeducation.com";
  const referralUrl = `${baseUrl}/register?ref=${affiliate.referral_code}`;

  const copy = (type: "link" | "code") => {
    const text = type === "link" ? referralUrl : affiliate.referral_code;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "rgba(13,25,80,0.6)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
      }}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Your Referral Link
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          Share this link — every student who registers through it is attributed to you.
        </p>
      </div>

      {/* Referral URL */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <span className="flex-1 text-xs font-mono truncate" style={{ color: "rgba(255,255,255,0.7)" }}>
          {referralUrl}
        </span>
        <button
          onClick={() => copy("link")}
          className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: copied === "link" ? "rgba(34,197,94,0.2)" : "rgba(252,183,48,0.15)",
            color: copied === "link" ? "#4ade80" : "#FCB730",
          }}
        >
          {copied === "link" ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          Your referral code
        </p>
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: "rgba(252,183,48,0.08)", border: "1px solid rgba(252,183,48,0.3)" }}
        >
          <span className="font-mono text-base font-extrabold tracking-widest" style={{ color: "#FCB730" }}>
            {affiliate.referral_code}
          </span>
          <button
            onClick={() => copy("code")}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: copied === "code" ? "rgba(34,197,94,0.2)" : "rgba(252,183,48,0.15)",
              color: copied === "code" ? "#4ade80" : "#FCB730",
            }}
          >
            {copied === "code" ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      {/* WhatsApp share */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`Hey! Apply for study abroad through Admizz Education and get expert guidance. Use my referral link: ${referralUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all"
        style={{ background: "rgba(37,211,102,0.12)", color: "#25D366", border: "1px solid rgba(37,211,102,0.25)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.2)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.12)"; }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Share on WhatsApp
      </a>
    </div>
  );
}
