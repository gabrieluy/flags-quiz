import { Country } from './interfaces/country.interface';
import { countries_json } from '../core/data/countries';
import { GameStatus } from './interfaces/game-status.interface';
import { getRandomItem, popRandomItem } from '../core/utils/random-item';
import { getPercentage } from '../core/utils/get-percentage';
import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { SettingsService } from '../core/services/settings/settings.service';
import { NUM_OPTIONS } from './constants/options.constant';
import { SoundsService } from '../core/services/sounds/sounds.service';
import { PersistedStatus } from './interfaces/persisted-status.interface';
import { Answer } from './interfaces/answer.interface';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';

@Injectable()
export class GameManagerService {
  LOCAL_STORAGE_KEY = 'fq:gameStatus';
  EASY_POPULATION = 3000000;
  MEDIUM_POPULATION = 300000;

  private _settingsService = inject(SettingsService);
  private _sounds = inject(SoundsService);
  private _localStorage = inject(LocalStorageService);

  private _countries = signal<Country[]>([]);
  private _remainCountries = signal<Country[]>([]);
  private _countryOptions = signal<Country[]>([]);
  private _selectedCountry = signal<Country>({} as Country);

  private _numOptions = signal<number>(NUM_OPTIONS);
  private _remainingFlags = signal<number>(0);
  private _answerHistory = signal<Answer[]>([]);
  private _lastAnswer = signal<Answer>({ correct: false, country: {} as Country });

  private _correctAnswers = computed<number>(() => {
    return this._answerHistory().filter(a => a.correct).length;
  });

  private _incorrectAnswers = computed<number>(() => {
    return this._answerHistory().filter(a => !a.correct).length;
  });

  private _points = computed<number>(() => {
    return this._correctAnswers() - this._incorrectAnswers();
  });

  private _actualFlagCount = computed<number>(() => {
    return this._correctAnswers() + this._incorrectAnswers();
  });

  private _successRate = computed<number>(() => {
    return getPercentage(this._correctAnswers(), this._actualFlagCount());
  });

  public status = computed<GameStatus>(() => {
    const status = {
      isGameFinished: this._remainingFlags() === 0,
      points: this._points(),
      correctAnswers: this._correctAnswers(),
      incorrectAnswers: this._incorrectAnswers(),
      actualFlagCount: this._actualFlagCount(),
      remainingFlags: this._remainingFlags(),
      successRate: this._successRate(),
      answerHistory: this._answerHistory,
      countryOptions: this._countryOptions(),
      selectedCountry: this._selectedCountry(),
      lastAnswer: this._lastAnswer(),
    };
    return status;
  });

  public persistentStatus = computed<PersistedStatus>(() => {
    const pStatus = {
      countries: this._countries(),
      remainCountries: this._remainCountries(),
      countryOptions: this._countryOptions(),
      selectedCountry: this._selectedCountry(),
      numOptions: this._numOptions(),
      remainingFlags: this._remainingFlags(),
      answerHistory: this._answerHistory(),
      lastAnswer: this._lastAnswer(),
    };
    return pStatus;
  });

  public reset(): void {
    this._createNewGame();
  }

  public init(): void {
    const persistedGame = this._localStorage.getData<PersistedStatus>(this.LOCAL_STORAGE_KEY);
    if (persistedGame) {
      this._restorePersistedGame(persistedGame);
    } else {
      this._createNewGame();
    }
  }

  public hasPersistedState(): boolean {
    return this._localStorage.hasData(this.LOCAL_STORAGE_KEY);
  }

  public checkSelection(country: Country): void {
    const isCorrect = country.cca2 === this._selectedCountry().cca2;
    this._sounds.playAnswerSound(isCorrect);
    this._lastAnswer.set({ correct: isCorrect, country: this._selectedCountry() });
    this._answerHistory.mutate(list => {
      list.unshift(this._lastAnswer());
    });
    this._remainingFlags.update(value => value - 1);

    if (this._remainingFlags() > 0) {
      this._selectRandomCountries();
    }
    this._localStorage.saveData<PersistedStatus>(this.LOCAL_STORAGE_KEY, this.persistentStatus());
  }

  private _createNewGame() {
    this._localStorage.removeData(this.LOCAL_STORAGE_KEY);
    this._lastAnswer.set({ correct: false, country: {} as Country });
    const playableCountries = this._getPlayableCountries();
    this._countries.set(Object.assign([], playableCountries));
    this._remainCountries.set(Object.assign([], playableCountries));
    this._numOptions.set(NUM_OPTIONS < playableCountries.length ? NUM_OPTIONS : playableCountries.length);
    this._remainingFlags.set(this._remainCountries().length);
    this._countryOptions.set([]);
    this._selectedCountry.set({} as Country);
    this._answerHistory.set([]);
    this._selectRandomCountries();
  }

  private _restorePersistedGame(pStatus: PersistedStatus) {
    this._countries.set(pStatus.countries);
    this._remainCountries.set(pStatus.remainCountries);
    this._countryOptions.set(pStatus.countryOptions);
    this._selectedCountry.set(pStatus.selectedCountry);
    this._numOptions.set(pStatus.numOptions);
    this._remainingFlags.set(pStatus.remainingFlags);
    this._answerHistory.set(pStatus.answerHistory);
    this._lastAnswer.set(pStatus.lastAnswer);
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
      const randomCountry = getRandomItem(this._countries());
      if (!this._countryOptions().some(c => c.cca2 === randomCountry.cca2)) {
        this._countryOptions.mutate(list => {
          list.push(randomCountry);
        });
      }
    }
    this._mixSelectedOption();
  }

  private _mixSelectedOption(): void {
    const inxAux = Math.floor(Math.random() * this._numOptions());
    const aux = this._countryOptions()[inxAux];
    this._countryOptions()[0] = aux;
    this._countryOptions()[inxAux] = this._selectedCountry();
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
