import { Country } from './interfaces/country.interface';
import { countries_json } from '../core/data/countries';
import { GameStatus } from './interfaces/game-status.interface';
import { getRandomItem, popRandomItem } from '../core/utils/random-item';
import { getPercentage } from '../core/utils/get-percentage';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { SettingsService } from '../core/services/settings/settings.service';
import { NUM_OPTIONS } from './constants/options.constant';
import { SoundsService } from '../core/services/sounds/sounds.service';
import { PersistedStatus } from './interfaces/persisted-status.interface';
import { Answer } from './interfaces/answer.interface';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';
import { Subscription, tap, timer } from 'rxjs';
import { mixSelectedOption } from '../core/utils/mix-selected-element';

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

  private _numOptions = signal<number>(NUM_OPTIONS);
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
    return getPercentage(this._correctAnswers(), this._playableCountries().length);
  });

  private _isGameFinished = computed<boolean>(() => {
    return this._playableCountries().length === this._answerHistory().length;
  });

  public status = computed<GameStatus>(() => {
    const status = {
      isGameFinished: this._isGameFinished(),
      points: this._points(),
      correctAnswers: this._correctAnswers(),
      incorrectAnswers: this._incorrectAnswers(),
      playableCountriesCount: this._playableCountries().length,
      successRate: this._successRate(),
      answerHistory: this._answerHistory,
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

  constructor() {
    effect(() => {
      if (this._isGameFinished()) {
        this._stopGameTimer();
      }
    });
  }

  public reset(): void {
    this._stopGameTimer();
    this._createNewGame();
    this._setupGameTimer();
  }

  public init(): void {
    const persistedGame = this._localStorage.getData<PersistedStatus>(this.GAME_STATUS_KEY);
    if (persistedGame) {
      this._restorePersistedGame(persistedGame);
    } else {
      this._createNewGame();
    }
    this._setupGameTimer();
  }

  public hasPersistedState(): boolean {
    return this._localStorage.hasData(this.GAME_STATUS_KEY);
  }

  public checkSelection(country: Country): void {
    const isCorrect = country.cca2 === this._selectedCountry().cca2;
    this._sounds.playAnswerSound(isCorrect);
    this._answerHistory.mutate(list => {
      list.unshift({ correct: isCorrect, country: this._selectedCountry() });
    });

    if (!this._isGameFinished()) {
      this._selectRandomCountries();
      this._localStorage.saveData<PersistedStatus>(this.GAME_STATUS_KEY, this.persistentStatus());
    }
  }

  public quitGame(): void {
    this._stopGameTimer();
  }

  private _createNewGame() {
    this._localStorage.removeData(this.GAME_STATUS_KEY);
    this._localStorage.removeData(this.GAME_TIME_KEY);
    const playableCountries = this._getPlayableCountries();
    this._playableCountries.set([...playableCountries]);
    this._remainCountries.set([...playableCountries]);
    this._numOptions.set(NUM_OPTIONS < playableCountries.length ? NUM_OPTIONS : playableCountries.length);
    this._countryOptions.set([]);
    this._selectedCountry.set({} as Country);
    this._answerHistory.set([]);
    this._gameTime.set(0);
    this._selectRandomCountries();
  }

  private _restorePersistedGame(pStatus: PersistedStatus) {
    const gameTime = this._localStorage.getData<number>(this.GAME_TIME_KEY);
    this._playableCountries.set(pStatus.playableCountries);
    this._remainCountries.set(pStatus.remainCountries);
    this._countryOptions.set(pStatus.countryOptions);
    this._selectedCountry.set(pStatus.selectedCountry);
    this._numOptions.set(pStatus.numOptions);
    this._answerHistory.set(pStatus.answerHistory);
    this._gameTime.set(gameTime || 0);
  }

  private _setupGameTimer(): void {
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
      if (!this._countryOptions().some(c => c.cca2 === randomCountry.cca2)) {
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
  }
}
