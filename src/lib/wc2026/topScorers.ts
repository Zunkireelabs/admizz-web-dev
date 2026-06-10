import type { TopScorer } from "./types";

export const PLACEHOLDER_SCORERS: TopScorer[] = [
  { rank: 1, name: "Tournament starts", team: "—", countryFlag: "🏆", goals: 0, assists: 0, minutes: 0 },
];

const FLAG = (code: string) => `https://a.espncdn.com/i/teamlogos/countries/500/${code.toLowerCase()}.png`;

const PRE_TOURNAMENT_FAVOURITES: TopScorer[] = [
  { rank: 1, name: "Kylian Mbappé", team: "FRA", countryFlag: FLAG("fra"), goals: 0, assists: 0, minutes: 0 },
  { rank: 2, name: "Lionel Messi", team: "ARG", countryFlag: FLAG("arg"), goals: 0, assists: 0, minutes: 0 },
  { rank: 3, name: "Erling Haaland", team: "NOR", countryFlag: FLAG("nor"), goals: 0, assists: 0, minutes: 0 },
  { rank: 4, name: "Vinícius Jr.", team: "BRA", countryFlag: FLAG("bra"), goals: 0, assists: 0, minutes: 0 },
  { rank: 5, name: "Harry Kane", team: "ENG", countryFlag: FLAG("eng"), goals: 0, assists: 0, minutes: 0 },
  { rank: 6, name: "Lamine Yamal", team: "ESP", countryFlag: FLAG("esp"), goals: 0, assists: 0, minutes: 0 },
  { rank: 7, name: "Jude Bellingham", team: "ENG", countryFlag: FLAG("eng"), goals: 0, assists: 0, minutes: 0 },
  { rank: 8, name: "Cristiano Ronaldo", team: "POR", countryFlag: FLAG("por"), goals: 0, assists: 0, minutes: 0 },
];

export function getTopScorers(tournamentStarted: boolean): TopScorer[] {
  if (!tournamentStarted) return PRE_TOURNAMENT_FAVOURITES;
  // Once tournament starts and we have a live API to call, this would use real data.
  // For now return favourites with zeros — real ESPN leaders endpoint coverage for FIFA WC
  // is unreliable until the tournament starts producing data.
  return PRE_TOURNAMENT_FAVOURITES;
}
