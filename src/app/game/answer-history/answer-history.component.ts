import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Answer } from 'src/app/game/interfaces/game-status.interface';
import { slideR } from 'src/app/ui/animations/slideR.animation';

@Component({
  selector: 'fq-answer-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('slideR', [transition(':enter', [useAnimation(slideR, { params: { time: '0.2s' } })])])],
  template: `
    <div class="grid">
      <div *ngFor="let answer of history" class="col-12 md:col-6 lg:col-4">
        <fq-card @slideR>
          <div class="flex justify-content-between">
            <fq-flag-img [flag]="answer.country.cca2" class="align-self-start w-7rem"></fq-flag-img>
            <fq-correct-answer-chip [correct]="answer.correct"></fq-correct-answer-chip>
          </div>
          <h3 class="text-center">{{ answer.country.name['common'] }}</h3>
        </fq-card>
      </div>
    </div>
  `,
})
export class AnswerHistoryComponent {
  @Input() history: Answer[] = [];
}
