"use client";

import { useLive } from "@/lib/wc2026/LiveProvider";
import MatchScoreboard from "../shared/MatchScoreboard";
import InlinePredict from "./InlinePredict";

export default function MatchOfTheDay() {
  const { nextMatch, now } = useLive();

  if (!nextMatch) {
    return (
      <section className="wc-section wc-section--compact" id="match">
        <div className="wc-section-inner">
          <div className="wc-section-header">
            <div className="wc-section-title-block">
              <span className="wc-section-eyebrow">Match of the Day</span>
              <h2 className="wc-section-title">Tournament Complete</h2>
              <p className="wc-section-lede">Thanks for playing through World Cup 2026.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const status = nextMatch.score?.status ?? "UPCOMING";
  const isLive = status === "LIVE" || status === "HT";
  const isFt = status === "FT";

  return (
    <section className="wc-section wc-section--compact" id="match">
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow">Match of the Day</span>
            <h2 className="wc-section-title">
              {isLive ? "Happening Now" : isFt ? "Just Played" : "Up Next"}
            </h2>
            <p className="wc-section-lede">
              Score, clock, form — sourced live. Lock in your prediction below.
            </p>
          </div>
        </div>

        <MatchScoreboard match={nextMatch} />
        <InlinePredict match={nextMatch} now={now} />
      </div>
    </section>
  );
}
