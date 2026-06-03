"use client";

import type { CountryBreakdownEntry } from "@/lib/affiliate/types";

interface Props {
  breakdown: CountryBreakdownEntry[];
}

export default function CountryBreakdownCard({ breakdown }: Props) {
  const total = breakdown.reduce((sum, e) => sum + e.count, 0);
  const max   = Math.max(1, ...breakdown.map(e => e.count));

  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold" style={{ color: "#001353" }}>Where your students go</h3>
          <p className="text-[12px] mt-0.5" style={{ color: "#64748B" }}>
            Destinations chosen by registrants from your link
          </p>
        </div>
        <span className="text-[11px] font-bold uppercase px-2 py-1 rounded-md" style={{ background: "#F1F5F9", color: "#475569", letterSpacing: "0.06em" }}>
          {total} {total === 1 ? "student" : "students"}
        </span>
      </div>

      {breakdown.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-[40px] mb-2">🌍</div>
          <p className="text-[13px]" style={{ color: "#64748B" }}>No registrations yet — share your link to get started.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {breakdown.map(e => {
            const width = (e.count / max) * 100;
            const share = total > 0 ? Math.round((e.count / total) * 100) : 0;
            return (
              <div key={e.destination} className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-36 flex-shrink-0">
                  <span className="text-[18px] leading-none">{e.flag_emoji}</span>
                  <span className="text-[13px] font-semibold truncate" style={{ color: "#1E293B" }}>{e.destination}</span>
                </div>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${width}%`,
                      background: "linear-gradient(90deg, #31429C, #5B6EE8)",
                    }}
                  />
                </div>
                <div className="w-20 text-right flex-shrink-0">
                  <span className="text-[13px] font-extrabold" style={{ color: "#001353" }}>{e.count}</span>
                  <span className="text-[11px] ml-1.5" style={{ color: "#94A3B8" }}>{share}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
