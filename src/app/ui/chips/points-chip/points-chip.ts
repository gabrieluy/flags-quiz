import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animateChild, group, query, transition, trigger, useAnimation } from '@angular/animations';
import { shakeAnimation } from '../../animations/shake.animation';
import { scaleAnimation } from '../../animations/scale.animation';
import { jumpAnimation } from '../../animations/jump.animation';
import { dropAnimation } from '../../animations/drop.animation';

@Component({
  selector: 'fq-points-chip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('pointsAnimation', [
      transition(':decrement', [
        group([
          useAnimation(shakeAnimation, {
            params: {
              time: '1s',
              background: 'var(--red-500)',
            },
          }),
          query('@iconAnimation', animateChild()),
        ]),
      ]),
      transition(':increment', [
        group([
          useAnimation(scaleAnimation, {
            params: {
              time: '1s',
              background: 'var(--green-500)',
            },
          }),
          query('@iconAnimation', animateChild()),
        ]),
      ]),
    ]),
    trigger('iconAnimation', [
      transition(':increment', [
        useAnimation(jumpAnimation, {
          params: {
            time: '1s',
            color: 'var(--yellow-500)',
          },
        }),
      ]),
      transition(':decrement', [
        useAnimation(dropAnimation, {
          params: {
            time: '1s',
          },
        }),
      ]),
    ]),
  ],
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
