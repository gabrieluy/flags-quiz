import { Country } from './interfaces/country.interface';
import { countries_json } from '../core/data/countries';
import { Answer, GameStatus } from './interfaces/game-status.interface';
import { getRandomItem, popRandomItem } from '../core/utils/random-item';
import { getPercentage } from '../core/utils/get-percentage';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsService } from '../core/services/settings/settings.service';
import { NUM_OPTIONS } from './constants/options.constant';
import { SoundsService } from '../core/services/sounds/sounds.service';

@Injectable()
export class GameManagerService {
  private _settingsService = inject(SettingsService);
  private _sounds = inject(SoundsService);

  private status$: BehaviorSubject<GameStatus>;
  private _num_options = NUM_OPTIONS;
  private _points = 0;
  private _correctAnswers = 0;
  private _incorrectAnswers = 0;
  private _actualFlagCount = 0;
  private _lastAnswer: Answer = { correct: false, country: {} as Country };
  private _countries: Country[] = [];
  private _remainCountries: Country[] = [];
  private _remainingFlags = 0;
  private _countryOptions: Country[] = [];
  private _selectedCountry: Country = {} as Country;
  private _answerHistory: Answer[] = [];

  constructor() {
    this._init();
    this.status$ = new BehaviorSubject(this._getGameStatus());
  }

  public reset(): void {
    this._init();
    this._notify();
  }

  public getStatus(): Observable<GameStatus> {
    // Downcast the status$ to a simple Observable to avoid expose the Observer.
    return this.status$.asObservable();
  }

  public checkSelection(country: Country): void {
    const isCorrect = country.cca2 === this._selectedCountry.cca2;
    this._sounds.playAnswerSound(isCorrect);

    this._actualFlagCount += 1;
    this._correctAnswers += isCorrect ? 1 : 0;
    this._incorrectAnswers += isCorrect ? 0 : 1;
    this._points += isCorrect ? 1 : -1;
    this._lastAnswer = { correct: isCorrect, country: this._selectedCountry };
    this._answerHistory = [this._lastAnswer, ...this._answerHistory];
    this._remainingFlags--;

    if (this._remainingFlags > 0) {
      this._selectRandomCountries();
    }

    this._notify();
  }

  private _init(): void {
    this._points = 0;
    this._correctAnswers = 0;
    this._incorrectAnswers = 0;
    this._actualFlagCount = 0;
    this._lastAnswer = { correct: false, country: {} as Country };
    const playableCountries = this._getPlayableCountries();
    this._countries = Object.assign([], playableCountries);
    this._remainCountries = Object.assign([], playableCountries);
    this._num_options = NUM_OPTIONS < playableCountries.length ? NUM_OPTIONS : playableCountries.length;
    this._remainingFlags = this._remainCountries.length;
    this._countryOptions = [];
    this._selectedCountry = {} as Country;
    this._answerHistory = [];
    this._selectRandomCountries();
  }

  private _getGameStatus(): GameStatus {
    return {
      isGameFinished: this._remainingFlags === 0,
      points: this._points,
      correctAnswers: this._correctAnswers,
      incorrectAnswers: this._incorrectAnswers,
      actualFlagCount: this._actualFlagCount,
      remainingFlags: this._remainingFlags,
      successRate: getPercentage(this._correctAnswers, this._actualFlagCount),
      answerHistory: this._answerHistory,
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
      if (!this._countryOptions.some(c => c.cca2 === randomCountry.cca2)) {
        this._countryOptions.push(randomCountry);
      }
    }
    this._mixSelectedOption();
  }

  private _mixSelectedOption(): void {
    const inxAux = Math.floor(Math.random() * this._num_options);
    const aux = this._countryOptions[inxAux];
    this._countryOptions[0] = aux;
    this._countryOptions[inxAux] = this._selectedCountry;
  }

  private _getPlayableCountries(): Country[] {
    let countries = countries_json as Country[];
    const settings = this._settingsService.getSettings();
    countries = countries.filter(c => c.continents.some(con => settings.continents.includes(con)));
    switch (settings.difficulty) {
      case 'easy':
        return countries.filter(c => c.independent && c.population > 3000000);
      case 'medium':
        return countries.filter(c => c.independent && c.population > 300000);
      case 'hard':
        return countries;
    }
  }

  private _notify(): void {
    this.status$.next(this._getGameStatus());
  }
}
