"use client";

import { useEffect, useMemo, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import { loadStoredPredictions } from "@/lib/wc2026/predictions";
import { formatKickoff } from "@/lib/wc2026/format";
import type { MatchWithTeams } from "@/lib/wc2026/types";
import MatchScoreboard from "../shared/MatchScoreboard";
import InlinePredict from "./InlinePredict";

type NodeState = "predicted" | "active" | "locked";

export default function MatchOfTheDay() {
  const { predictable24h, nextMatch, liveMatches, now, loading } = useLive();
  const [storedPreds, setStoredPreds] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setStoredPreds(loadStoredPredictions());
  }, [predictable24h.map((m) => m.id).join(",")]);

  const refreshStored = () => setStoredPreds(loadStoredPredictions());

  const queue = predictable24h;

  // Active = first un-predicted match in the queue. Matches that kicked off
  // already drop out of `predictable24h` automatically, so this also handles
  // auto-advance on missed kickoffs.
  const activeIndex = useMemo(
    () => queue.findIndex((m) => !storedPreds[m.id]),
    [queue, storedPreds],
  );
  const activeMatch = activeIndex >= 0 ? queue[activeIndex] : null;
  const allPredicted = queue.length > 0 && activeIndex === -1;

  // While ESPN data hasn't loaded yet, render a skeleton so we never show
  // stale seed content. LiveProvider flips `loading: false` once ESPN
  // responds (or after a 3s ESPN-down fallback).
  if (loading) {
    return (
      <section className="wc-section wc-section--compact" id="match" style={{ background: "var(--wc-bg-alt)" }}>
        <div className="wc-section-inner">
          <div className="wc-section-header">
            <div className="wc-section-title-block">
              <span className="wc-section-eyebrow wc-section-eyebrow--gold">Match of the Day</span>
              <h2 className="wc-section-title">Loading live schedule…</h2>
              <p className="wc-section-lede">Pulling the next 24 hours of fixtures.</p>
            </div>
          </div>
          <div className="wc-motd-skeleton" aria-hidden="true">
            <div className="wc-motd-skeleton-hero" />
            <div className="wc-motd-skeleton-roadmap">
              <div className="wc-motd-skeleton-node" />
              <div className="wc-motd-skeleton-node" />
              <div className="wc-motd-skeleton-node" />
              <div className="wc-motd-skeleton-node" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty 24h window — fall back to whatever is "happening" so the section
  // never goes blank. If a match is live, show it. Otherwise rest-day card.
  if (queue.length === 0) {
    const fallback = liveMatches[0] ?? nextMatch;
    return (
      <section className="wc-section wc-section--compact" id="match" style={{ background: "var(--wc-bg-alt)" }}>
        <div className="wc-section-inner">
          <div className="wc-section-header">
            <div className="wc-section-title-block">
              <span className="wc-section-eyebrow wc-section-eyebrow--gold">Match of the Day</span>
              <h2 className="wc-section-title">
                {fallback ? (fallback.score?.status === "LIVE" || fallback.score?.status === "HT" ? "Happening Now" : "Schedule resumes soon") : "Tournament Complete"}
              </h2>
              <p className="wc-section-lede">
                {fallback
                  ? "No prediction window open right now — check back when the next kickoff is within 24 hours."
                  : "Thanks for playing through World Cup 2026."}
              </p>
            </div>
          </div>
          {fallback && <MatchScoreboard match={fallback}>{null}</MatchScoreboard>}
        </div>
      </section>
    );
  }

  const scrollToHero = () => {
    document.getElementById("wc-motd-hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="wc-section wc-section--compact" id="match" style={{ background: "var(--wc-bg-alt)" }}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow wc-section-eyebrow--gold">Match of the Day</span>
            <h2 className="wc-section-title">
              {allPredicted ? "You called every match" : "Up Next"}
            </h2>
            <p className="wc-section-lede">
              {allPredicted
                ? "Every match in the next 24 hours is locked in. New fixtures unlock tomorrow."
                : `Predict the next ${queue.length} ${queue.length === 1 ? "match" : "matches"} kicking off in the next 24 hours — one at a time.`}
            </p>
          </div>
        </div>

        {/* Hero: active match (or congrats card when all predicted) */}
        <div id="wc-motd-hero">
          {activeMatch ? (
            <MatchScoreboard match={activeMatch}>
              <InlinePredict
                match={activeMatch}
                now={now}
                onPredicted={refreshStored}
              />
            </MatchScoreboard>
          ) : (
            <div className="wc-motd-complete">
              <div className="wc-motd-complete-eyebrow">✅ All locked in</div>
              <h3 className="wc-motd-complete-title">You&apos;ve predicted every match in the next 24 hours.</h3>
              <p className="wc-motd-complete-lede">
                Track your calls in the Predictors&apos; Circle — and come back tomorrow when new fixtures unlock.
              </p>
            </div>
          )}
        </div>

        {/* Roadmap: horizontal scroll-snap row showing the full 24h queue */}
        <div className="wc-motd-roadmap" aria-label="Next 24 hours prediction queue">
          <div className="wc-motd-roadmap-header">
            <span className="wc-motd-roadmap-title">Next 24 hours</span>
            <span className="wc-motd-roadmap-progress">
              {queue.filter((m) => storedPreds[m.id]).length} / {queue.length} predicted
            </span>
          </div>
          <div className="wc-motd-roadmap-track" role="list">
            {queue.map((m, i) => {
              const state: NodeState = storedPreds[m.id]
                ? "predicted"
                : i === activeIndex
                  ? "active"
                  : "locked";
              return (
                <RoadmapNode
                  key={m.id}
                  match={m}
                  index={i + 1}
                  state={state}
                  onClick={state === "active" ? scrollToHero : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapNode({
  match,
  index,
  state,
  onClick,
}: {
  match: MatchWithTeams;
  index: number;
  state: NodeState;
  onClick?: () => void;
}) {
  const kickoff = formatKickoff(match.kickoffISO);
  const aCode = match.teamAData.code || match.teamAData.shortName || match.teamAData.name.slice(0, 3).toUpperCase();
  const bCode = match.teamBData.code || match.teamBData.shortName || match.teamBData.name.slice(0, 3).toUpperCase();

  const stateLabel =
    state === "predicted" ? "Predicted" : state === "active" ? "Predict now" : `Locked — predict Match ${index - 1} first`;

  const interactive = !!onClick;
  const Tag = (interactive ? "button" : "div") as "button" | "div";

  return (
    <Tag
      type={interactive ? "button" : undefined}
      role="listitem"
      className={`wc-motd-node wc-motd-node--${state}`}
      onClick={onClick}
      aria-label={`Match ${index}: ${match.teamAData.name} vs ${match.teamBData.name}. ${stateLabel}`}
      disabled={interactive ? false : undefined}
    >
      <span className="wc-motd-node-badge">
        {state === "predicted" ? "✓" : state === "active" ? index : "🔒"}
      </span>
      <span className="wc-motd-node-teams">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={match.teamAData.flag} alt="" className="wc-motd-node-flag" />
        <span className="wc-motd-node-code">{aCode}</span>
        <span className="wc-motd-node-vs">v</span>
        <span className="wc-motd-node-code">{bCode}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={match.teamBData.flag} alt="" className="wc-motd-node-flag" />
      </span>
      <span className="wc-motd-node-time">{kickoff.day} · {kickoff.time}</span>
      <span className="wc-motd-node-state">{state === "predicted" ? "✓ Predicted" : state === "active" ? "Predict now" : "Locked"}</span>
    </Tag>
  );
}
