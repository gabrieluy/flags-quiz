export interface Settings {
  difficulty: DifficultyType;
  continents: string[];
  sound: SoundType;
}

export type DifficultyType = 'easy' | 'medium' | 'hard';
export type SoundType = 'on' | 'off';
