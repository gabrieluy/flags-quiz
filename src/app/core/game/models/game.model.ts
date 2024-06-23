import { Country } from '@core/data/interfaces/country.interface';

import { Answer } from '../interfaces/answer.interface';

export interface GameState {
  playableCountries: Country[];
  remainCountries: Country[];
  countryOptions: Country[];
  selectedCountry: Country;
  numOptions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  successRate: number;
  answerHistory: Answer[];
  gameTime: number;
}

export const gameInitialState: GameState = {
  playableCountries: [],
  remainCountries: [],
  countryOptions: [],
  selectedCountry: {} as Country,
  numOptions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  successRate: 0,
  answerHistory: [],
  gameTime: 0,
};
