import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { SoundsService } from '@core/services/sounds/sounds.service';
import { Country } from '@core/data/interfaces/country.interface';
import { Observable, Subscription, tap, timer } from 'rxjs';
import { getPercentage } from '@core/utils/get-percentage';
import { computed, inject } from '@angular/core';

import { GameState, gameInitialState } from './models/game.model';
import { GameService } from './game.service';

const GAME_STATUS_KEY = 'fm:gameStatus';
const TIMER_INTERVAL_MS = 1000;

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState<GameState>(gameInitialState),
  withComputed(({ correctAnswers, incorrectAnswers, answerHistory, playableCountries }) => ({
    points: computed(() => correctAnswers() - incorrectAnswers()),
    progressPercentage: computed(() => Math.floor((answerHistory().length * 100) / playableCountries().length)),
    successRate: computed(() => getPercentage(correctAnswers(), correctAnswers() + incorrectAnswers())),
    isGameFinished: computed(() => playableCountries().length === answerHistory().length),
  })),
  withMethods(
    (
      store,
      localStorage = inject(LocalStorageService),
      cService = inject(GameService),
      soundService = inject(SoundsService)
    ) => ({
      init: () => {
        const data = localStorage.getData<GameState>(GAME_STATUS_KEY);
        if (data) {
          patchState(store, { ...data });
        } else {
          patchState(store, cService.getInitialTurn());
        }
      },
      reset: () => {
        patchState(store, cService.getInitialTurn());
      },
      onImgLoad: () => {
        patchState(store, { isImgLoad: true });
      },
      checkSelection: (country: Country) => {
        const isCorrect = country.code === store.selectedCountry().code;
        soundService.playAnswerSound(isCorrect);
        const newHistory = [{ correct: isCorrect, country: store.selectedCountry() }, ...store.answerHistory()];
        patchState(store, { answerHistory: newHistory });

        if (isCorrect) {
          patchState(store, { correctAnswers: store.correctAnswers() + 1 });
        } else {
          patchState(store, { incorrectAnswers: store.incorrectAnswers() + 1 });
        }

        if (!store.isGameFinished()) {
          const { countryOptions, selectedCountry, remainCountries } = cService.getNextTurn(
            store.remainCountries(),
            store.playableCountries()
          );
          patchState(store, {
            countryOptions,
            selectedCountry,
            remainCountries,
          });
        }

        localStorage.saveData(GAME_STATUS_KEY, getState(store));
      },
      hasPersistedState: (): boolean => localStorage.hasData(GAME_STATUS_KEY),
      gameTimer$(): Observable<number> {
        return timer(0, TIMER_INTERVAL_MS).pipe(
          tap(() => {
            patchState(store, { gameTime: store.gameTime() + 1 });
          })
        );
      },
    })
  ),
  withHooks(store => {
    let subscriber: Subscription;

    return {
      onInit() {
        subscriber = timer(0, TIMER_INTERVAL_MS)
          .pipe(
            tap(() => {
              if (!store.isGameFinished()) {
                patchState(store, { gameTime: store.gameTime() + 1 });
              }
            })
          )
          .subscribe();
      },
      onDestroy() {
        if (subscriber) {
          subscriber.unsubscribe();
        }
      },
    };
  })
);
