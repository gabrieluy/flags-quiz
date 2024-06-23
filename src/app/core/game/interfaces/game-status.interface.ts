import { WritableSignal } from '@angular/core';
import { Answer } from './answer.interface';
import { Country } from '@core/data/interfaces/country.interface';

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
