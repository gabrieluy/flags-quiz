import { Country } from './interfaces/country.interface';
import { countries_json } from './data/filtered_countries';
import { GameStatus, SelectionResult } from './interfaces/game-status.interface';
import { getRandomItem, popRandomItem } from '../utils/random-item';
import { getPercentage } from '../utils/get-percentage';

export class GameManager {
  private _points = 0;
  private _num_options = 8;
  private _selectionResult: SelectionResult = { correctAnswer: false };
  private _countries: Country[] = countries_json;
  private _remainCountries: Country[] = countries_json;
  private _remainingFlags = this._remainCountries.length;
  private _countryOptions: Country[] = [];
  private _selectedCountry: Country = { flag: '', name: '', code: '', translations: {} };

  private _correctAnswers: Country[] = [];
  private _incorrectAnswers: Country[] = [];

  public start(): GameStatus {
    this._selectionResult = { correctAnswer: false };
    this._countries = countries_json;
    this._remainCountries = countries_json;
    this._remainingFlags = this._remainCountries.length;
    this._countryOptions = [];
    this._selectedCountry = { flag: '', name: '', code: '', translations: {} };

    this._correctAnswers = [];
    this._incorrectAnswers = [];

    this._selectRandomCountries();
    return this._getGameStatus();
  }

  public checkSelection(country: Country): GameStatus {
    if (country.code === this._selectedCountry.code) {
      this._points += 1;
      this._selectionResult = { correctAnswer: true };
      this._correctAnswers.push(this._selectedCountry);
    } else {
      this._selectionResult = { correctAnswer: false };
      this._incorrectAnswers.push(this._selectedCountry);
    }

    this._remainingFlags--;
    if (this._remainingFlags > 0) {
      this._selectRandomCountries();
    }

    return this._getGameStatus();
  }

  private _getGameStatus(): GameStatus {
    return {
      isGameFinished: this._remainingFlags === 0,
      points: this._points,
      remainingFlags: this._remainingFlags,
      successRate: getPercentage(
        this._correctAnswers.length,
        this._correctAnswers.length + this._incorrectAnswers.length
      ),
      correctAnswers: this._correctAnswers,
      incorrectAnswers: this._incorrectAnswers,
      countryOptions: this._countryOptions,
      selectedCountry: this._selectedCountry,
      selectionResult: this._selectionResult,
    };
  }

  private _selectRandomCountries(): void {
    this._countryOptions = [];
    this._selectedCountry = popRandomItem(this._remainCountries);
    this._countryOptions.push(this._selectedCountry);
    while (this._countryOptions.length < this._num_options) {
      const randomCountry = getRandomItem(this._countries);
      if (!this._countryOptions.some(c => c.code === randomCountry.code)) {
        this._countryOptions.push(randomCountry);
      }
    }
    this._mixSelectedOption();
  }

  private _mixSelectedOption(): void {
    const inxAux = Math.floor(Math.random() * (this._num_options - 1));
    const aux = this._countryOptions[inxAux];
    this._countryOptions[0] = aux;
    this._countryOptions[inxAux] = this._selectedCountry;
  }
}
