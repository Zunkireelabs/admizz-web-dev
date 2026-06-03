"use client";

import type { ActivityEvent } from "@/lib/affiliate/types";

interface Props {
  events: ActivityEvent[];
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now  = Date.now();
  const diff = Math.max(0, now - then);
  const s = Math.floor(diff / 1000);
  if (s < 60)    return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)    return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)    return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7)     return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const STATUS_DOT: Record<string, string> = {
  pending:   "#F59E0B",
  converted: "#0EA5E9",
  paid:      "#16A34A",
};

export default function ActivityTimelineCard({ events }: Props) {
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
          <h3 className="text-[15px] font-bold" style={{ color: "#001353" }}>Recent activity</h3>
          <p className="text-[12px] mt-0.5" style={{ color: "#64748B" }}>
            Every click and registration on your link, newest first
          </p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-[40px] mb-2">⏳</div>
          <p className="text-[13px]" style={{ color: "#64748B" }}>No activity yet — share your link to start tracking.</p>
        </div>
      ) : (
        <ol className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {events.map(ev => {
            const isClick = ev.kind === "click";
            const dot     = isClick ? "#31429C" : (STATUS_DOT[ev.status ?? "pending"] ?? "#64748B");
            return (
              <li key={ev.id} className="flex gap-3">
                <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: dot, boxShadow: `0 0 0 3px ${dot}1A` }} />
                </div>

                <div className="flex-1 min-w-0 pb-2.5" style={{ borderBottom: "1px solid #F1F5F9" }}>
                  {isClick ? (
                    <>
                      <p className="text-[13px] font-semibold" style={{ color: "#1E293B" }}>
                        Link clicked
                        <span className="font-normal" style={{ color: "#64748B" }}>
                          {" "}— landed on <code className="text-[12px] px-1 py-0.5 rounded" style={{ background: "#F1F5F9" }}>{ev.landing_page}</code>
                        </span>
                      </p>
                      {(ev.utm_source || ev.referrer) && (
                        <p className="text-[11px] mt-0.5" style={{ color: "#94A3B8" }}>
                          {ev.utm_source ? `via ${ev.utm_source}` : `from ${ev.referrer}`}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] font-semibold" style={{ color: "#1E293B" }}>
                        <span style={{ color: "#16A34A" }}>{ev.student_display}</span> registered
                        <span className="font-normal" style={{ color: "#64748B" }}>
                          {" "}for {ev.flag_emoji} {ev.destination}
                        </span>
                      </p>
                      <p className="text-[11px] mt-0.5 flex items-center gap-1.5" style={{ color: "#94A3B8" }}>
                        <span>{ev.stage}</span>
                        <span>·</span>
                        <span style={{ color: dot, fontWeight: 600 }}>
                          {ev.status === "pending" ? "Pending verification" : ev.status}
                        </span>
                      </p>
                    </>
                  )}
                  <p className="text-[11px] mt-0.5" style={{ color: "#94A3B8" }}>{formatRelative(ev.at)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
