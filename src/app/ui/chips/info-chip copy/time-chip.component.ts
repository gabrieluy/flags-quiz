import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SecondsToTimePipe } from '@pipes/secods-to-time.pipe';

@Component({
  selector: 'fq-time-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="select-none text-white border-round-md font-medium px-3 py-2">
      <i class="pi pi-clock"></i> {{ seconds | secondsToTime }}
    </div>
  `,
  styles: [
    `
      div {
        background: var(--purple-500);
      }
    `,
  ],
  imports: [SecondsToTimePipe],
})
export class TimeChipComponent {
  @Input() seconds!: number;
}
