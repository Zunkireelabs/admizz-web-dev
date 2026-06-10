import type { GroupStanding, StandingsEntry, Team } from "../types";

const URL = "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings?season=2026";
const TTL_MS = 5 * 60_000;

let cache: { data: GroupStanding[]; at: number } | null = null;
let inflight: Promise<GroupStanding[]> | null = null;

interface EspnStat { name: string; value: number; }
interface EspnEntry {
  team: { id: string; abbreviation: string; displayName: string; shortDisplayName: string; logos?: { href: string }[] };
  stats: EspnStat[];
  note?: { rank?: number; description?: string };
}

function getStat(stats: EspnStat[], name: string): number {
  const s = stats.find((x) => x.name === name);
  return s ? Math.round(s.value) : 0;
}

function mapTeam(t: EspnEntry["team"]): Team {
  return {
    code: t.abbreviation,
    name: t.displayName,
    shortName: t.shortDisplayName || t.abbreviation,
    flag: t.logos?.[0]?.href || "🏳️",
  };
}

function mapEntry(entry: EspnEntry, idx: number): StandingsEntry {
  const stats = entry.stats || [];
  const desc = (entry.note?.description || "").toLowerCase();
  const played = getStat(stats, "gamesPlayed");

  // ESPN classifies WC qualifying notes as:
  //   "Advance to Round of 32"   → top 2 in group (qualified)
  //   "Best 8 advance"           → best 3rd-place teams (best-third pool)
  //   "Eliminated"               → out
  // Suppress markers until the team has actually played — ESPN's pre-tournament
  // notes seed every team with "advance"-like text, which would light up every row.
  const isBestThird = played > 0 && (desc.includes("best 8") || desc.includes("best third"));
  const isQualified =
    played > 0 && !isBestThird && (desc.includes("round of 32") || desc.includes("advance"));

  return {
    team: mapTeam(entry.team),
    played,
    wins: getStat(stats, "wins"),
    draws: getStat(stats, "ties"),
    losses: getStat(stats, "losses"),
    goalsFor: getStat(stats, "pointsFor"),
    goalsAgainst: getStat(stats, "pointsAgainst"),
    goalDiff: getStat(stats, "pointDifferential"),
    points: getStat(stats, "points"),
    rank: entry.note?.rank ?? idx + 1,
    qualified: isQualified,
    bestThird: isBestThird,
  };
}

export async function fetchStandings(force = false): Promise<GroupStanding[]> {
  const now = Date.now();
  if (!force && cache && now - cache.at < TTL_MS) return cache.data;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch(URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`ESPN standings ${res.status}`);
      const data = await res.json();
      const groups: GroupStanding[] = (data.children || []).map((g: { name?: string; standings?: { entries?: EspnEntry[] } }) => {
        const groupLabel = (g.name || "").replace(/^Group\s*/i, "").trim() || "?";
        const entries = (g.standings?.entries || []).map(mapEntry);
        return { group: groupLabel, entries };
      });
      cache = { data: groups, at: Date.now() };
      return groups;
    } catch {
      return [];
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}
