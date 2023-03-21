export interface Settings {
  difficulty: DifficultyType;
  continents: string[];
}

export type DifficultyType = { label: string; value: 'easy' | 'medium' | 'hard' };
