"use client";

import { loadStoredPredictions } from "@/lib/wc2026/predictions";
import { useEffect, useState } from "react";

const API_URL =
  "https://edgex.zunkireelabs.com/api/public/campaigns/a7935815-dd45-4f8b-ae24-720a15dcee4b/leaderboard";

interface Standing {
  rank: number;
  name: string;
  correct: number;
  scored: number;
  pct: number;
}

interface LeaderboardData {
  campaign: { name: string; status: string };
  updated_at: string;
  standings: Standing[];
}

type PodiumTone = "gold" | "silver" | "bronze";

function Avatar({ name, size = 44, tone }: { name: string; size?: number; tone?: PodiumTone }) {
  const initials = name
    .replace(/\./g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`wc-lb-avatar${tone ? ` wc-lb-avatar--${tone}` : ""}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden
    >
      <span className="wc-lb-avatar-initials">{initials}</span>
      {tone === "gold" && <span className="wc-lb-avatar-ring" />}
    </div>
  );
}

function Medal({ tone }: { tone: PodiumTone }) {
  return (
    <svg
      className={`wc-lb-medal wc-lb-medal--${tone}`}
      width="44"
      height="56"
      viewBox="0 0 44 56"
      fill="none"
      aria-hidden
    >
      {/* Ribbon */}
      <path d="M14 4 L22 26 L14 24 L10 28 L10 4 Z" className="wc-lb-medal-ribbon-l" />
      <path d="M30 4 L22 26 L30 24 L34 28 L34 4 Z" className="wc-lb-medal-ribbon-r" />
      {/* Disc shadow */}
      <ellipse cx="22" cy="51" rx="11" ry="2.2" className="wc-lb-medal-shadow" />
      {/* Disc */}
      <circle cx="22" cy="38" r="14" className="wc-lb-medal-disc" />
      <circle cx="22" cy="38" r="11.5" className="wc-lb-medal-disc-inner" />
      {/* Star inset */}
      <path
        d="M22 32.5 L23.6 36 L27.4 36.4 L24.6 38.9 L25.4 42.7 L22 40.8 L18.6 42.7 L19.4 38.9 L16.6 36.4 L20.4 36 Z"
        className="wc-lb-medal-star"
      />
    </svg>
  );
}

function AccuracyBar({ value, tone }: { value: number; tone?: PodiumTone | "neutral" }) {
  return (
    <div className="wc-lb-bar-track">
      <div
        className={`wc-lb-bar-fill wc-lb-bar-fill--${tone ?? "neutral"}`}
        style={{ width: `${Math.max(2, value)}%` }}
      />
    </div>
  );
}

function formatUpdated(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });
  } catch {
    return null;
  }
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userTotal, setUserTotal] = useState(0);

  useEffect(() => {
    const stored = loadStoredPredictions();
    setUserTotal(Object.keys(stored).length);
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("non-200");
        return r.json();
      })
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const scrollToPredict = () => {
    document.getElementById("motd")?.scrollIntoView({ behavior: "smooth" });
  };

  const podiumRaw = data?.standings.slice(0, 3) ?? [];
  // Classic podium order — 2nd left, 1st center, 3rd right. Mobile flips back via CSS order.
  const podium =
    podiumRaw.length === 3
      ? [
          { entry: podiumRaw[1], tone: "silver" as PodiumTone, podiumPos: 2 as const },
          { entry: podiumRaw[0], tone: "gold"   as PodiumTone, podiumPos: 1 as const },
          { entry: podiumRaw[2], tone: "bronze" as PodiumTone, podiumPos: 3 as const },
        ]
      : podiumRaw.map((entry, i) => ({
          entry,
          tone: (["gold", "silver", "bronze"] as PodiumTone[])[i],
          podiumPos: (i + 1) as 1 | 2 | 3,
        }));
  const rest = data?.standings.slice(3, 10) ?? [];

  return (
    <section className="wc-section wc-lb-section" id="leaderboard">
      <div className="wc-lb-bg" aria-hidden />
      <div className="wc-section-inner">

        {/* Header */}
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow wc-section-eyebrow--red">Predict &amp; Win Campaign</span>
            <h2 className="wc-section-title">
              Campaign <span className="wc-lb-title-accent">Leaderboard</span>
            </h2>
            <p className="wc-section-lede">
              Top predictors ranked by accuracy. Every correct pick moves you up — prizes awarded to the best at the end of the tournament.
            </p>
          </div>
          <div className="wc-lb-updated">
            <span className="wc-lb-updated-dot" />
            {data ? `Updated ${formatUpdated(data.updated_at)}` : "Live · Updated after each match"}
          </div>
        </div>

        {loading && (
          <div className="wc-lb-loading">
            <div className="wc-lb-spinner" />
            <span>Loading leaderboard…</span>
          </div>
        )}

        {error && (
          <div className="wc-lb-error">
            Could not load leaderboard right now. Check back after the next match.
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* ── Podium ── */}
            <div className="wc-lb-podium">
              {podium.map(({ entry: p, tone, podiumPos }) => {
                const placeLabel = podiumPos === 1 ? "1st place" : podiumPos === 2 ? "2nd place" : "3rd place";
                return (
                  <div
                    key={p.rank}
                    className={`wc-lb-podium-card wc-lb-podium-card--${tone}`}
                  >
                    <div className="wc-lb-podium-top">
                      <Medal tone={tone} />
                    </div>
                    <span className={`wc-lb-podium-place wc-lb-podium-place--${tone}`}>{placeLabel}</span>
                    <Avatar name={p.name} size={tone === "gold" ? 64 : 54} tone={tone} />
                    <div className="wc-lb-podium-name">{p.name}</div>
                    <div className={`wc-lb-podium-accuracy wc-lb-podium-accuracy--${tone}`}>
                      {p.pct}<span className="wc-lb-podium-pct">%</span>
                    </div>
                    <div className="wc-lb-podium-statline">
                      <span className="wc-lb-podium-stat">
                        <span className="wc-lb-podium-stat-num">{p.correct}</span>
                        <span className="wc-lb-podium-stat-label">Correct</span>
                      </span>
                      <span className="wc-lb-podium-stat-divider" />
                      <span className="wc-lb-podium-stat">
                        <span className="wc-lb-podium-stat-num">{p.scored}</span>
                        <span className="wc-lb-podium-stat-label">Picks</span>
                      </span>
                    </div>
                    <AccuracyBar value={p.pct} tone={tone} />
                  </div>
                );
              })}
            </div>

            {/* ── Rankings list ── */}
            <div className="wc-lb-table">
              <div className="wc-lb-table-header">
                <span className="wc-lb-th wc-lb-th--rank">#</span>
                <span className="wc-lb-th wc-lb-th--player">Player</span>
                <span className="wc-lb-th wc-lb-th--picks">Picks</span>
                <span className="wc-lb-th wc-lb-th--accuracy">Accuracy</span>
              </div>
              {rest.map((p) => (
                <div key={p.rank} className="wc-lb-row">
                  <span className="wc-lb-rank">{String(p.rank).padStart(2, "0")}</span>
                  <span className="wc-lb-player">
                    <Avatar name={p.name} size={32} />
                    <span className="wc-lb-player-name">{p.name}</span>
                  </span>
                  <span className="wc-lb-picks">
                    {p.correct}<span className="wc-lb-picks-of">/{p.scored}</span>
                  </span>
                  <span className="wc-lb-accuracy-cell">
                    <span className="wc-lb-accuracy-num">{p.pct}%</span>
                    <AccuracyBar value={p.pct} tone="neutral" />
                  </span>
                </div>
              ))}
            </div>

            {data.standings.length > 0 && (
              <div className="wc-lb-count">
                {data.standings.length} participants · showing top 10
              </div>
            )}
          </>
        )}

        {/* ── Your rank strip ── */}
        <div className="wc-lb-you">
          <div className="wc-lb-you-left">
            {userTotal > 0 ? (
              <>
                <span className="wc-lb-you-label">Your picks</span>
                <span className="wc-lb-you-value">
                  {userTotal} prediction{userTotal === 1 ? "" : "s"} made · Keep going to climb the board
                </span>
              </>
            ) : (
              <>
                <span className="wc-lb-you-label">Your rank</span>
                <span className="wc-lb-you-value">
                  Not yet on the board — make your first prediction to enter
                </span>
              </>
            )}
          </div>
          <button type="button" className="wc-lb-you-cta" onClick={scrollToPredict}>
            {userTotal > 0 ? "Make another pick" : "Enter the leaderboard"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
