// Company claims shown across the site. Mirrors docs/FACTS.md —
// change the value there first, then here. Never hardcode these on a page.

export const ADMIZZ_STATS = {
  studentsPlaced: "1,500+",
} as const;

// Removed from the site on 2026-10-29 until Admizz confirms them with a basis
// (see docs/FACTS.md). Previously shown as 95% and $2M+; the stat slots now show
// "Free first consultation" and "ICEF accredited". To bring a claim back, add it
// to ADMIZZ_STATS and put it back in those stat blocks.
//   visaApprovalRate: "?"
//   scholarships: "?"

// Shown under stat blocks once Admizz confirms the figures,
// e.g. "Based on Admizz student applications, 2022–2025". null hides the line.
export const ADMIZZ_STATS_BASIS: string | null = null;
