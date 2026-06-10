"use client";

import { useLive } from "@/lib/wc2026/LiveProvider";
import { useTimezone } from "@/lib/wc2026/TimezoneProvider";
import { formatKickoff, isSameLocalDay } from "@/lib/wc2026/format";
import type { MatchWithTeams } from "@/lib/wc2026/types";
import Flag from "../shared/Flag";
import TimezonePicker from "../shared/TimezonePicker";

function MatchCard({ m, tz, abbrev }: { m: MatchWithTeams; tz: string; abbrev: string }) {
  const { time } = formatKickoff(m.kickoffISO, tz);
  const status = m.score?.status ?? "UPCOMING";
  const live = status === "LIVE" || status === "HT";
  const timeNoAbbrev = time.replace(` ${abbrev}`, "");

  return (
    <a href="#match" className="wc-schedule-card">
      <div className="wc-schedule-card-top">
        <span className="wc-schedule-card-round">
          {m.round === "Group Stage" && m.group !== "—" ? `GROUP ${m.group}` : m.round}
        </span>
        {live ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--wc-live)", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700 }}>
            <span className="wc-pulse-dot" /> {m.score?.minute ?? 0}&apos;
          </span>
        ) : status === "FT" ? (
          <span style={{ fontSize: 10, color: "var(--wc-text-dim)", letterSpacing: "0.2em", fontWeight: 700 }}>FT</span>
        ) : (
          <span className="wc-schedule-card-time">{timeNoAbbrev}</span>
        )}
      </div>
      <div className="wc-schedule-card-teams">
        <div className="wc-schedule-card-team">
          <div className="wc-schedule-card-flag"><Flag src={m.teamAData.flag} fitParent /></div>
          <span className="wc-schedule-card-team-name">{m.teamAData.name}</span>
          <span className="wc-schedule-card-team-score">
            {m.score && (live || status === "FT") ? m.score.a : ""}
          </span>
        </div>
        <div className="wc-schedule-card-team">
          <div className="wc-schedule-card-flag"><Flag src={m.teamBData.flag} fitParent /></div>
          <span className="wc-schedule-card-team-name">{m.teamBData.name}</span>
          <span className="wc-schedule-card-team-score">
            {m.score && (live || status === "FT") ? m.score.b : ""}
          </span>
        </div>
      </div>
      <div className="wc-schedule-card-venue">{m.stadium}{m.city ? ` · ${m.city}` : ""}</div>
    </a>
  );
}

export default function TodaySchedule() {
  const { matches, now } = useLive();
  const { tz, abbrev } = useTimezone();

  const today = new Date(now);
  const tomorrow = new Date(now + 24 * 60 * 60 * 1000);

  const todayMatches = matches.filter((m) => isSameLocalDay(m.kickoffISO, today, tz));
  const tomorrowMatches = matches.filter((m) => isSameLocalDay(m.kickoffISO, tomorrow, tz));
  const futureMatches = matches
    .filter((m) => new Date(m.kickoffISO).getTime() > tomorrow.getTime() + 24 * 60 * 60 * 1000)
    .filter((m) => m.score?.status !== "FT")
    .slice(0, 12);

  const sections: { label: string; items: MatchWithTeams[] }[] = [
    { label: "Today", items: todayMatches },
    { label: "Tomorrow", items: tomorrowMatches },
    { label: "This Week", items: futureMatches },
  ].filter((s) => s.items.length > 0);

  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="wc-section" id="schedule" style={{ background: "var(--wc-surface-1)" }}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow">Schedule</span>
            <h2 className="wc-section-title">
              Every Match. <span className="wc-section-title-accent">Your Time.</span>
            </h2>
            <p className="wc-section-lede">
              Kickoffs shown in <strong style={{ color: "var(--wc-text)" }}>{abbrev}</strong>. Change the zone any time — your choice is remembered.
            </p>
          </div>
          <div className="wc-schedule-tz-slot">
            <TimezonePicker />
          </div>
        </div>

        {sections.map((sec) => (
          <div key={sec.label} className="wc-schedule-day">
            <div className="wc-schedule-day-header">
              <h3 className="wc-schedule-day-title">{sec.label}</h3>
              <span className="wc-schedule-day-count">{sec.items.length} matches</span>
            </div>
            <div className="wc-schedule-strip">
              {sec.items.map((m) => (
                <MatchCard key={m.id} m={m} tz={tz} abbrev={abbrev} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
