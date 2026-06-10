"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchMatches } from "./espn/scoreboard";
import { fetchStandings } from "./espn/standings";
import { fetchTopScorers } from "./espn/leaders";
import { getTopScorers } from "./topScorers";
import { getSeedMatches } from "./seed";
import type { GroupStanding, MatchWithTeams, TopScorer, TournamentPulseData } from "./types";

interface LiveData {
  matches: MatchWithTeams[];
  standings: GroupStanding[];
  topScorers: TopScorer[];
  pulse: TournamentPulseData;
  nextMatch: MatchWithTeams | null;
  liveMatches: MatchWithTeams[];
  upcomingMatches: MatchWithTeams[];
  recentMatches: MatchWithTeams[];
  loading: boolean;
  now: number;
}

const FINAL_ISO = "2026-07-19T17:00:00-04:00";

// Deterministic initial state — uses a fixed reference time so SSR and
// the first client render produce identical HTML (no hydration mismatch).
// `Date.now()` is only consulted inside useEffect after mount.
const STABLE_REFERENCE_TIME = new Date("2026-06-09T00:00:00Z").getTime();

function makeInitial(): LiveData {
  const seed = getSeedMatches();
  return deriveLiveData(seed, [], getTopScorers(false), STABLE_REFERENCE_TIME);
}

const initial: LiveData = makeInitial();

const LiveContext = createContext<LiveData>(initial);

export function useLive(): LiveData {
  return useContext(LiveContext);
}

function deriveLiveData(
  matches: MatchWithTeams[],
  standings: GroupStanding[],
  topScorers: TopScorer[],
  now: number,
): LiveData {
  const live = matches.filter((m) => m.score?.status === "LIVE" || m.score?.status === "HT");
  const upcoming = matches
    .filter((m) => m.score?.status === undefined || m.score?.status === "UPCOMING")
    .sort((a, b) => new Date(a.kickoffISO).getTime() - new Date(b.kickoffISO).getTime());
  const recent = matches
    .filter((m) => m.score?.status === "FT")
    .sort((a, b) => new Date(b.kickoffISO).getTime() - new Date(a.kickoffISO).getTime());

  const matchesPlayed = recent.length;
  const goalsScored = recent.reduce((sum, m) => sum + (m.score ? m.score.a + m.score.b : 0), 0);

  const daysUntilFinal = Math.max(0, Math.ceil((new Date(FINAL_ISO).getTime() - now) / (1000 * 60 * 60 * 24)));

  return {
    matches,
    standings,
    topScorers,
    pulse: {
      matchesPlayed,
      matchesTotal: 104,
      goalsScored,
      topScorer: topScorers[0] ?? null,
      daysUntilFinal,
    },
    nextMatch: live[0] ?? upcoming[0] ?? null,
    liveMatches: live,
    upcomingMatches: upcoming,
    recentMatches: recent,
    loading: false,
    now,
  };
}

export function LiveProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LiveData>(initial);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    // First post-mount tick: snap to real Date.now() with seed data so the
    // live countdowns, "next match" picker etc. all reflect actual time.
    const seed = getSeedMatches();
    setState(deriveLiveData(seed, [], getTopScorers(false), Date.now()));

    const tick = async () => {
      const now = Date.now();
      const [matches, standings] = await Promise.all([
        fetchMatches().catch(() => [] as MatchWithTeams[]),
        fetchStandings().catch(() => [] as GroupStanding[]),
      ]);
      if (!active) return;
      const finalMatches = matches.length > 0 ? matches : seed;
      const tournamentStarted = finalMatches.some(
        (m) => m.score?.status === "LIVE" || m.score?.status === "HT" || m.score?.status === "FT",
      );
      const favourites = getTopScorers(tournamentStarted);
      // Top scorers fetcher has its own 5-min TTL + incremental aggregation.
      // It runs in parallel and either returns the live aggregate or the
      // favourites fallback if the tournament hasn't produced data yet.
      const topScorers = await fetchTopScorers(finalMatches, favourites).catch(() => favourites);
      if (!active) return;
      setState(deriveLiveData(finalMatches, standings, topScorers, now));
    };

    tick();
    timer = setInterval(tick, 60_000);

    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  return <LiveContext.Provider value={state}>{children}</LiveContext.Provider>;
}
