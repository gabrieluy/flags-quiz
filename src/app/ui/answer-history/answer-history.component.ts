import { CorrectAnswerChipComponent } from '@ui/chips/correct-answer-chip/correct-answer-chip.component';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FlagImgComponent } from '@ui/flag-img/flag-img.component';
import { Answer } from '@core/game/interfaces/answer.interface';
import { CountryNamePipe } from '@pipes/country.name.pipe';
import { CardComponent } from '@ui/card/card.component';
import { TranslocoModule } from '@ngneat/transloco';
import { GameStore } from '@core/game/game.store';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { fadeCard } from './animations/fade-card.animation';

@Component({
  selector: 'fm-answer-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeCard],
  template: `
    <div class="grid">
      <div *ngFor="let answer of visibleHistory()" class="col-12 md:col-6 lg:col-4">
        <fm-card [@fadeCard]>
          <div class="flex justify-content-between">
            <fm-flag-img [flag]="answer.country.code" class="align-self-start w-7rem"></fm-flag-img>
            <fm-correct-answer-chip [correct]="answer.correct"></fm-correct-answer-chip>
          </div>
          <h3 class="text-center">{{ answer.country | countryName }}</h3>
        </fm-card>
      </div>
    </div>
    <div *ngIf="visibleBtn()" class="text-center my-3">
      <button
        *transloco="let t; read: 'common'"
        pButton
        [label]="t('showMore')"
        (click)="showMoreItems()"
        class="p-button-primary p-button-outlined bg-white-alpha-90"></button>
    </div>
  `,
  imports: [
    CommonModule,
    FlagImgComponent,
    CorrectAnswerChipComponent,
    CardComponent,
    ButtonModule,
    CountryNamePipe,
    TranslocoModule,
  ],
})
export class AnswerHistoryComponent {
  public gameStore = inject(GameStore);
  public visibleHistorySize = signal<number>(6);

  public visibleHistory = computed<Answer[]>(() => {
    return this.gameStore.answerHistory().slice(0, this.visibleHistorySize());
  });

  public visibleBtn = computed<boolean>(() => {
    return this.gameStore.answerHistory().length > this.visibleHistory().length;
  });

  showMoreItems(): void {
    this.visibleHistorySize.update(value => value + 3);
  }
}
