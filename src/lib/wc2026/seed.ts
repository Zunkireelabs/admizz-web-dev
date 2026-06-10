import type { MatchWithTeams, Team } from "./types";

const T: Record<string, Team> = {
  MEX: { code: "MEX", name: "Mexico", shortName: "MEX", flag: "https://a.espncdn.com/i/teamlogos/countries/500/mex.png", fifaRank: 14, form: ["W", "W", "D", "W", "L"] },
  RSA: { code: "RSA", name: "South Africa", shortName: "RSA", flag: "https://a.espncdn.com/i/teamlogos/countries/500/rsa.png", fifaRank: 58, form: ["W", "L", "W", "D", "W"] },
  CAN: { code: "CAN", name: "Canada", shortName: "CAN", flag: "https://a.espncdn.com/i/teamlogos/countries/500/can.png", fifaRank: 31, form: ["D", "W", "W", "L", "W"] },
  MAR: { code: "MAR", name: "Morocco", shortName: "MAR", flag: "https://a.espncdn.com/i/teamlogos/countries/500/mar.png", fifaRank: 14, form: ["W", "W", "W", "D", "W"] },
  ARG: { code: "ARG", name: "Argentina", shortName: "ARG", flag: "https://a.espncdn.com/i/teamlogos/countries/500/arg.png", fifaRank: 1, form: ["W", "W", "W", "W", "D"] },
  POR: { code: "POR", name: "Portugal", shortName: "POR", flag: "https://a.espncdn.com/i/teamlogos/countries/500/por.png", fifaRank: 6, form: ["W", "D", "W", "W", "L"] },
  BRA: { code: "BRA", name: "Brazil", shortName: "BRA", flag: "https://a.espncdn.com/i/teamlogos/countries/500/bra.png", fifaRank: 5, form: ["W", "D", "W", "L", "W"] },
  SEN: { code: "SEN", name: "Senegal", shortName: "SEN", flag: "https://a.espncdn.com/i/teamlogos/countries/500/sen.png", fifaRank: 20, form: ["W", "W", "D", "W", "L"] },
  FRA: { code: "FRA", name: "France", shortName: "FRA", flag: "https://a.espncdn.com/i/teamlogos/countries/500/fra.png", fifaRank: 2, form: ["W", "W", "W", "D", "W"] },
  NED: { code: "NED", name: "Netherlands", shortName: "NED", flag: "https://a.espncdn.com/i/teamlogos/countries/500/ned.png", fifaRank: 7, form: ["W", "L", "W", "W", "D"] },
  ENG: { code: "ENG", name: "England", shortName: "ENG", flag: "https://a.espncdn.com/i/teamlogos/countries/500/eng.png", fifaRank: 4, form: ["W", "D", "W", "W", "W"] },
  GER: { code: "GER", name: "Germany", shortName: "GER", flag: "https://a.espncdn.com/i/teamlogos/countries/500/ger.png", fifaRank: 9, form: ["W", "W", "D", "L", "W"] },
  ESP: { code: "ESP", name: "Spain", shortName: "ESP", flag: "https://a.espncdn.com/i/teamlogos/countries/500/esp.png", fifaRank: 3, form: ["W", "W", "W", "W", "W"] },
  ITA: { code: "ITA", name: "Italy", shortName: "ITA", flag: "https://a.espncdn.com/i/teamlogos/countries/500/ita.png", fifaRank: 10, form: ["D", "W", "W", "L", "W"] },
  BEL: { code: "BEL", name: "Belgium", shortName: "BEL", flag: "https://a.espncdn.com/i/teamlogos/countries/500/bel.png", fifaRank: 8, form: ["W", "L", "W", "D", "W"] },
  CRO: { code: "CRO", name: "Croatia", shortName: "CRO", flag: "https://a.espncdn.com/i/teamlogos/countries/500/cro.png", fifaRank: 11, form: ["W", "D", "L", "W", "D"] },
  JPN: { code: "JPN", name: "Japan", shortName: "JPN", flag: "https://a.espncdn.com/i/teamlogos/countries/500/jpn.png", fifaRank: 17, form: ["W", "W", "L", "W", "D"] },
  KOR: { code: "KOR", name: "South Korea", shortName: "KOR", flag: "https://a.espncdn.com/i/teamlogos/countries/500/kor.png", fifaRank: 22, form: ["W", "D", "W", "L", "W"] },
};

const FIXTURES: Array<Omit<MatchWithTeams, "teamAData" | "teamBData" | "score">> = [
  { id: "seed-m1", group: "A", round: "Group Stage", teamA: "RSA", teamB: "MEX", stadium: "Estadio Banorte", city: "Mexico City", kickoffISO: "2026-06-11T19:00:00-05:00", matchNumber: 1 },
  { id: "seed-m2", group: "B", round: "Group Stage", teamA: "CAN", teamB: "MAR", stadium: "BMO Field", city: "Toronto", kickoffISO: "2026-06-12T19:00:00-04:00", matchNumber: 2 },
  { id: "seed-m3", group: "C", round: "Group Stage", teamA: "ARG", teamB: "POR", stadium: "MetLife Stadium", city: "East Rutherford", kickoffISO: "2026-06-12T16:00:00-04:00", matchNumber: 3 },
  { id: "seed-m4", group: "D", round: "Group Stage", teamA: "BRA", teamB: "SEN", stadium: "SoFi Stadium", city: "Los Angeles", kickoffISO: "2026-06-13T18:00:00-07:00", matchNumber: 4 },
  { id: "seed-m5", group: "E", round: "Group Stage", teamA: "FRA", teamB: "NED", stadium: "AT&T Stadium", city: "Dallas", kickoffISO: "2026-06-13T15:00:00-05:00", matchNumber: 5 },
  { id: "seed-m6", group: "F", round: "Group Stage", teamA: "ENG", teamB: "GER", stadium: "Hard Rock Stadium", city: "Miami", kickoffISO: "2026-06-14T15:00:00-04:00", matchNumber: 6 },
  { id: "seed-m7", group: "G", round: "Group Stage", teamA: "ESP", teamB: "ITA", stadium: "Lincoln Financial Field", city: "Philadelphia", kickoffISO: "2026-06-14T18:00:00-04:00", matchNumber: 7 },
  { id: "seed-m8", group: "H", round: "Group Stage", teamA: "BEL", teamB: "CRO", stadium: "Mercedes-Benz Stadium", city: "Atlanta", kickoffISO: "2026-06-15T17:00:00-04:00", matchNumber: 8 },
  { id: "seed-m9", group: "J", round: "Group Stage", teamA: "JPN", teamB: "KOR", stadium: "Levi's Stadium", city: "Santa Clara", kickoffISO: "2026-06-16T16:00:00-07:00", matchNumber: 10 },
  { id: "seed-m10", group: "A", round: "Group Stage", teamA: "MEX", teamB: "RSA", stadium: "Estadio Akron", city: "Guadalajara", kickoffISO: "2026-06-17T19:00:00-06:00", matchNumber: 13 },
];

export function getSeedMatches(): MatchWithTeams[] {
  return FIXTURES.map((m) => ({
    ...m,
    teamAData: T[m.teamA] ?? { code: m.teamA, name: m.teamA, shortName: m.teamA, flag: "🏳️" },
    teamBData: T[m.teamB] ?? { code: m.teamB, name: m.teamB, shortName: m.teamB, flag: "🏳️" },
    score: null,
  }));
}
