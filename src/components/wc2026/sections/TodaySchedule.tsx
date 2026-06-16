"use client";

import { useMemo, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import { useTimezone } from "@/lib/wc2026/TimezoneProvider";
import { formatKickoff, isSameLocalDay } from "@/lib/wc2026/format";
import type { MatchWithTeams } from "@/lib/wc2026/types";
import Flag from "../shared/Flag";
import TimezonePicker from "../shared/TimezonePicker";

function MatchCard({ m, tz, abbrev }: { m: MatchWithTeams; tz: string; abbrev: string }) {
  const { time, day } = formatKickoff(m.kickoffISO, tz);
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
          <span className="wc-schedule-card-time">{day} · {timeNoAbbrev}</span>
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

function GroupRow({ m, tz, abbrev }: { m: MatchWithTeams; tz: string; abbrev: string }) {
  const { time, day } = formatKickoff(m.kickoffISO, tz);
  const status = m.score?.status ?? "UPCOMING";
  const live = status === "LIVE" || status === "HT";
  const ft = status === "FT";
  const timeNoAbbrev = time.replace(` ${abbrev}`, "");

  return (
    <a href="#match" className="wc-group-row">
      <div className="wc-group-row-when">
        <span className="wc-group-row-day">{day}</span>
        {live ? (
          <span className="wc-group-row-live"><span className="wc-pulse-dot" /> {m.score?.minute ?? 0}&apos;</span>
        ) : ft ? (
          <span className="wc-group-row-ft">FT</span>
        ) : (
          <span className="wc-group-row-time">{timeNoAbbrev}</span>
        )}
      </div>
      <div className="wc-group-row-teams">
        <span className="wc-group-row-team">
          <span className="wc-group-row-flag"><Flag src={m.teamAData.flag} fitParent /></span>
          <span className="wc-group-row-name">{m.teamAData.shortName || m.teamAData.name}</span>
        </span>
        {ft || live ? (
          <span className="wc-group-row-score">
            {m.score?.a ?? 0}–{m.score?.b ?? 0}
          </span>
        ) : (
          <span className="wc-group-row-vs">vs</span>
        )}
        <span className="wc-group-row-team wc-group-row-team--away">
          <span className="wc-group-row-name">{m.teamBData.shortName || m.teamBData.name}</span>
          <span className="wc-group-row-flag"><Flag src={m.teamBData.flag} fitParent /></span>
        </span>
      </div>
    </a>
  );
}

const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export default function TodaySchedule() {
  const { matches, now } = useLive();
  const { tz, abbrev } = useTimezone();

  const today = new Date(now);
  const tomorrow = new Date(now + 24 * 60 * 60 * 1000);

  const todayMatches = matches.filter((m) => isSameLocalDay(m.kickoffISO, today, tz));
  const tomorrowMatches = matches.filter((m) => isSameLocalDay(m.kickoffISO, tomorrow, tz));

  const dailySections: { label: string; items: MatchWithTeams[] }[] = [
    { label: "Today", items: todayMatches },
    { label: "Tomorrow", items: tomorrowMatches },
  ].filter((s) => s.items.length > 0);

  // All group-stage matches grouped by Group letter, chronologically within each group
  const groupSections = useMemo(
    () =>
      GROUP_LETTERS.map((letter) => ({
        letter,
        items: matches
          .filter((m) => m.round === "Group Stage" && m.group === letter)
          .sort((a, b) => new Date(a.kickoffISO).getTime() - new Date(b.kickoffISO).getTime()),
      })).filter((g) => g.items.length > 0),
    [matches]
  );

  const [activeGroup, setActiveGroup] = useState<string>(
    groupSections[0]?.letter ?? "A"
  );

  if (dailySections.length === 0 && groupSections.length === 0) {
    return null;
  }

  return (
    <section className="wc-section" id="schedule" style={{ background: "var(--wc-surface-1)" }}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow wc-section-eyebrow--navy">Schedule</span>
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

        {dailySections.map((sec) => (
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

        {groupSections.length > 0 && (
          <>
            <div className="wc-schedule-all-header">
              <h3 className="wc-schedule-day-title">All Group Matches</h3>
              <span className="wc-schedule-day-count">
                {groupSections.reduce((sum, g) => sum + g.items.length, 0)} matches · {groupSections.length} groups
              </span>
            </div>

            <div className="wc-group-mobile-tabs" role="tablist" aria-label="Group selector">
              {groupSections.map((g) => (
                <button
                  key={g.letter}
                  type="button"
                  role="tab"
                  aria-selected={activeGroup === g.letter}
                  className={`wc-group-mobile-tab${activeGroup === g.letter ? " wc-group-mobile-tab--active" : ""}`}
                  onClick={() => setActiveGroup(g.letter)}
                >
                  {g.letter}
                </button>
              ))}
            </div>

            <div className="wc-group-scroll-area">
              <div className="wc-group-grid">
                {groupSections.map((g) => (
                  <div
                    key={g.letter}
                    className="wc-group-card"
                    data-group={g.letter}
                    data-active={activeGroup === g.letter ? "true" : "false"}
                  >
                    <div className="wc-group-card-header">
                      <h3 className="wc-group-card-title">Group {g.letter}</h3>
                      <span className="wc-group-card-count">{g.items.length} matches</span>
                    </div>
                    <div className="wc-group-card-rows">
                      {g.items.map((m) => (
                        <GroupRow key={m.id} m={m} tz={tz} abbrev={abbrev} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
