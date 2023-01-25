import { animation, style, animate, keyframes } from '@angular/animations';

export const slideR = animation([
  animate(
    '{{ time }}',
    keyframes([
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      style({ transform: 'translateX(0)', opacity: 1 }),
    ])
  ),
]);
