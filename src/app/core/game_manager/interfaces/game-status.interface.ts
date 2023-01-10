import { Country } from './country.interface';

export interface GameStatus {
  isGameFinished: boolean;
  points: number;
  remainingFlags: number;
  successRate: number;
  correctAnswers: Country[];
  incorrectAnswers: Country[];
  countryOptions: Country[];
  selectedCountry: Country;
  selectionResult: SelectionResult;
}

export interface SelectionResult {
  correctAnswer: boolean;
  nameCorrectAnswer?: string;
}
