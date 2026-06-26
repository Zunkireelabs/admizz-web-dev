import type { MatchWithTeams, TopScorer } from "../types";

const SUMMARY_URL = (eventId: string) =>
  `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event=${eventId}`;

const REFRESH_TTL_MS = 5 * 60_000;
const STORAGE_KEY = "wc26-scorers-v1";
const STORAGE_TTL_MS = 6 * 60 * 60_000; // restore up to 6 hours old

// Persistent aggregator state (in-memory, lives for the tab lifetime)
interface PlayerAgg {
  name: string;
  teamId: string;
  teamName: string;
  goals: number;
  assists: number;
}

interface StoredCache {
  scorers: TopScorer[];
  processedIds: string[];
  goals: [string, PlayerAgg][];
  savedAt: number;
}

const goalsByPlayerId = new Map<string, PlayerAgg>();
const processedMatchIds = new Set<string>();
let cachedTopScorers: TopScorer[] | null = null;
let lastRefreshAt = 0;
let inflight: Promise<TopScorer[]> | null = null;
let storageRestored = false;

// Restore aggregator state from localStorage so repeat visitors skip re-fetching
// all FT match summaries. Only runs once per tab; safe-guarded against SSR.
function ensureStorageRestored() {
  if (storageRestored || typeof window === "undefined") return;
  storageRestored = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const stored: StoredCache = JSON.parse(raw);
    if (Date.now() - stored.savedAt > STORAGE_TTL_MS) return;
    stored.processedIds.forEach((id) => processedMatchIds.add(id));
    stored.goals.forEach(([id, agg]) => goalsByPlayerId.set(id, agg));
    cachedTopScorers = stored.scorers;
    lastRefreshAt = stored.savedAt;
  } catch {
    // corrupt storage — ignore, will re-fetch
  }
}

function persistToStorage() {
  if (typeof window === "undefined") return;
  try {
    const stored: StoredCache = {
      scorers: cachedTopScorers ?? [],
      processedIds: Array.from(processedMatchIds),
      goals: Array.from(goalsByPlayerId.entries()),
      savedAt: lastRefreshAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // storage full or blocked — ignore
  }
}

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
    // FT match summaries never change — use browser default caching so ESPN's
    // CDN cache headers are respected and repeat fetches are served locally.
    const res = await fetch(SUMMARY_URL(espnId));
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
  concurrency = 8,
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
  // Restore persisted aggregator state on first call (skips re-fetching already-seen matches)
  ensureStorageRestored();

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
      persistToStorage();
      return ranked;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
