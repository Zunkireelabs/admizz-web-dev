import type { MatchWithTeams, MatchStatus, Score, Team } from "../types";

const URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260720&limit=200";

const TTL_MS = 60_000;
let cache: { data: MatchWithTeams[]; at: number } | null = null;
let inflight: Promise<MatchWithTeams[]> | null = null;

interface EspnCompetitor {
  homeAway: "home" | "away";
  score: string;
  form?: string;
  team: {
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    name: string;
    logo?: string;
    color?: string;
  };
}

interface EspnEvent {
  id: string;
  date: string;
  name: string;
  shortName: string;
  season?: { year?: number; type?: number; slug?: string };
  competitions: Array<{
    id: string;
    date: string;
    status: {
      clock: number;
      displayClock: string;
      type: { state: "pre" | "in" | "post"; name: string; completed: boolean; description: string };
    };
    venue?: { fullName?: string; address?: { city?: string; country?: string } };
    competitors: EspnCompetitor[];
    notes?: Array<{ type?: string; headline?: string }>;
  }>;
}

function mapStatus(state: string, name: string): MatchStatus {
  // Known ESPN states: "pre" (scheduled), "in" (live), "post" (finished).
  // Anything else (postponed, cancelled, delayed) is treated as upcoming so
  // the match still appears in the schedule rather than being misclassified as live.
  if (state === "pre") return "UPCOMING";
  if (state === "post") return "FT";
  if (state === "in") {
    if (name.includes("HALFTIME") || name === "STATUS_HALFTIME") return "HT";
    return "LIVE";
  }
  return "UPCOMING";
}

function mapRound(headline?: string, seasonSlug?: string): string {
  // Primary: parse headline from competition notes
  if (headline) {
    const h = headline.toLowerCase();
    if (h.includes("final") && !h.includes("semi") && !h.includes("quarter") && !h.includes("third")) return "Final";
    if (h.includes("third") || h.includes("3rd")) return "Third Place";
    if (h.includes("semi")) return "Semi-final";
    if (h.includes("quarter")) return "Quarter-final";
    if (h.includes("round of 16")) return "Round of 16";
    if (h.includes("round of 32")) return "Round of 32";
  }
  // Fallback: ESPN omits notes for knockout rounds but sets event.season.slug
  if (seasonSlug) {
    const s = seasonSlug.toLowerCase();
    if (s === "final") return "Final";
    if (s.includes("third") || s.includes("3rd")) return "Third Place";
    if (s.includes("semi")) return "Semi-final";
    if (s.includes("quarter")) return "Quarter-final";
    if (s.includes("round-of-16") || s.includes("round of 16")) return "Round of 16";
    if (s.includes("round-of-32") || s.includes("round of 32")) return "Round of 32";
  }
  return "Group Stage";
}

function mapGroup(headline: string | undefined, round: string): string {
  if (round !== "Group Stage") return round;
  if (!headline) return "—";
  const m = headline.match(/Group\s+([A-L])/i);
  return m ? m[1].toUpperCase() : "—";
}

function parseForm(form: string | undefined): ("W" | "D" | "L")[] {
  if (!form) return [];
  return form.split("").filter((c) => c === "W" || c === "D" || c === "L") as ("W" | "D" | "L")[];
}

function team(c: EspnCompetitor): Team {
  return {
    code: c.team.abbreviation,
    name: c.team.displayName,
    shortName: c.team.shortDisplayName || c.team.abbreviation,
    flag: c.team.logo || "🏳️",
    form: parseForm(c.form),
  };
}

function mapEvent(e: EspnEvent, idx: number): MatchWithTeams | null {
  const comp = e.competitions?.[0];
  if (!comp?.competitors || comp.competitors.length < 2) return null;
  const home = comp.competitors.find((c) => c.homeAway === "home") ?? comp.competitors[0];
  const away = comp.competitors.find((c) => c.homeAway === "away") ?? comp.competitors[1];
  const status = mapStatus(comp.status.type.state, comp.status.type.name);
  const minute =
    status === "LIVE" || status === "HT"
      ? Number.isFinite(comp.status.clock)
        ? Math.min(120, Math.round(Number(comp.status.clock) / 60))
        : parseInt(comp.status.displayClock.replace(/[^\d]/g, ""), 10) || 0
      : undefined;
  const score: Score | null =
    status === "UPCOMING"
      ? null
      : { a: parseInt(home.score || "0", 10), b: parseInt(away.score || "0", 10), minute, status };
  const round = mapRound(comp.notes?.[0]?.headline, e.season?.slug);
  return {
    id: `espn-${e.id}`,
    group: mapGroup(comp.notes?.[0]?.headline, round),
    round,
    teamA: home.team.abbreviation,
    teamB: away.team.abbreviation,
    stadium: comp.venue?.fullName ?? "TBD",
    city: comp.venue?.address?.city ?? "",
    kickoffISO: e.date,
    matchNumber: idx + 1,
    teamAData: team(home),
    teamBData: team(away),
    score,
  };
}

export async function fetchMatches(force = false): Promise<MatchWithTeams[]> {
  const now = Date.now();
  if (!force && cache && now - cache.at < TTL_MS) return cache.data;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch(URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`ESPN ${res.status}`);
      const data = await res.json();
      const events: EspnEvent[] = data.events ?? [];
      const out = events
        .map((e, i) => mapEvent(e, i))
        .filter((m): m is MatchWithTeams => m !== null)
        .sort((a, b) => new Date(a.kickoffISO).getTime() - new Date(b.kickoffISO).getTime());
      cache = { data: out, at: Date.now() };
      return out;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}
