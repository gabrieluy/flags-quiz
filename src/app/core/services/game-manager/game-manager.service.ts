import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Subscription, tap, timer } from 'rxjs';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { PersistedStatus } from './interfaces/persisted-status.interface';
import { getRandomItem, popRandomItem } from '../../utils/random-item';
import { mixSelectedOption } from '../../utils/mix-selected-element';
import { Country } from '../../data/interfaces/country.interface';
import { GameStatus } from './interfaces/game-status.interface';
import { SettingsService } from '../settings/settings.service';
import { getPercentage } from '../../utils/get-percentage';
import { NUM_OPTIONS } from './constants/options.constant';
import { SoundsService } from '../sounds/sounds.service';
import { Answer } from './interfaces/answer.interface';
import { countries_json } from '../../data/countries';

@Injectable()
export class GameManagerService {
  GAME_STATUS_KEY = 'fq:gameStatus';
  GAME_TIME_KEY = 'fq:gameTime';

  EASY_POPULATION = 3000000;
  MEDIUM_POPULATION = 300000;
  TIMER_INTERVAL_MS = 1000;

  private _gameTimerSubscription$?: Subscription;
  private _settingsService = inject(SettingsService);
  private _sounds = inject(SoundsService);
  private _localStorage = inject(LocalStorageService);

  private _playableCountries = signal<Country[]>([]);
  private _remainCountries = signal<Country[]>([]);
  private _countryOptions = signal<Country[]>([]);
  private _selectedCountry = signal<Country>({} as Country);

  private _answerHistory = signal<Answer[]>([]);
  private _gameTime = signal<number>(0);

  private _correctAnswers = computed<number>(() => {
    return this._answerHistory().filter(a => a.correct).length;
  });

  private _incorrectAnswers = computed<number>(() => {
    return this._answerHistory().filter(a => !a.correct).length;
  });

  private _points = computed<number>(() => {
    return this._correctAnswers() - this._incorrectAnswers();
  });

  private _successRate = computed<number>(() => {
    return getPercentage(this._correctAnswers(), this._correctAnswers() + this._incorrectAnswers());
  });

  private _isGameFinished = computed<boolean>(() => {
    return this._playableCountries().length === this._answerHistory().length;
  });

  private _numOptions = computed<number>(() => {
    const maxNumOpt = this._playableCountries().length;
    return NUM_OPTIONS < maxNumOpt ? NUM_OPTIONS : maxNumOpt;
  });

  public status = computed<GameStatus>(() => {
    const status = {
      isGameFinished: this._isGameFinished(),
      points: this._points(),
      correctAnswers: this._correctAnswers(),
      incorrectAnswers: this._incorrectAnswers(),
      playableCountriesCount: this._playableCountries().length,
      successRate: this._successRate(),
      answerHistory: this._answerHistory, //TODO: update after signal components
      countryOptions: this._countryOptions(),
      selectedCountry: this._selectedCountry(),
      gameTime: this._gameTime(),
    };
    return status;
  });

  public persistentStatus = computed<PersistedStatus>(() => {
    const pStatus = {
      playableCountries: this._playableCountries(),
      remainCountries: this._remainCountries(),
      countryOptions: this._countryOptions(),
      selectedCountry: this._selectedCountry(),
      numOptions: this._numOptions(),
      answerHistory: this._answerHistory(),
      gameTime: this._gameTime(),
    };
    return pStatus;
  });

  public hasPersistedState = (): boolean => this._localStorage.hasData(this.GAME_STATUS_KEY);

  constructor() {
    effect(() => {
      if (this._isGameFinished()) {
        this._stopGameTimer();
      }
    });
  }

  public reset(): void {
    this._stopGameTimer();
    this._clearLocalStorageData();
    this._loadGame();
    this._setupGameTimer();
  }

  public init(): void {
    this._loadGame();
    this._setupGameTimer();
  }

  public checkSelection(country: Country): void {
    const isCorrect = country.code === this._selectedCountry().code;
    this._sounds.playAnswerSound(isCorrect);
    this._answerHistory.mutate(list => {
      list.unshift({ correct: isCorrect, country: this._selectedCountry() });
    });

    if (!this._isGameFinished()) {
      this._selectRandomCountries();
    }
    this._localStorage.saveData<PersistedStatus>(this.GAME_STATUS_KEY, this.persistentStatus());
  }

  public quitGame(): void {
    this._stopGameTimer();
  }

  private _loadGame() {
    const data = this._localStorage.getData<PersistedStatus>(this.GAME_STATUS_KEY);
    const gameTime = this._localStorage.getData<number>(this.GAME_TIME_KEY);
    this._playableCountries.set(data?.playableCountries || this._getPlayableCountries());
    this._remainCountries.set(data?.remainCountries || this._getPlayableCountries());
    this._countryOptions.set(data?.countryOptions || []);
    this._selectedCountry.set(data?.selectedCountry || ({} as Country));
    this._answerHistory.set(data?.answerHistory || []);
    this._gameTime.set(gameTime || 0);
    if (!data) {
      this._selectRandomCountries();
    }
  }

  private _setupGameTimer(): void {
    if (this._isGameFinished()) return;
    this._gameTimerSubscription$ = timer(0, this.TIMER_INTERVAL_MS)
      .pipe(
        tap(() => {
          const currentTime = this._localStorage.getData<number>(this.GAME_TIME_KEY) || 0;
          this._localStorage.saveData<number>(this.GAME_TIME_KEY, currentTime + 1);
          this._gameTime.set(currentTime + 1);
        })
      )
      .subscribe();
  }

  private _stopGameTimer(): void {
    if (this._gameTimerSubscription$) {
      this._gameTimerSubscription$.unsubscribe();
    }
  }

  private _clearLocalStorageData(): void {
    this._localStorage.removeData([this.GAME_STATUS_KEY, this.GAME_TIME_KEY]);
  }

  private _selectRandomCountries(): void {
    this._countryOptions.set([]);
    this._remainCountries.mutate(list => {
      this._selectedCountry.set(popRandomItem(list));
    });
    this._countryOptions.mutate(list => {
      list.push(this._selectedCountry());
    });
    while (this._countryOptions().length < this._numOptions()) {
      const randomCountry = getRandomItem(this._playableCountries());
      if (!this._countryOptions().some(c => c.code === randomCountry.code)) {
        this._countryOptions.mutate(list => {
          list.push(randomCountry);
        });
      }
    }
    mixSelectedOption<Country>(this._countryOptions(), this._selectedCountry());
  }

  private _getPlayableCountries(): Country[] {
    let countries = countries_json as Country[];
    const settings = this._settingsService.getSettings();
    countries = countries.filter(c => c.continents.some(con => settings.continents.includes(con)));
    switch (settings.difficulty) {
      case 'easy':
        return countries.filter(c => c.independent && c.population > this.EASY_POPULATION);
      case 'medium':
        return countries.filter(c => c.independent && c.population > this.MEDIUM_POPULATION);
      case 'hard':
        return countries;
    }
    return countries;
  }
}
