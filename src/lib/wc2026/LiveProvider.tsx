"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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
  nextTwoMatches: MatchWithTeams[];
  predictable24h: MatchWithTeams[];
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
  const data = deriveLiveData(seed, [], getTopScorers(false), STABLE_REFERENCE_TIME);
  return { ...data, loading: true };
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
    nextTwoMatches: upcoming.slice(0, 2),
    predictable24h: upcoming.filter((m) => {
      const k = new Date(m.kickoffISO).getTime();
      return k >= now && k <= now + 24 * 60 * 60 * 1000;
    }),
    liveMatches: live,
    upcomingMatches: upcoming,
    recentMatches: recent,
    loading: false,
    now,
  };
}

export function LiveProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LiveData>(initial);
  // Holds the last resolved top-scorers list so we can render matches+standings
  // immediately without waiting for the leaders aggregator to finish.
  const topScorersRef = useRef<TopScorer[]>(getTopScorers(false));

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval> | null = null;
    const seed = getSeedMatches();

    // ESPN-down fallback: after 3s, if we still haven't loaded, drop the
    // skeleton and show seed data so the page never traps the user.
    const fallback = setTimeout(() => {
      if (!active) return;
      setState((s) => (s.loading ? deriveLiveData(seed, [], topScorersRef.current, Date.now()) : s));
    }, 3000);

    const tick = async () => {
      const now = Date.now();
      const [matches, standings] = await Promise.all([
        fetchMatches().catch(() => [] as MatchWithTeams[]),
        fetchStandings().catch(() => [] as GroupStanding[]),
      ]);
      if (!active) return;
      const rawMatches = matches.length > 0 ? matches : seed;

      // ESPN scoreboard doesn't include group letter on matches.
      // Cross-reference standings (group → teams) to enrich each group-stage match.
      const teamToGroup = new Map<string, string>();
      for (const g of standings) {
        for (const e of g.entries) {
          if (e.team.code) teamToGroup.set(e.team.code, g.group);
        }
      }
      const finalMatches = rawMatches.map((m) => {
        if (m.round !== "Group Stage") return m;
        if (m.group && m.group !== "—") return m;
        const ga = teamToGroup.get(m.teamA);
        const gb = teamToGroup.get(m.teamB);
        if (ga && ga === gb) return { ...m, group: ga };
        return m;
      });

      const tournamentStarted = finalMatches.some(
        (m) => m.score?.status === "LIVE" || m.score?.status === "HT" || m.score?.status === "FT",
      );

      // Render matches + standings immediately — don't block on leaders aggregation.
      // topScorersRef.current holds either the last fetched list or the favourites
      // fallback, so the Golden Boot section shows something useful right away.
      setState(deriveLiveData(finalMatches, standings, topScorersRef.current, now));

      // Fetch top scorers non-blocking — updates state again when ready.
      const favourites = getTopScorers(tournamentStarted);
      fetchTopScorers(finalMatches, favourites)
        .catch(() => favourites)
        .then((topScorers) => {
          if (!active) return;
          topScorersRef.current = topScorers;
          setState(deriveLiveData(finalMatches, standings, topScorers, now));
        });
    };

    tick();
    timer = setInterval(tick, 60_000);

    return () => {
      active = false;
      clearTimeout(fallback);
      if (timer) clearInterval(timer);
    };
  }, []);

  return <LiveContext.Provider value={state}>{children}</LiveContext.Provider>;
}
