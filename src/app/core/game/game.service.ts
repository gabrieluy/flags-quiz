import { SettingsService } from '@core/services/settings/settings.service';
import { getRandomItem, popRandomItem } from '@core/utils/random-item';
import { mixSelectedOption } from '@core/utils/mix-selected-element';
import { Country } from '@core/data/interfaces/country.interface';
import { NUM_OPTIONS } from '@core/constants/options.constant';
import { countries_json } from '@core/data/countries';
import { Injectable, inject } from '@angular/core';

import { GameState } from './models/game.model';

interface GameOptions {
  countryOptions: Country[];
  remainCountries: Country[];
  selectedCountry: Country;
}

@Injectable()
export class GameService {
  EASY_POPULATION = 3000000;
  MEDIUM_POPULATION = 300000;

  private _settingsService = inject(SettingsService);

  private _getPlayableCountries(): Country[] {
    let countries = countries_json as Country[];
    const settings = this._settingsService.getSettings();
    countries = countries.filter(c => c.continents.some(con => settings.continents.includes(con)));
    switch (settings.difficulty) {
      case 'easy':
        return countries.filter(c => c.independent && c.population > this.EASY_POPULATION);
      case 'medium':
        return countries.filter(c => c.independent && c.population > this.MEDIUM_POPULATION);
      default:
        return countries;
    }
  }

  private _getNumOptions(countries: Country[]): number {
    return Math.min(NUM_OPTIONS, countries.length);
  }

  public getNextTurn(remainCountries: Country[], playableCountries: Country[]): GameOptions {
    const countryOptions: Country[] = [];
    const selectedCountry: Country = popRandomItem(remainCountries);

    countryOptions.push(selectedCountry);

    while (countryOptions.length < this._getNumOptions(playableCountries)) {
      const randomCountry = getRandomItem(playableCountries);
      if (!countryOptions.some(c => c.code === randomCountry.code)) {
        countryOptions.push(randomCountry);
      }
    }
    mixSelectedOption<Country>(countryOptions, selectedCountry);
    return { countryOptions, selectedCountry, remainCountries };
  }

  public getInitialTurn(): GameState {
    const countries = this._getPlayableCountries();
    const numOptions = this._getNumOptions(countries);
    const { countryOptions, selectedCountry, remainCountries } = this.getNextTurn([...countries], countries);
    return {
      playableCountries: countries,
      remainCountries,
      countryOptions,
      selectedCountry,
      correctAnswers: 0,
      incorrectAnswers: 0,
      successRate: 0,
      answerHistory: [],
      gameTime: 0,
      numOptions,
    };
  }
}
