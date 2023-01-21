import { Country } from './interfaces/country.interface';
import { countries_json } from './data/filtered_countries';
import { Answer, GameStatus } from './interfaces/game-status.interface';
import { getRandomItem, popRandomItem } from '../utils/random-item';
import { getPercentage } from '../utils/get-percentage';

export class GameManager {
  private _points = 0;
  private _num_options = 6;
  private _correctAnswers = 0;
  private _incorrectAnswers = 0;

  private _lastAnswer: Answer = { correct: false, country: {} as Country };
  private _countries: Country[] = [];
  private _remainCountries: Country[] = [];
  private _remainingFlags = this._remainCountries.length;
  private _countryOptions: Country[] = [];
  private _selectedCountry: Country = { flag: '', name: '', code: '', translations: {} };

  private answerHistory: Answer[] = [];

  public start(): GameStatus {
    this._lastAnswer = { correct: false, country: {} as Country };
    this._countries = Object.assign([], countries_json);
    this._remainCountries = Object.assign([], countries_json);
    this._remainingFlags = this._remainCountries.length;
    this._points = 0;
    this._countryOptions = [];
    this._selectedCountry = { flag: '', name: '', code: '', translations: {} };

    this.answerHistory = [];

    this._selectRandomCountries();
    return this._getGameStatus();
  }

  public checkSelection(country: Country): GameStatus {
    if (country.code === this._selectedCountry.code) {
      this._points += 1;
      this._correctAnswers += 1;
      this._lastAnswer = { correct: true, country: this._selectedCountry };
      this.answerHistory = [this._lastAnswer, ...this.answerHistory];
    } else {
      this._points -= 1;
      this._incorrectAnswers += 1;
      this._lastAnswer = { correct: false, country: this._selectedCountry };
      this.answerHistory = [this._lastAnswer, ...this.answerHistory];
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
      successRate: getPercentage(this._correctAnswers, this._correctAnswers + this._incorrectAnswers),
      answerHistory: this.answerHistory,
      countryOptions: this._countryOptions,
      selectedCountry: this._selectedCountry,
      lastAnswer: this._lastAnswer,
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
