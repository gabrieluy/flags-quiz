import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animateChild, group, query, transition, trigger, useAnimation } from '@angular/animations';
import { errorAnimation } from './animations/error.animation';
import { successAnimation } from './animations/success.animation';
import { jumpAnimation } from './animations/jump.animation';
import { dropAnimation } from './animations/drop.animation';

@Component({
  selector: 'fq-points-chip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('pointsAnimation', [
      transition(':decrement', [
        group([
          useAnimation(errorAnimation, {
            params: {
              time: '1s',
            },
          }),
          query('@iconAnimation', animateChild()),
        ]),
      ]),
      transition(':increment', [
        group([
          useAnimation(successAnimation, {
            params: {
              time: '1s',
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
        background: #a855f7;
      }
    `,
  ],
})
export class PointsChipComponent {
  @Input() points = 0;
  @Input() icon = 'pi pi-star';
}
