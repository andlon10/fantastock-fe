export type Player = {
  id: number;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  totalPoints: number;
  minutes: number;
  xG: number;
  xA: number;
  PI: number;
  FOI?: number;
  ProjectionGap?: number;
  similarity_score?: number;
};

export type Shot = {
  id: number;
  playerId: number;
  X: string; // Normalized X coordinate (0 to 1)
  Y: string; // Normalized Y coordinate (0 to 1)
  xG: string; // Expected goals value as a string
  result: string; // "Goal", "Missed", "Saved", etc.
  minute: number; // Minute of the match when the shot was taken
};
