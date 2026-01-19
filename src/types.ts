export type Role = 'player' | 'computer';

export type Score = {
  [key in Role]: number;
};

export type GameState = 'initial' | 'running' | 'finished';

export type SquareType = 'active' | 'success' | 'failed' | 'inactive';
