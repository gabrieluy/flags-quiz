import { Answer } from './answer.interface';
import { Country } from './country.interface';

export interface PersistedStatus {
  playableCountries: Country[];
  remainCountries: Country[];
  countryOptions: Country[];
  selectedCountry: Country;
  numOptions: number;
  answerHistory: Answer[];
  gameTime: number;
}
