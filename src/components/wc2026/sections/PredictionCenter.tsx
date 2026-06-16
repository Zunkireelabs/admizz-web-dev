"use client";

import { useEffect, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import { computeStats, getRecentHistory, loadStoredPredictions } from "@/lib/wc2026/predictions";
import type { StoredPrediction } from "@/lib/wc2026/types";
import { CheckIcon, FlameIcon, StarIcon, TrophyIcon } from "../shared/Icons";

const ACHIEVEMENT_DEFS = {
  "first-pick": { label: "First Pick",     icon: <CheckIcon size={13} strokeWidth={2.5} /> },
  "five-picks": { label: "Five Picks",     icon: <StarIcon size={13} strokeWidth={2} /> },
  "ten-picks":  { label: "Ten Picks",      icon: <StarIcon size={13} strokeWidth={2} /> },
  "hot-streak": { label: "Hot Streak ×3",  icon: <FlameIcon size={13} strokeWidth={2} /> },
  "on-fire":    { label: "On Fire ×5",     icon: <FlameIcon size={13} strokeWidth={2} /> },
  "sharp-eye":  { label: "Sharp Eye 75%+", icon: <TrophyIcon size={13} strokeWidth={2} /> },
};

const ALL_ACHIEVEMENTS = Object.keys(ACHIEVEMENT_DEFS);

function AccuracyRing({ value }: { value: number }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 70 ? "#22C55E" : value >= 40 ? "#FFCC00" : "#C8102E";
  return (
    <svg className="wc-pc-ring-svg" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="9" className="wc-pc-ring-bg" />
      <circle
        cx="60" cy="60" r={radius}
        fill="none" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset}
        className="wc-pc-ring-fg"
        style={{ stroke: color, filter: `drop-shadow(0 0 10px ${color}99)` }}
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
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

  const scrollToPredict = () => {
    document.getElementById("motd")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="wc-section wc-pc-section" id="predict" style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #001353 60%, #0D1282 100%)" }}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow wc-section-eyebrow--red">Prediction Center</span>
            <h2 className="wc-section-title" style={{ color: "#FFFFFF", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
              Your Tournament.{" "}
              <span style={{ color: "var(--wc-accent)" }}>Tracked.</span>
            </h2>
            <p className="wc-section-lede" style={{ color: "rgba(255,255,255,0.65)" }}>
              Every pick is recorded. Every result auto-resolves. Make your prediction at the top — track your performance here.
            </p>
          </div>
        </div>

        {/* ── Summary bar ── */}
        <div className="wc-pc-summary">
          {[
            { label: "Total Picks",  value: stats.total },
            { label: "Correct",      value: stats.correct },
            { label: "Best Streak",  value: stats.bestStreak },
            { label: "Accuracy",     value: `${stats.accuracy}%` },
          ].map((s) => (
            <div key={s.label} className="wc-pc-summary-stat">
              <div className="wc-pc-summary-value">{s.value}</div>
              <div className="wc-pc-summary-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="wc-pc-dashboard">

          {/* Panel 1: Accuracy + streak */}
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
                <span className={`wc-pc-stat-value ${stats.streak > 0 ? "wc-pc-stat-value--flame" : ""}`}>
                  {stats.streak > 0 && <FlameIcon size={18} strokeWidth={2.2} />}
                  {stats.streak}
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

          {/* Panel 2: Recent history */}
          <div className="wc-pc-panel">
            <div className="wc-pc-panel-label">Recent Predictions</div>
            {history.length === 0 ? (
              <div className="wc-pc-empty">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.25, margin: "0 auto 12px", display: "block" }}>
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
                No predictions yet.<br />Scroll up and pick the next match.
              </div>
            ) : (
              <div className="wc-pc-history">
                {history.map((h) => {
                  const teamName = h.prediction === "draw"
                    ? "Draw"
                    : h.prediction === "team_a"
                      ? (h.match?.teamAData.name ?? h.matchLabel?.split(" vs ")[0] ?? "Home")
                      : (h.match?.teamBData.name ?? h.matchLabel?.split(" vs ")[1] ?? "Away");
                  const teamFlag = h.prediction === "team_a"
                    ? h.match?.teamAData.flag
                    : h.prediction === "team_b"
                      ? h.match?.teamBData.flag
                      : null;
                  const finalScore = h.match?.score?.status === "FT"
                    ? `${h.match.score.a}–${h.match.score.b}`
                    : null;

                  return (
                    <div key={h.matchId + h.submittedAt} className={`wc-pc-history-item wc-pc-history-item--${h.outcome}`}>
                      <div className={`wc-pc-history-mark wc-pc-history-mark--${h.outcome}`}>
                        {h.outcome === "correct"   && <CheckIcon size={13} strokeWidth={3} />}
                        {h.outcome === "incorrect" && "✕"}
                        {h.outcome === "pending"   && "·"}
                      </div>
                      <div className="wc-pc-history-body">
                        <div className="wc-pc-history-match">{h.matchLabel || "Match"}</div>
                        <div className="wc-pc-history-pick">
                          {teamFlag && <img src={teamFlag} alt="" width="14" height="14" className="wc-pc-history-flag" />}
                          <span>Picked {teamName}</span>
                          {finalScore && <span className="wc-pc-history-score">· {finalScore}</span>}
                        </div>
                      </div>
                      {h.outcome === "correct"   && <span className="wc-pc-result-badge wc-pc-result-badge--correct">✓ Correct</span>}
                      {h.outcome === "incorrect" && <span className="wc-pc-result-badge wc-pc-result-badge--incorrect">✕ Wrong</span>}
                      {h.outcome === "pending"   && <span className="wc-pc-result-badge wc-pc-result-badge--pending">Pending</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Panel 3: Achievements */}
          <div className="wc-pc-panel">
            <div className="wc-pc-panel-label">Achievements</div>
            <div className="wc-pc-achievements">
              {ALL_ACHIEVEMENTS.map((id) => {
                const unlocked = stats.achievements.includes(id);
                const def = ACHIEVEMENT_DEFS[id as keyof typeof ACHIEVEMENT_DEFS];
                return (
                  <span key={id} className={`wc-pc-badge ${unlocked ? "wc-pc-badge--unlocked" : "wc-pc-badge--locked"}`}>
                    <span className="wc-pc-badge-icon">{unlocked ? def.icon : <LockIcon />}</span>
                    {def.label}
                  </span>
                );
              })}
            </div>
            <div className="wc-pc-achievements-footer">
              {stats.achievements.length} / {ALL_ACHIEVEMENTS.length} unlocked
            </div>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="wc-pc-cta-strip">
          <p className="wc-pc-cta-text">
            {stats.total === 0
              ? "Make your first prediction — pick the next match winner."
              : `${stats.total} prediction${stats.total === 1 ? "" : "s"} made. Keep going — more picks, more chances to win.`}
          </p>
          <button type="button" onClick={scrollToPredict} className="wc-pc-cta-btn">
            {stats.total === 0 ? "Make your first pick" : "Make your next pick"}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
