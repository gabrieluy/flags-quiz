import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pointChipAnimations } from './animations/points-chip.animations';

@Component({
  selector: 'fq-points-chip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pointChipAnimations],
  template: `
    <div [@pointsAnimation]="points" class="select-none text-white border-round-md font-medium px-3 py-2">
      <i [@iconAnimation]="points" [class]="icon"></i> {{ points }}
    </div>
  `,
  styles: [
    `
      div {
        background: var(--purple-600);
      }
    `,
  ],
})
export class PointsChipComponent {
  @Input() points = 0;
  @Input() icon = 'pi pi-star';
}
