import { animation, style, animate, keyframes } from '@angular/animations';

export const jump = animation([
  animate(
    '{{ time }}',
    keyframes([
      style({ color: '{{ jumpColor }}', transform: `translate(0, 0) scale(1.25, 0.75)`, offset: 0 }),
      style({ transform: `translate(0, -100%) scale(1, 1)`, offset: 0.5 }),
      style({ transform: `translate(0, -100%) rotate(15deg)`, offset: 0.55 }),
      style({ transform: `translate(0, -100%) rotate(-15deg)`, offset: 0.6 }),
      style({ transform: `translate(0, -100%) rotate(15deg)`, offset: 0.65 }),
      style({ transform: `translate(0, -100%) rotate(-15deg)`, offset: 0.7 }),
      style({ color: '{{ color }}', transform: `translate(0, 0)`, offset: 1 }),
    ])
  ),
]);
