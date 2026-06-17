"use client";

import { useEffect, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import { loadStoredPredictions } from "@/lib/wc2026/predictions";
import { formatKickoff } from "@/lib/wc2026/format";
import MatchScoreboard from "../shared/MatchScoreboard";
import InlinePredict from "./InlinePredict";
import Flag from "../shared/Flag";

export default function MatchOfTheDay() {
  const { nextMatch, upcomingMatches, now } = useLive();
  const [showSecond, setShowSecond] = useState(false);
  const [storedPreds, setStoredPreds] = useState<Record<string, unknown>>({});

  const match1 = nextMatch;
  // First upcoming that isn't already shown as match1 (handles live match case)
  const match2 = upcomingMatches.find((m) => m.id !== match1?.id) ?? null;

  useEffect(() => {
    setStoredPreds(loadStoredPredictions());
  }, [match1?.id]);

  const refreshStored = () => setStoredPreds(loadStoredPredictions());

  const revealMatch2 = () => {
    setShowSecond(true);
    setTimeout(() => {
      document.getElementById("wc-match2")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  if (!match1) {
    return (
      <section className="wc-section wc-section--compact" id="match">
        <div className="wc-section-inner">
          <div className="wc-section-header">
            <div className="wc-section-title-block">
              <span className="wc-section-eyebrow wc-section-eyebrow--gold">Match of the Day</span>
              <h2 className="wc-section-title">Tournament Complete</h2>
              <p className="wc-section-lede">Thanks for playing through World Cup 2026.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const status1 = match1.score?.status ?? "UPCOMING";
  const isLive1 = status1 === "LIVE" || status1 === "HT";
  const isFt1 = status1 === "FT";
  const match1Predicted = !!storedPreds[match1.id];
  const match2Predicted = match2 ? !!storedPreds[match2.id] : false;
  // Match 1 is "done" for gating purposes once it's predicted OR no longer predictable
  // (live/finished). Otherwise users locked out of Match 1's window can't reach Match 2.
  const match1Closed = isLive1 || isFt1;
  const match1Done = match1Predicted || match1Closed;

  const m2kickoff = match2 ? formatKickoff(match2.kickoffISO) : null;

  return (
    <section className="wc-section wc-section--compact" id="match" style={{ background: "var(--wc-bg-alt)" }}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow wc-section-eyebrow--gold">Match of the Day</span>
            <h2 className="wc-section-title">
              {isLive1 ? "Happening Now" : isFt1 ? "Just Played" : "Up Next"}
            </h2>
            <p className="wc-section-lede">
              Score, clock, form — sourced live. Lock in your prediction below.
            </p>
          </div>
        </div>

        {/* Match 1 — full scoreboard */}
        <MatchScoreboard match={match1}>
          <InlinePredict
            match={match1}
            now={now}
            onPredicted={refreshStored}
            onPredictNext={match2 ? revealMatch2 : undefined}
          />
        </MatchScoreboard>

        {/* Banner — always visible when match2 exists. Locked before match1 predicted, unlocked after. */}
        {match2 && !showSecond && (
          <div className={`wc-motd-next-banner${!match1Done ? " wc-motd-next-banner--locked" : ""}`}>
            <div className="wc-motd-next-banner-left">
              <span className="wc-motd-next-banner-eyebrow">
                {match1Predicted
                  ? "⚽ 1 more match to predict today"
                  : match1Closed
                    ? "⚽ Match 1 in progress — predict the next one"
                    : "🔒 Predict Match 1 first to unlock"}
              </span>
              <span className="wc-motd-next-banner-match">
                {match2.teamAData.name} <span>vs</span> {match2.teamBData.name}
              </span>
              {m2kickoff && (
                <span className="wc-motd-next-banner-time">{m2kickoff.day} · {m2kickoff.time}</span>
              )}
            </div>
            {match1Done && (
              <button type="button" className="wc-motd-next-banner-btn" onClick={revealMatch2}>
                Predict Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Match 2 compact card — revealed on click, never auto-opens */}
        {showSecond && match2 && (
          <div className="wc-motd-second" id="wc-match2">
            <div className="wc-motd-second-divider">
              <span>Next Match</span>
            </div>

            <div className="wc-motd-compact">
              <div className="wc-motd-compact-header">
                <span className="wc-motd-compact-group">
                  {match2.group && match2.group !== "—" ? `Group ${match2.group}` : match2.round}
                </span>
                {m2kickoff && (
                  <span className="wc-motd-compact-time">{m2kickoff.day} · {m2kickoff.time}</span>
                )}
              </div>

              <div className="wc-motd-compact-teams">
                <div className="wc-motd-compact-team">
                  <div className="wc-motd-compact-flag">
                    <Flag src={match2.teamAData.flag} fitParent />
                  </div>
                  <span className="wc-motd-compact-name">{match2.teamAData.name}</span>
                </div>
                <div className="wc-motd-compact-team">
                  <div className="wc-motd-compact-flag">
                    <Flag src={match2.teamBData.flag} fitParent />
                  </div>
                  <span className="wc-motd-compact-name">{match2.teamBData.name}</span>
                </div>
              </div>

              <div className="wc-motd-compact-predict">
                <InlinePredict match={match2} now={now} onPredicted={refreshStored} />
              </div>
            </div>

            {match2.stadium && (
              <p className="wc-motd-compact-venue">
                {match2.stadium}{match2.city ? ` · ${match2.city}` : ""}
              </p>
            )}

            {/* Already predicted state */}
            {match2Predicted && (
              <p className="wc-motd-compact-venue" style={{ marginTop: 6 }}>
                ✅ You&apos;re locked in for this match
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
