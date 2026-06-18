// Fetches per-match winners from the CRM leaderboard endpoint and joins
// them with ESPN match data to produce the MatchWinner[] shape the
// PredictorsCircle section consumes.

import type { MatchWithTeams } from "../types";
import type { MatchStage, MatchWinner } from "./mockData";

const CRM_URL =
  "https://edgex.zunkireelabs.com/api/public/campaigns/a7935815-dd45-4f8b-ae24-720a15dcee4b/leaderboard";

export interface CrmResult {
  match_label: string;
  score: string | null;
  outcome: "team_a" | "team_b" | "draw" | null;
  status: "scheduled" | "final" | "live";
  winner: string | null;
}

export interface CrmLeaderboardData {
  campaign: { name: string; status: string };
  updated_at: string;
  results: CrmResult[];
  pending_matches: Array<{ match_id: string; match_label: string }>;
}

export async function fetchCrmLeaderboard(): Promise<CrmLeaderboardData | null> {
  try {
    const r = await fetch(CRM_URL, { cache: "no-store" });
    if (!r.ok) return null;
    const json = await r.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function roundToStage(round?: string): MatchStage {
  const r = (round ?? "").toLowerCase();
  if (r.includes("final") && !r.includes("semi") && !r.includes("quarter")) return "final";
  if (r.includes("semi")) return "sf";
  if (r.includes("quarter")) return "qf";
  if (r.includes("round of 16")) return "r16";
  if (r.includes("round of 32")) return "r32";
  return "group";
}

/**
 * Joins CRM results with ESPN matches by match_label.
 * Returns only matches present in both (so we have flags/codes from ESPN
 * AND winner info from CRM). Matches with no winner yet are kept with
 * winner: null so the UI can show its "pending" state.
 */
export function buildMatchWinners(
  crm: CrmLeaderboardData,
  espnMatches: MatchWithTeams[],
): MatchWinner[] {
  // Index ESPN matches by normalized "TeamA vs TeamB" label, both orders.
  const espnByLabel = new Map<string, MatchWithTeams>();
  for (const m of espnMatches) {
    const a = m.teamAData.name;
    const b = m.teamBData.name;
    espnByLabel.set(normalize(`${a}vs${b}`), m);
    espnByLabel.set(normalize(`${b}vs${a}`), m);
  }

  const out: MatchWinner[] = [];
  for (const r of crm.results) {
    const key = normalize(r.match_label.replace(/\s+vs\s+/i, "vs"));
    const espn = espnByLabel.get(key);
    if (!espn) continue; // Skip if we can't join — no flag/code data to render

    out.push({
      match_id: espn.id,
      match_label: r.match_label,
      team_a: {
        code: espn.teamAData.code,
        name: espn.teamAData.name,
        flag: espn.teamAData.flag,
      },
      team_b: {
        code: espn.teamBData.code,
        name: espn.teamBData.name,
        flag: espn.teamBData.flag,
      },
      score: r.score,
      outcome: r.outcome,
      status: r.status,
      kickoff: espn.kickoffISO,
      stage: roundToStage(espn.round),
      winner: r.winner && r.outcome
        ? { name: r.winner, picked: r.outcome }
        : null,
    });
  }

  return out;
}
