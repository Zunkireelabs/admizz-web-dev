"use client";

import { useLive } from "@/lib/wc2026/LiveProvider";
import type { TopScorer } from "@/lib/wc2026/types";
import Flag from "../shared/Flag";
import { ArrowRightIcon, FootballIcon, TrophyIcon } from "../shared/Icons";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function FeaturedLeader({ s }: { s: TopScorer }) {
  return (
    <div className="wc-gb-featured">
      <div className="wc-gb-featured-bg" aria-hidden="true" />
      <div className="wc-gb-featured-glow" aria-hidden="true" />

      <div className="wc-gb-featured-content">
        <div className="wc-gb-featured-top">
          <span className="wc-gb-featured-eyebrow">
            <TrophyIcon size={14} strokeWidth={2} /> Tournament Leader
          </span>
          <div className="wc-gb-featured-flag">
            <Flag src={s.countryFlag} fitParent />
          </div>
        </div>

        <div className="wc-gb-featured-rank">01</div>

        <div className="wc-gb-featured-info">
          <div className="wc-gb-featured-name">{s.name}</div>
          <div className="wc-gb-featured-team">{s.team}</div>
        </div>

        <div className="wc-gb-featured-stats">
          <div className="wc-gb-featured-goal">
            <div className="wc-gb-featured-goal-num">{s.goals}</div>
            <div className="wc-gb-featured-goal-label">Goals</div>
          </div>
          <div className="wc-gb-featured-divider" />
          <div className="wc-gb-featured-secondary">
            <div>
              <div className="wc-gb-stat-val">{s.assists}</div>
              <div className="wc-gb-stat-lbl">Assists</div>
            </div>
            <div>
              <div className="wc-gb-stat-val">{s.minutes}</div>
              <div className="wc-gb-stat-lbl">Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({ s }: { s: TopScorer }) {
  return (
    <div className="wc-gb-row">
      <div className="wc-gb-row-rank">{String(s.rank).padStart(2, "0")}</div>
      <div className="wc-gb-row-avatar">
        <span>{initials(s.name)}</span>
      </div>
      <div className="wc-gb-row-info">
        <div className="wc-gb-row-name">{s.name}</div>
        <div className="wc-gb-row-meta">
          <div className="wc-gb-row-flag">
            <Flag src={s.countryFlag} fitParent />
          </div>
          <span>{s.team}</span>
        </div>
      </div>
      <div className="wc-gb-row-stats">
        <div className="wc-gb-row-stat">
          <FootballIcon size={12} strokeWidth={1.8} />
          <span className="wc-mono">{s.goals}</span>
        </div>
        <div className="wc-gb-row-stat wc-gb-row-stat--muted">
          <span className="wc-gb-row-stat-lbl">A</span>
          <span className="wc-mono">{s.assists}</span>
        </div>
      </div>
      <ArrowRightIcon size={14} className="wc-gb-row-arrow" strokeWidth={1.8} />
    </div>
  );
}

export default function GoldenBoot() {
  const { topScorers, pulse } = useLive();
  const tournamentStarted = pulse.matchesPlayed > 0;

  const leader = topScorers[0];
  const rest = topScorers.slice(1, 8);

  return (
    <section className="wc-section" id="scorers">
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow">Golden Boot Race</span>
            <h2 className="wc-section-title">
              The Hunt for <span className="wc-section-title-accent">Gold.</span>
            </h2>
            <p className="wc-section-lede">
              {tournamentStarted
                ? "Top scorers through the group stage and beyond."
                : "Pre-tournament favourites. The race begins June 11."}
            </p>
          </div>
        </div>

        <div className="wc-gb-layout">
          {leader && <FeaturedLeader s={leader} />}
          <div className="wc-gb-list">
            {rest.map((s) => (
              <LeaderboardRow key={`${s.rank}-${s.name}`} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
