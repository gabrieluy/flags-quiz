import { WritableSignal } from '@angular/core';
import { Country } from './country.interface';
import { Answer } from './answer.interface';

export interface GameStatus {
  isGameFinished: boolean;
  points: number;
  correctAnswers: number;
  incorrectAnswers: number;
  playableCountriesCount: number;
  successRate: number;
  answerHistory: WritableSignal<Answer[]>;
  countryOptions: Country[];
  selectedCountry: Country;
  gameTime: number;
}
