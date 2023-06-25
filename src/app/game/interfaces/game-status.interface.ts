import { WritableSignal } from '@angular/core';
import { Country } from './country.interface';
import { Answer } from './answer.interface';

export interface GameStatus {
  isGameFinished: boolean;
  points: number;
  correctAnswers: number;
  incorrectAnswers: number;
  actualFlagCount: number;
  remainingFlags: number;
  successRate: number;
  answerHistory: WritableSignal<Answer[]>;
  countryOptions: Country[];
  lastAnswer: Answer;
  selectedCountry: Country;
}
