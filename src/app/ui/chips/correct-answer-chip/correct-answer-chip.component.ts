import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'fm-correct-answer-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *transloco="let t; read: 'common'">
      <p-chip
        *ngIf="correct; else errorChip"
        class="justify-self-end"
        styleClass="bg-green-500 text-white font-medium"
        [label]="t('correct')"
        icon="pi pi-check"></p-chip>
      <ng-template #errorChip>
        <p-chip
          class="justify-self-end"
          styleClass="bg-red-500 text-white font-medium"
          [label]="t('incorrect')"
          icon="pi pi-times">
        </p-chip>
      </ng-template>
    </ng-container>
  `,
  imports: [CommonModule, ChipModule, TranslocoModule],
})
export class CorrectAnswerChipComponent {
  @Input() correct = false;
}
