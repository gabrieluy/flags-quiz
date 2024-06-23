import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SecondsToTimePipe } from '@pipes/secods-to-time.pipe';
import { TranslocoService } from '@ngneat/transloco';
import { GameStore } from '@core/game/game.store';

import { SHARE_URLS, SharePlatform } from './constants/game-summary.constants';

@Component({
  selector: 'fm-game-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap align-content-center justify-content-center p-2 mt-5">
      <fm-card *transloco="let t; read: 'summary'">
        <div class="flex flex-row flex-wrap">
          <div class="flex justify-content-center col-12">
            <h2>{{ t('title') }}</h2>
          </div>
          <div class="flex justify-content-center col-12">
            <img class="w-10rem h-10rem" src="assets/images/pet.png" />
          </div>
          <div class="flex justify-content-center col-12">
            <ul>
              <fm-summary-item
                icon="star-fill"
                color="yellow"
                text="{{ t('points', { points: gameStore.points() }) }}"></fm-summary-item>
              <fm-summary-item
                icon="clock"
                color="purple"
                text="{{ gameStore.gameTime() | secondsToTime }}"></fm-summary-item>
              <fm-summary-item
                icon="percentage"
                color="green"
                text="{{ t('successRate', { rate: gameStore.successRate() }) }}"></fm-summary-item>
              <fm-summary-item
                icon="check"
                color="green"
                text="{{ t('correctAnswers', { answers: gameStore.correctAnswers() }) }}"></fm-summary-item>
              <fm-summary-item
                icon="times"
                color="red"
                text="{{ t('incorrectAnswers', { answers: gameStore.incorrectAnswers() }) }}"></fm-summary-item>
            </ul>
          </div>
          <div class="flex flex-wrap justify-content-center col-12 mt-3 gap-3">
            <button
              pButton
              icon="pi pi-replay"
              [label]="t('restart')"
              class="col-11 md:col-5"
              (click)="gameStore.reset()"></button>
            <button
              pButton
              icon="pi pi-share-alt"
              [label]="t('share')"
              class="col-11 md:col-5 p-button-outlined"
              (click)="showDialog()"></button>
          </div>
        </div>
      </fm-card>
    </div>
    <div class="mt-5 px-2">
      <fm-answer-history></fm-answer-history>
    </div>
    <p-dialog [header]="t('share')" [(visible)]="dialogVisible" class="m-2" *transloco="let t; read: 'summary'">
      <div class="flex flex-wrap justify-content-center col-12 mt-3 gap-3">
        <button
          pButton
          icon="pi pi-twitter"
          label="twitter"
          class="col-11 p-button-help border-none"
          (click)="share('twitter')"></button>
        <button
          pButton
          icon="pi pi-whatsapp"
          label="whatsapp"
          class="col-11 bg-green-600 border-none"
          (click)="share('whatsapp')"></button>
      </div>
    </p-dialog>
  `,
})
export class GameSummaryComponent {
  private _transloco = inject(TranslocoService);
  private _secondeToTime = inject(SecondsToTimePipe);
  public dialogVisible = false;
  public gameStore = inject(GameStore);

  public showDialog(): void {
    this.dialogVisible = true;
  }

  public share(platform: SharePlatform): void {
    const url = SHARE_URLS[platform];
    const { points, gameTime } = this.gameStore;
    const time = this._secondeToTime.transform(gameTime());
    const text = this._transloco.translate('share-text', { points: points(), time });
    const urlWithText = `${url}${encodeURIComponent(text)}`;
    window.open(urlWithText);
  }
}
