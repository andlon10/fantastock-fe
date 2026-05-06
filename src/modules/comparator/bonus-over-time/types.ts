export type RawFixtureFantasyStat = {
  match_id: string | null;
  match_date: string | null;
  home_team: string | null;
  away_team: string | null;
  played: boolean;
  minutes: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  penalty_saves: number;
  missed_penalties: number;
  fantasy_points: number | null;
};

export type RawFixtureFantasyStatsByRound = Record<string, RawFixtureFantasyStat>;

export type BonusOverTimeRow = {
  round: number;
  matchDate: string;
  homeTeam: string;
  awayTeam: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  penaltySaves: number;
  missedPenalties: number;
  fantasyPoints: number | null;
};
