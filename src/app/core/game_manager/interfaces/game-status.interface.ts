import { Country } from './country.interface';

export interface GameStatus {
  isGameFinished: boolean;
  points: number;
  remainingFlags: number;
  successRate: number;
  answerHistory: Answer[];
  countryOptions: Country[];
  lastAnswer: Answer;
  selectedCountry: Country;
}

export interface Answer {
  country: Country;
  correct: boolean;
}
