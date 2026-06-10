export type MatchStatus = "UPCOMING" | "LIVE" | "HT" | "FT";

export type PredictionChoice = "team_a" | "draw" | "team_b";

export interface Team {
  code: string;
  name: string;
  shortName: string;
  flag: string;
  fifaRank?: number;
  manager?: string;
  form?: ("W" | "D" | "L")[];
}

export interface Score {
  a: number;
  b: number;
  minute?: number;
  status: MatchStatus;
}

export interface Match {
  id: string;
  group: string;
  round: string;
  teamA: string;
  teamB: string;
  stadium: string;
  city: string;
  kickoffISO: string;
  matchNumber: number;
}

export interface MatchWithTeams extends Match {
  teamAData: Team;
  teamBData: Team;
  score: Score | null;
}

export interface StandingsEntry {
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  rank: number;
  qualified: boolean;
  bestThird: boolean;
}

export interface GroupStanding {
  group: string;
  entries: StandingsEntry[];
}

export interface TopScorer {
  rank: number;
  name: string;
  team: string;
  countryFlag: string;
  goals: number;
  assists: number;
  minutes: number;
  portrait?: string;
}

export interface BracketSlot {
  id: string;
  round: "R32" | "R16" | "QF" | "SF" | "3RD" | "F";
  position: number;
  teamA?: Team;
  teamB?: Team;
  teamALabel?: string;
  teamBLabel?: string;
  scoreA?: number;
  scoreB?: number;
  winner?: "a" | "b";
  status: MatchStatus | "TBD";
  kickoffISO?: string;
  venue?: string;
}

export interface PredictionLead {
  name: string;
  email: string;
  phone: string;
  dialCode: string;
  city: string;
  source: "worldcup-predict-win";
  matchId: string;
  matchLabel: string;
  prediction: PredictionChoice;
  submittedAt: string;
}

export interface StoredPrediction {
  matchId: string;
  prediction: PredictionChoice;
  submittedAt: string;
  matchLabel?: string;
  resolved?: "correct" | "incorrect";
}

export interface PredictionStats {
  total: number;
  resolved: number;
  correct: number;
  incorrect: number;
  pending: number;
  accuracy: number;
  streak: number;
  bestStreak: number;
  achievements: string[];
}

export interface TournamentPulseData {
  matchesPlayed: number;
  matchesTotal: number;
  goalsScored: number;
  topScorer: TopScorer | null;
  daysUntilFinal: number;
}
