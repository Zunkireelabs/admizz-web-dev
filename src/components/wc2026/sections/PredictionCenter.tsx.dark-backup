"use client";

import { useEffect, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import { computeStats, getRecentHistory, loadStoredPredictions } from "@/lib/wc2026/predictions";
import type { StoredPrediction } from "@/lib/wc2026/types";
import { CheckIcon, FlameIcon, StarIcon, TrophyIcon } from "../shared/Icons";

const ACHIEVEMENT_DEFS: Record<string, { label: string; icon: React.ReactNode }> = {
  "first-pick": { label: "First Pick", icon: <CheckIcon size={12} strokeWidth={2.5} /> },
  "five-picks": { label: "Five Picks", icon: <StarIcon size={12} strokeWidth={2} /> },
  "ten-picks": { label: "Ten Picks", icon: <StarIcon size={12} strokeWidth={2} /> },
  "hot-streak": { label: "Hot Streak ×3", icon: <FlameIcon size={12} strokeWidth={2} /> },
  "on-fire": { label: "On Fire ×5", icon: <FlameIcon size={12} strokeWidth={2} /> },
  "sharp-eye": { label: "Sharp Eye 75%+", icon: <TrophyIcon size={12} strokeWidth={2} /> },
};

const ALL_ACHIEVEMENTS = Object.keys(ACHIEVEMENT_DEFS);

function AccuracyRing({ value }: { value: number }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg className="wc-pc-ring-svg" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="8" className="wc-pc-ring-bg" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="wc-pc-ring-fg"
      />
    </svg>
  );
}

export default function PredictionCenter() {
  const { matches } = useLive();
  const [stored, setStored] = useState<Record<string, StoredPrediction>>({});

  useEffect(() => {
    setStored(loadStoredPredictions());
  }, []);

  const stats = computeStats(stored, matches);
  const history = getRecentHistory(stored, matches, 5);

  return (
    <section className="wc-section" id="predict" style={{ background: "var(--wc-surface-1)" }}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow">Prediction Center</span>
            <h2 className="wc-section-title">
              Your Tournament. <span className="wc-section-title-accent">Tracked.</span>
            </h2>
            <p className="wc-section-lede">
              Every pick is recorded. Every result auto-resolves. Make your prediction at the top — track your performance here.
            </p>
          </div>
        </div>

        <div className="wc-pc-dashboard">
          <div className="wc-pc-panel">
            <div className="wc-pc-panel-label">Accuracy</div>
            <div className="wc-pc-ring">
              <AccuracyRing value={stats.accuracy} />
              <div className="wc-pc-ring-info">
                <div className="wc-pc-ring-value">{stats.accuracy}%</div>
                <div className="wc-pc-ring-label">
                  {stats.correct} correct of {stats.resolved} resolved
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div className="wc-pc-stat-row">
                <span className="wc-pc-stat-label">Current Streak</span>
                <span className="wc-pc-stat-value wc-pc-stat-value--accent">
                  {stats.streak > 0 && <FlameIcon size={16} strokeWidth={2.2} />} {stats.streak}
                </span>
              </div>
              <div className="wc-pc-stat-row">
                <span className="wc-pc-stat-label">Best Streak</span>
                <span className="wc-pc-stat-value">{stats.bestStreak}</span>
              </div>
              <div className="wc-pc-stat-row">
                <span className="wc-pc-stat-label">Total Predictions</span>
                <span className="wc-pc-stat-value">{stats.total}</span>
              </div>
            </div>
          </div>

          <div className="wc-pc-panel">
            <div className="wc-pc-panel-label">Recent Predictions</div>
            {history.length === 0 ? (
              <div className="wc-pc-empty">
                No predictions yet. Scroll up and pick the next match to begin.
              </div>
            ) : (
              <div className="wc-pc-history">
                {history.map((h) => (
                  <div key={h.matchId + h.submittedAt} className="wc-pc-history-item">
                    <div className={`wc-pc-history-mark wc-pc-history-mark--${h.outcome}`}>
                      {h.outcome === "correct" && <CheckIcon size={12} strokeWidth={3} />}
                      {h.outcome === "incorrect" && "×"}
                      {h.outcome === "pending" && "·"}
                    </div>
                    <div className="wc-pc-history-text">
                      <strong>{h.matchLabel || "Match"}</strong>
                      <br />
                      <span style={{ fontSize: 11, color: "var(--wc-text-faint)" }}>
                        Picked {
                          h.prediction === "draw"
                            ? "Draw"
                            : h.prediction === "team_a"
                              ? (h.match?.teamAData.name ?? (h.matchLabel?.split(" vs ")[0] ?? "home"))
                              : (h.match?.teamBData.name ?? (h.matchLabel?.split(" vs ")[1] ?? "away"))
                        }
                        {h.match?.score?.status === "FT"
                          ? ` · Final ${h.match.score.a}–${h.match.score.b}`
                          : " · Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="wc-pc-panel">
            <div className="wc-pc-panel-label">Achievements</div>
            <div className="wc-pc-achievements">
              {ALL_ACHIEVEMENTS.map((id) => {
                const unlocked = stats.achievements.includes(id);
                const def = ACHIEVEMENT_DEFS[id];
                return (
                  <span
                    key={id}
                    className={`wc-pc-badge ${unlocked ? "wc-pc-badge--unlocked" : ""}`}
                  >
                    {def.icon}
                    {def.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
