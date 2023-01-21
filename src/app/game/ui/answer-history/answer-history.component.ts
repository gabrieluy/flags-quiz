import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Answer } from 'src/app/core/game_manager/interfaces/game-status.interface';
import { CountryFlagComponent } from '../../../ui/country-flag/country-flag.component';
import { CorrectAnswerChipComponent } from '../correct-answer-chip/correct-answer-chip.component';

@Component({
  selector: 'fq-answer-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="history.length > 0" class="mb-5 font-bold text-3xl">
      <span class="text-900">Answer </span>
      <span class="text-blue-600">History:</span>
    </div>
    <div class="grid">
      <div *ngFor="let answer of history" class="col-12 md:col-6 lg:col-4">
        <div class="surface-card border-round shadow-2 p-2">
          <div class="flex justify-content-between">
            <fq-country-flag [country]="answer.country" class="align-self-start w-7rem"></fq-country-flag>
            <fq-correct-answer-chip [correct]="answer.correct"></fq-correct-answer-chip>
          </div>
          <h3 class="text-center">{{ answer.country.name }}</h3>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule, CountryFlagComponent, CorrectAnswerChipComponent],
})
export class AnswerHistoryComponent {
  @Input() dividerText = '';
  @Input() history: Answer[] = [];
}
