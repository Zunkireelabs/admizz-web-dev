import type { BracketSlot, MatchWithTeams, Team } from "./types";

const ROUND_ORDER: Record<string, BracketSlot["round"]> = {
  "Round of 32": "R32",
  "Round of 16": "R16",
  "Quarter-final": "QF",
  "Semi-final": "SF",
  "Third Place": "3RD",
  "Final": "F",
};

const ROUND_COUNT: Record<BracketSlot["round"], number> = {
  R32: 16,
  R16: 8,
  QF: 4,
  SF: 2,
  "3RD": 1,
  F: 1,
};

// Structured FIFA WC 2026 knockout placeholders for the Round of 32.
// These give every empty slot a meaningful label like "Winner Group A · 1st"
// so the bracket feels alive before any matches are played.
const R32_PLACEHOLDERS: Array<[string, string]> = [
  ["Winner A", "Runner-up B"],
  ["Winner C", "Runner-up D"],
  ["Winner E", "Runner-up F"],
  ["Winner G", "Runner-up H"],
  ["Winner B", "Runner-up A"],
  ["Winner D", "Runner-up C"],
  ["Winner F", "Runner-up E"],
  ["Winner H", "Runner-up G"],
  ["Winner I", "Runner-up J"],
  ["Winner K", "Runner-up L"],
  ["Best 3rd · 1", "Runner-up I"],
  ["Best 3rd · 2", "Runner-up K"],
  ["Winner J", "Runner-up I"],
  ["Winner L", "Runner-up K"],
  ["Best 3rd · 3", "Best 3rd · 5"],
  ["Best 3rd · 4", "Best 3rd · 6"],
];

const ROUND_PLACEHOLDERS: Record<BracketSlot["round"], Array<[string, string]>> = {
  R32: R32_PLACEHOLDERS,
  R16: Array.from({ length: 8 }, (_, i) => [
    `Winner R32 · ${i * 2 + 1}`,
    `Winner R32 · ${i * 2 + 2}`,
  ] as [string, string]),
  QF: Array.from({ length: 4 }, (_, i) => [
    `Winner R16 · ${i * 2 + 1}`,
    `Winner R16 · ${i * 2 + 2}`,
  ] as [string, string]),
  SF: Array.from({ length: 2 }, (_, i) => [
    `Winner QF · ${i * 2 + 1}`,
    `Winner QF · ${i * 2 + 2}`,
  ] as [string, string]),
  "3RD": [["Loser SF · 1", "Loser SF · 2"]],
  F: [["Winner SF · 1", "Winner SF · 2"]],
};

export function buildBracket(matches: MatchWithTeams[]): Record<BracketSlot["round"], BracketSlot[]> {
  const knockout = matches.filter((m) => m.round !== "Group Stage");
  const buckets: Record<BracketSlot["round"], BracketSlot[]> = {
    R32: [],
    R16: [],
    QF: [],
    SF: [],
    "3RD": [],
    F: [],
  };

  for (const m of knockout) {
    const r = ROUND_ORDER[m.round];
    if (!r) continue;
    const status = m.score?.status ?? "UPCOMING";
    const winner =
      status === "FT" && m.score
        ? m.score.a > m.score.b
          ? "a"
          : m.score.a < m.score.b
          ? "b"
          : undefined
        : undefined;
    buckets[r].push({
      id: m.id,
      round: r,
      position: buckets[r].length,
      teamA: m.teamAData,
      teamB: m.teamBData,
      scoreA: m.score?.a,
      scoreB: m.score?.b,
      winner,
      status,
      kickoffISO: m.kickoffISO,
      venue: m.stadium,
    });
  }

  // FIFA WC 2026 bracket: ESPN returns R16 matches in chronological order, but the
  // official bracket pairs them non-sequentially into QFs:
  //   Jul-4 matches (idx 0,1) → QF Jul-9  (position 0)
  //   Jul-6/7 matches (idx 4,5) → QF Jul-10 (position 1)  ← swapped
  //   Jul-5/6 matches (idx 2,3) → QF Jul-11 (position 2)  ← swapped
  //   Jul-7 matches (idx 6,7) → QF Jul-12 (position 3)
  // Reorder so connector lines use the correct i*2 / i*2+1 positional pairing.
  if (buckets.R16.length === 8) {
    const r = buckets.R16;
    const ordered = [r[0], r[1], r[4], r[5], r[2], r[3], r[6], r[7]];
    ordered.forEach((s, i) => { s.position = i; });
    buckets.R16 = ordered;
  }

  (Object.keys(ROUND_COUNT) as BracketSlot["round"][]).forEach((round) => {
    const target = ROUND_COUNT[round];
    const placeholders = ROUND_PLACEHOLDERS[round];
    while (buckets[round].length < target) {
      const idx = buckets[round].length;
      const ph = placeholders[idx] ?? ["TBD", "TBD"];
      buckets[round].push({
        id: `tbd-${round}-${idx}`,
        round,
        position: idx,
        teamALabel: ph[0],
        teamBLabel: ph[1],
        status: "TBD",
      });
    }
    buckets[round] = buckets[round].slice(0, target);
  });

  return buckets;
}

export function placeholderTeam(code: string): Team {
  return { code, name: code, shortName: code, flag: "🏳️" };
}
