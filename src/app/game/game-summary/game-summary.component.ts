import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { GameStatus } from 'src/app/game/interfaces/game-status.interface';
import { SecondsToTimePipe } from '../pipes/secods-to-time.pipe';

@Component({
  selector: 'fq-game-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap align-content-center justify-content-center p-2 mt-5">
      <fq-card *transloco="let t; read: 'summary'">
        <div class="flex flex-row flex-wrap">
          <div class="flex justify-content-center col-12">
            <h2>{{ t('title') }}</h2>
          </div>
          <div class="flex justify-content-center col-12">
            <img class="w-10rem h-10rem" src="assets/images/pet.png" />
          </div>
          <div class="flex justify-content-center col-12">
            <ul>
              <li class="flex mb-3 align-items-center">
                <i class="pi pi-star-fill text-yellow-500 mr-2"></i>
                <span class="font-medium"> {{ t('points', { points: status.points }) }}</span>
              </li>
              <li class="flex mb-3 align-items-center">
                <i class="pi pi-clock text-purple-500 mr-2"></i>
                <span class="font-medium"> {{ status.gameTime | secondsToTime }}</span>
              </li>
              <li class="flex mb-3 align-items-center">
                <i class="pi pi-percentage text-green-500 mr-2"></i>
                <span class="font-medium"> {{ t('successRate', { rate: status.successRate }) }}</span>
              </li>
              <li class="flex mb-3 align-items-center">
                <i class="pi pi-check text-green-500 mr-2"></i>
                <span class="font-medium"> {{ t('correctAnswers', { answers: status.correctAnswers }) }}</span>
              </li>
              <li class="flex align-items-center">
                <i class="pi pi-times text-red-500 mr-2"></i>
                <span class="font-medium"> {{ t('incorrectAnswers', { answers: status.incorrectAnswers }) }}</span>
              </li>
            </ul>
          </div>
          <div class="flex flex-wrap justify-content-center col-12 mt-3 gap-3">
            <button
              pButton
              icon="pi pi-replay"
              [label]="t('restart')"
              class="col-11 md:col-5"
              (click)="this.resetClick.emit()"></button>
            <button
              pButton
              icon="pi pi-twitter"
              [label]="t('share')"
              class="col-11 md:col-5 p-button-help"
              (click)="share()"></button>
          </div>
        </div>
      </fq-card>
    </div>
    <div class="mt-5 px-2">
      <fq-answer-history [history]="status.answerHistory"></fq-answer-history>
    </div>
  `,
})
export class GameSummaryComponent {
  private _transloco = inject(TranslocoService);
  private _secondeToTime = inject(SecondsToTimePipe);

  @Input() public status!: GameStatus;
  @Output() resetClick: EventEmitter<void> = new EventEmitter();

  public share(): void {
    const { points, gameTime } = this.status;
    const time = this._secondeToTime.transform(gameTime);
    const text = this._transloco.translate('share-text', { points, time }, 'summary');
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url);
  }
}
