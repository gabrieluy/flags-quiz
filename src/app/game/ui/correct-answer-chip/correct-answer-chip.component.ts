import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'fq-correct-answer-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p-chip
      *ngIf="correct; else errorChip"
      class="justify-self-end"
      styleClass="bg-green-500 text-white font-medium"
      label="Correct"
      icon="pi pi-check"></p-chip>
    <ng-template #errorChip>
      <p-chip
        class="justify-self-end"
        styleClass="bg-red-500 text-white font-medium"
        label="Incorrect"
        icon="pi pi-times">
      </p-chip>
    </ng-template>`,
  imports: [CommonModule, ChipModule],
})
export class CorrectAnswerChipComponent {
  @Input() correct = false;
}
