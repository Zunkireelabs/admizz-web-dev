import type { MatchWithTeams, TopScorer } from "../types";

const SUMMARY_URL = (eventId: string) =>
  `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event=${eventId}`;

const REFRESH_TTL_MS = 5 * 60_000;

// Persistent aggregator state (in-memory, lives for the tab lifetime)
interface PlayerAgg {
  name: string;
  teamId: string;
  teamName: string;
  goals: number;
  assists: number;
}

const goalsByPlayerId = new Map<string, PlayerAgg>();
const processedMatchIds = new Set<string>();
let cachedTopScorers: TopScorer[] | null = null;
let lastRefreshAt = 0;
let inflight: Promise<TopScorer[]> | null = null;

interface EspnGoalEvent {
  scoringPlay: boolean;
  shootout?: boolean;
  type?: { type?: string };
  team?: { id?: string; displayName?: string };
  participants?: Array<{ athlete?: { id?: string; displayName?: string } }>;
}

interface SummaryResponse {
  keyEvents?: EspnGoalEvent[];
}

function extractEspnId(matchId: string): string {
  return matchId.startsWith("espn-") ? matchId.slice(5) : matchId;
}

async function fetchMatchGoals(matchId: string): Promise<EspnGoalEvent[]> {
  const espnId = extractEspnId(matchId);
  try {
    const res = await fetch(SUMMARY_URL(espnId), { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as SummaryResponse;
    // Exclude shootout goals — penalty shootout strikes don't count toward
    // tournament goal stats. ESPN flags these with shootout: true.
    return (data.keyEvents || []).filter(
      (e) => e.scoringPlay && e.type?.type === "goal" && !e.shootout,
    );
  } catch {
    return [];
  }
}

function aggregateGoals(events: EspnGoalEvent[]) {
  for (const e of events) {
    const scorer = e.participants?.[0]?.athlete;
    const assister = e.participants?.[1]?.athlete;
    const team = e.team;

    if (scorer?.id && scorer.displayName) {
      const existing = goalsByPlayerId.get(scorer.id) ?? {
        name: scorer.displayName,
        teamId: team?.id ?? "",
        teamName: team?.displayName ?? "",
        goals: 0,
        assists: 0,
      };
      existing.goals++;
      goalsByPlayerId.set(scorer.id, existing);
    }

    if (assister?.id && assister.displayName) {
      const existing = goalsByPlayerId.get(assister.id) ?? {
        name: assister.displayName,
        teamId: team?.id ?? "",
        teamName: team?.displayName ?? "",
        goals: 0,
        assists: 0,
      };
      existing.assists++;
      goalsByPlayerId.set(assister.id, existing);
    }
  }
}

interface TeamInfo {
  code: string;
  flagUrl: string;
}

function buildTeamMap(matches: MatchWithTeams[]): Map<string, TeamInfo> {
  // ESPN IDs aren't on our Team type, so we map team name → flag URL + code
  // (ESPN summary `team.displayName` matches our `teamAData.name`)
  const byName = new Map<string, TeamInfo>();
  for (const m of matches) {
    byName.set(m.teamAData.name, { code: m.teamAData.code, flagUrl: m.teamAData.flag });
    byName.set(m.teamBData.name, { code: m.teamBData.code, flagUrl: m.teamBData.flag });
  }
  return byName;
}

// Concurrency-limited parallel fetch
async function fetchInBatches<T, R>(
  items: T[],
  worker: (item: T) => Promise<R>,
  concurrency = 4,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const settled = await Promise.all(batch.map(worker));
    results.push(...settled);
  }
  return results;
}

export async function fetchTopScorers(
  matches: MatchWithTeams[],
  fallback: TopScorer[],
): Promise<TopScorer[]> {
  const now = Date.now();

  // Serve from cache while fresh
  if (cachedTopScorers && now - lastRefreshAt < REFRESH_TTL_MS) {
    return cachedTopScorers;
  }
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const ftMatches = matches.filter((m) => m.score?.status === "FT");
      const newMatches = ftMatches.filter((m) => !processedMatchIds.has(m.id));

      if (newMatches.length > 0) {
        const results = await fetchInBatches(
          newMatches,
          (m) => fetchMatchGoals(m.id),
          4,
        );
        results.forEach((events, idx) => {
          aggregateGoals(events);
          processedMatchIds.add(newMatches[idx].id);
        });
      }

      // If nothing aggregated yet (tournament hasn't started, or no goals
      // observed), return the favourites fallback unchanged.
      if (goalsByPlayerId.size === 0) {
        cachedTopScorers = fallback;
        lastRefreshAt = now;
        return fallback;
      }

      const teamMap = buildTeamMap(matches);

      const ranked: TopScorer[] = Array.from(goalsByPlayerId.values())
        .sort((a, b) => b.goals - a.goals || b.assists - a.assists)
        .slice(0, 10)
        .map((p, i) => {
          const info = teamMap.get(p.teamName);
          return {
            rank: i + 1,
            name: p.name,
            team: info?.code ?? p.teamName,
            countryFlag: info?.flagUrl ?? "🏳️",
            goals: p.goals,
            assists: p.assists,
            minutes: 0,
          };
        });

      cachedTopScorers = ranked;
      lastRefreshAt = now;
      return ranked;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
