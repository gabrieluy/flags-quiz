import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameStatus } from 'src/app/game/interfaces/game-status.interface';

@Component({
  selector: 'fq-game-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap align-content-center min-h-screen justify-content-center p-2">
      <fq-card *transloco="let t; read: 'summary'">
        <div class="flex flex-row flex-wrap">
          <div class="flex justify-content-center col-12">
            <h2>{{ t('title') }}</h2>
          </div>
          <div class="flex justify-content-center col-12">
            <img class="col-12" src="assets/images/pet.webp" />
          </div>
          <div class="flex justify-content-center col-12">
            <ul>
              <li class="flex mb-3 align-items-center">
                <i class="pi pi-star-fill text-yellow-500 mr-2"></i>
                <span class="font-medium"> {{ t('points', { points: status.points }) }}</span>
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
              (click)="reset()"></button>
            <button
              pButton
              icon="pi pi-share-alt"
              [label]="t('share')"
              class="col-11 md:col-5"
              (click)="share()"></button>
          </div>
        </div>
      </fq-card>
    </div>
  `,
})
export class GameSummaryComponent {
  @Input() public status!: GameStatus;
  @Output() resetClick: EventEmitter<void> = new EventEmitter();

  public reset(): void {
    this.resetClick.emit();
  }

  public share(): void {
    throw new Error('Method not implemented.');
  }
}
