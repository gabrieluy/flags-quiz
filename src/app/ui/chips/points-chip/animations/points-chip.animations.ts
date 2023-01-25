import { animateChild, group, query, transition, trigger, useAnimation } from '@angular/animations';
import { drop } from 'src/app/ui/animations/drop.animation';
import { jump } from 'src/app/ui/animations/jump.animation';
import { scale } from 'src/app/ui/animations/scale.animation';
import { shake } from 'src/app/ui/animations/shake.animation';

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
          color: 'var(--yellow-500)',
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
