"use client";

import type { MatchWithTeams, PredictionChoice, PredictionStats, StoredPrediction } from "./types";

const STORAGE_KEY = "wc26-predictions";

export function loadStoredPredictions(): Record<string, StoredPrediction> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function savePrediction(
  matchId: string,
  prediction: PredictionChoice,
  matchLabel: string,
): void {
  if (typeof window === "undefined") return;
  try {
    const current = loadStoredPredictions();
    current[matchId] = {
      matchId,
      prediction,
      submittedAt: new Date().toISOString(),
      matchLabel,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* noop */
  }
}

export function resolvePrediction(
  prediction: PredictionChoice,
  scoreA: number,
  scoreB: number,
): "correct" | "incorrect" {
  let actual: PredictionChoice;
  if (scoreA > scoreB) actual = "team_a";
  else if (scoreA < scoreB) actual = "team_b";
  else actual = "draw";
  return prediction === actual ? "correct" : "incorrect";
}

export function computeStats(
  predictions: Record<string, StoredPrediction>,
  matches: MatchWithTeams[],
): PredictionStats {
  const matchMap = new Map(matches.map((m) => [m.id, m]));
  const entries = Object.values(predictions).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );

  let correct = 0;
  let incorrect = 0;
  let resolved = 0;

  // For streak: walk most recent resolved predictions in chronological order
  const resolvedOutcomes: ("correct" | "incorrect")[] = [];

  for (const e of entries) {
    const m = matchMap.get(e.matchId);
    if (!m || !m.score || m.score.status !== "FT") continue;
    const outcome = resolvePrediction(e.prediction, m.score.a, m.score.b);
    resolved++;
    if (outcome === "correct") correct++;
    else incorrect++;
    resolvedOutcomes.push(outcome);
  }

  const total = entries.length;
  const pending = total - resolved;
  const accuracy = resolved > 0 ? Math.round((correct / resolved) * 100) : 0;

  let streak = 0;
  for (const o of resolvedOutcomes) {
    if (o === "correct") streak++;
    else break;
  }

  let bestStreak = 0;
  let running = 0;
  for (const o of resolvedOutcomes.reverse()) {
    if (o === "correct") {
      running++;
      if (running > bestStreak) bestStreak = running;
    } else {
      running = 0;
    }
  }

  const achievements: string[] = [];
  if (total >= 1) achievements.push("first-pick");
  if (total >= 5) achievements.push("five-picks");
  if (total >= 10) achievements.push("ten-picks");
  if (bestStreak >= 3) achievements.push("hot-streak");
  if (bestStreak >= 5) achievements.push("on-fire");
  if (accuracy >= 75 && resolved >= 4) achievements.push("sharp-eye");

  return { total, resolved, correct, incorrect, pending, accuracy, streak, bestStreak, achievements };
}

export function getRecentHistory(
  predictions: Record<string, StoredPrediction>,
  matches: MatchWithTeams[],
  limit = 5,
): Array<StoredPrediction & { match?: MatchWithTeams; outcome?: "correct" | "incorrect" | "pending" }> {
  const matchMap = new Map(matches.map((m) => [m.id, m]));
  return Object.values(predictions)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, limit)
    .map((p) => {
      const m = matchMap.get(p.matchId);
      let outcome: "correct" | "incorrect" | "pending" = "pending";
      if (m?.score?.status === "FT") {
        outcome = resolvePrediction(p.prediction, m.score.a, m.score.b);
      }
      return { ...p, match: m, outcome };
    });
}
