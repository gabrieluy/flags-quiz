import { Answer } from './answer.interface';
import { Country } from './country.interface';

export interface PersistedStatus {
  countries: Country[];
  remainCountries: Country[];
  countryOptions: Country[];
  selectedCountry: Country;
  numOptions: number;
  remainingFlags: number;
  answerHistory: Answer[];
  lastAnswer: Answer;
}
