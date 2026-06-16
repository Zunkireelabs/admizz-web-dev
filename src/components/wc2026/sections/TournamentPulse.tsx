"use client";

import { useLive } from "@/lib/wc2026/LiveProvider";
import CountUp from "../shared/CountUp";
import { CalendarIcon, ChartIcon, FootballIcon, TrophyIcon } from "../shared/Icons";

export default function TournamentPulse() {
  const { pulse, topScorers } = useLive();
  const top = topScorers[0];

  const matchProgress = (pulse.matchesPlayed / pulse.matchesTotal) * 100;

  return (
    <section className="wc-section wc-section--compact">
      <div className="wc-section-inner">
        <div className="wc-pulse">
          <div className="wc-pulse-card">
            <div className="wc-pulse-icon"><ChartIcon size={20} /></div>
            <div className="wc-pulse-label">Matches Played</div>
            <div className="wc-pulse-value">
              <CountUp value={pulse.matchesPlayed} />
              <span style={{ color: "var(--wc-text-faint)", fontSize: 28 }}>/{pulse.matchesTotal}</span>
            </div>
            <div className="wc-pulse-progress">
              <div className="wc-pulse-progress-fill" style={{ width: `${matchProgress}%` }} />
            </div>
            <div className="wc-pulse-meta">{pulse.matchesPlayed} played · {pulse.matchesTotal - pulse.matchesPlayed} remaining</div>
          </div>

          <div className="wc-pulse-card">
            <div className="wc-pulse-icon"><FootballIcon size={20} /></div>
            <div className="wc-pulse-label">Goals Scored</div>
            <div className="wc-pulse-value"><CountUp value={pulse.goalsScored} /></div>
            <div className="wc-pulse-meta">
              {pulse.matchesPlayed > 0
                ? `${(pulse.goalsScored / pulse.matchesPlayed).toFixed(2)} per match`
                : "Tournament begins June 11"}
            </div>
          </div>

          <div className="wc-pulse-card">
            <div className="wc-pulse-icon"><TrophyIcon size={20} /></div>
            <div className="wc-pulse-label">Top Scorer</div>
            <div className="wc-pulse-value" style={{ fontSize: 28, lineHeight: 1.1 }}>
              {top ? top.name : "TBD"}
            </div>
            <div className="wc-pulse-meta" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              {top ? (
                <>
                  {top.countryFlag && top.countryFlag.startsWith("http") ? (
                    <img
                      src={top.countryFlag}
                      alt=""
                      aria-hidden="true"
                      style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }}
                    />
                  ) : (
                    <span>{top.countryFlag}</span>
                  )}
                  <span>{top.team} · {top.goals} goal{top.goals === 1 ? "" : "s"}</span>
                </>
              ) : (
                "Race begins June 11"
              )}
            </div>
          </div>

          <div className="wc-pulse-card">
            <div className="wc-pulse-icon"><CalendarIcon size={20} /></div>
            <div className="wc-pulse-label">Days to Final</div>
            <div className="wc-pulse-value"><CountUp value={pulse.daysUntilFinal} /></div>
            <div className="wc-pulse-meta">Sunday, 19 July · MetLife Stadium</div>
          </div>
        </div>
      </div>
    </section>
  );
}
