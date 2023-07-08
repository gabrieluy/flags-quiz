import { animateChild, group, query, transition, trigger, useAnimation } from '@angular/animations';
import { scale } from '@shared-ui/animations/scale.animation';
import { shake } from '@shared-ui/animations/shake.animation';
import { drop } from '@shared-ui/animations/drop.animation';
import { jump } from '@shared-ui/animations/jump.animation';

export const pointChipAnimations = [
  trigger('pointsAnimation', [
    transition(':decrement', [
      group([
        useAnimation(shake, {
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
        useAnimation(scale, {
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
      useAnimation(jump, {
        params: {
          time: '1s',
          jumpColor: 'var(--yellow-500)',
          color: 'var(--surface-0)',
        },
      }),
    ]),
    transition(':decrement', [
      useAnimation(drop, {
        params: {
          time: '1s',
        },
      }),
    ]),
  ]),
];
