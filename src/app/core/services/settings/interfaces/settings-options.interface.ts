export interface SettingsOptions {
  difficulty: DifficultyType[];
  continents: string[];
  sound: string[];
}

export type DifficultyType = 'easy' | 'medium' | 'hard';
