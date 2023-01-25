import { animation, style, animate, keyframes } from '@angular/animations';

export const drop = animation([
  animate(
    '{{ time }}',
    keyframes([
      style({ transform: `translate(0, 0) scale(1.25, 0.75)`, offset: 0 }),
      style({ transform: `translateY(0)`, offset: 0.5 }),
      style({ transform: `translateY(50px)`, opacity: 0, offset: 1 }),
    ])
  ),
]);
