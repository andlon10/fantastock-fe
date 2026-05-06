import { BonusOverTimeRow, RawFixtureFantasyStatsByRound } from "./types";

export function toBonusOverTimeRows(
  statsByRound: RawFixtureFantasyStatsByRound
): BonusOverTimeRow[] {
  return Object.entries(statsByRound)
    .map(([roundKey, stat]) => {
      const round = Number(roundKey);
      if (!Number.isFinite(round)) {
        return null;
      }

      if (!stat.played || !stat.match_date || !stat.home_team || !stat.away_team) {
        return null;
      }

      return {
        round,
        matchDate: stat.match_date,
        homeTeam: stat.home_team,
        awayTeam: stat.away_team,
        goals: stat.goals,
        assists: stat.assists,
        yellowCards: stat.yellow_cards,
        redCards: stat.red_cards,
        penaltySaves: stat.penalty_saves,
        missedPenalties: stat.missed_penalties,
        fantasyPoints: stat.fantasy_points,
      };
    })
    .filter((row): row is BonusOverTimeRow => Boolean(row))
    .sort((a, b) => a.round - b.round);
}
