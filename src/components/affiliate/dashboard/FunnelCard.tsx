"use client";

import { Fragment } from "react";

interface Props {
  clicks: number;
  registrations: number;
  conversions: number;
}

function pct(num: number, den: number): string {
  if (den === 0) return "—";
  return `${Math.round((num / den) * 100)}%`;
}

export default function FunnelCard({ clicks, registrations, conversions }: Props) {
  const stages = [
    { label: "Clicks",        value: clicks,        sub: "Visited your link",       color: "#31429C" },
    { label: "Registrations", value: registrations, sub: "Completed the form",      color: "#0EA5E9" },
    { label: "Conversions",   value: conversions,   sub: "Progressed past consult", color: "#16A34A" },
  ];

  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold" style={{ color: "#001353" }}>Referral Funnel</h3>
          <p className="text-[12px] mt-0.5" style={{ color: "#64748B" }}>
            How visitors move from your link to enrollment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch">
        {stages.map((s, i) => (
          <Fragment key={s.label}>
            <div
              className="rounded-xl px-4 py-3.5 md:col-span-1"
              style={{ background: "#F8F9FC", border: "1px solid #EAECF0" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] font-bold uppercase" style={{ color: "#64748B", letterSpacing: "0.06em" }}>
                  {s.label}
                </span>
              </div>
              <div className="text-[24px] font-extrabold leading-none" style={{ color: "#001353" }}>
                {s.value.toLocaleString()}
              </div>
              <div className="text-[11px] mt-1.5" style={{ color: "#64748B" }}>{s.sub}</div>
            </div>

            {i < stages.length - 1 && (
              <div className="hidden md:flex flex-col items-center justify-center md:col-span-1">
                <div className="text-[11px] font-bold uppercase mb-1" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>
                  {i === 0 ? "Reg. rate" : "Conv. rate"}
                </div>
                <div className="text-[18px] font-extrabold" style={{ color: "#31429C" }}>
                  {i === 0 ? pct(registrations, clicks) : pct(conversions, registrations)}
                </div>
                <svg className="w-6 h-6 mt-1" fill="none" stroke="#CBD5E1" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
