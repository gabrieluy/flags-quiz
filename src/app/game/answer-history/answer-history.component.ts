import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Answer } from 'src/app/game/interfaces/game-status.interface';
import { slideR } from 'src/app/ui/animations/slideR.animation';

@Component({
  selector: 'fq-answer-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('slideR', [transition(':enter', [useAnimation(slideR, { params: { time: '0.2s' } })])])],

  template: `
    <div *ngIf="history.length > 0" class="mb-5 font-bold text-3xl">
      <span class="text-900">Answer </span>
      <span class="text-blue-600">History:</span>
    </div>
    <div class="grid">
      <div *ngFor="let answer of history" class="col-12 md:col-6 lg:col-4">
        <div @slideR class="surface-card border-round shadow-2 p-2">
          <div class="flex justify-content-between">
            <fq-flag-img [flag]="answer.country.flag" class="align-self-start w-7rem"></fq-flag-img>
            <fq-correct-answer-chip [correct]="answer.correct"></fq-correct-answer-chip>
          </div>
          <h3 class="text-center">{{ answer.country.name }}</h3>
        </div>
      </div>
    </div>
  `,
})
export class AnswerHistoryComponent {
  @Input() history: Answer[] = [];
}
