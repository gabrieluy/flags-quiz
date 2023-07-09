import { ChangeDetectionStrategy, Component, Input, WritableSignal, computed, signal } from '@angular/core';
import { CorrectAnswerChipComponent } from '@ui/chips/correct-answer-chip/correct-answer-chip.component';
import { Answer } from '@core/services/game-manager/interfaces/answer.interface';
import { FlagImgComponent } from '@ui/flag-img/flag-img.component';
import { CountryNamePipe } from '@pipes/country.name.pipe';
import { CardComponent } from '@ui/card/card.component';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { fadeCard } from './animations/fade-card.animation';

@Component({
  selector: 'fq-answer-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeCard],
  template: `
    <div class="grid">
      <div *ngFor="let answer of visibleHistory()" class="col-12 md:col-6 lg:col-4">
        <fq-card [@fadeCard]>
          <div class="flex justify-content-between">
            <fq-flag-img [flag]="answer.country.code" class="align-self-start w-7rem"></fq-flag-img>
            <fq-correct-answer-chip [correct]="answer.correct"></fq-correct-answer-chip>
          </div>
          <h3 class="text-center">{{ answer.country | countryName }}</h3>
        </fq-card>
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
  @Input() history: WritableSignal<Answer[]> = signal([]);

  public visibleHistorySize = signal<number>(6);

  public visibleHistory = computed<Answer[]>(() => {
    return this.history().slice(0, this.visibleHistorySize());
  });

  public visibleBtn = computed<boolean>(() => {
    return this.history().length > this.visibleHistory().length;
  });

  showMoreItems(): void {
    this.visibleHistorySize.update(value => value + 3);
  }
}
