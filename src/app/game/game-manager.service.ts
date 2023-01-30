import { Country } from './interfaces/country.interface';
import { countries_json } from '../core/game_manager/data/filtered_countries';
import { Answer, GameStatus } from './interfaces/game-status.interface';
import { getRandomItem, popRandomItem } from '../core/utils/random-item';
import { getPercentage } from '../core/utils/get-percentage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class GameManagerService {
  private status$: BehaviorSubject<GameStatus>;
  private _num_options = 6;
  private _points = 0;
  private _correctAnswers = 0;
  private _incorrectAnswers = 0;
  private _lastAnswer: Answer = { correct: false, country: {} as Country };
  private _countries: Country[] = [];
  private _remainCountries: Country[] = [];
  private _remainingFlags = this._remainCountries.length;
  private _countryOptions: Country[] = [];
  private _selectedCountry: Country = { flag: '', name: '', code: '', translations: {} };
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
    const isCorrect = country.code === this._selectedCountry.code;
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
    this._lastAnswer = { correct: false, country: {} as Country };
    this._countries = Object.assign([], countries_json);
    this._remainCountries = Object.assign([], countries_json);
    this._remainingFlags = this._remainCountries.length;
    this._countryOptions = [];
    this._selectedCountry = { flag: '', name: '', code: '', translations: {} };
    this._answerHistory = [];
    this._selectRandomCountries();
  }

  private _getGameStatus(): GameStatus {
    return {
      isGameFinished: this._remainingFlags === 0,
      points: this._points,
      correctAnswers: this._correctAnswers,
      incorrectAnswers: this._incorrectAnswers,
      remainingFlags: this._remainingFlags,
      successRate: getPercentage(this._correctAnswers, this._correctAnswers + this._incorrectAnswers),
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
      if (!this._countryOptions.some(c => c.code === randomCountry.code)) {
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

  private _notify(): void {
    this.status$.next(this._getGameStatus());
  }
}
