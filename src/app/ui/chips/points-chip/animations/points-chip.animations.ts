import { animateChild, group, query, transition, trigger, useAnimation } from '@angular/animations';
import { dropAnimation } from 'src/app/ui/animations/drop.animation';
import { jumpAnimation } from 'src/app/ui/animations/jump.animation';
import { scaleAnimation } from 'src/app/ui/animations/scale.animation';
import { shakeAnimation } from 'src/app/ui/animations/shake.animation';

export const pointChipAnimations = [
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
];
