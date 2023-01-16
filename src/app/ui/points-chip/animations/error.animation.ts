import { animation, style, animate, keyframes } from '@angular/animations';

export const errorAnimation = animation([
  animate(
    '{{ time }}',
    keyframes([
      style({ background: '#ff4032', transform: 'translate(2px, 1px) rotate(0deg)', offset: 0 }),
      style({ transform: `translate(-1px, -2px) rotate(-2deg)`, offset: 0.1 }),
      style({ transform: `translate(-3px, 0) rotate(3deg)`, offset: 0.2 }),
      style({ transform: `translate(0, 2px) rotate(0deg)`, offset: 0.3 }),
      style({ transform: `translate(1px, -1px) rotate(1deg)`, offset: 0.4 }),
      style({ transform: `translate(-1px, 2px) rotate(-1deg)`, offset: 0.5 }),
      style({ transform: `translate(-3px, 1px) rotate(0deg)`, offset: 0.6 }),
      style({ transform: `translate(2px, 1px) rotate(-2deg)`, offset: 0.7 }),
      style({ transform: `translate(-1px, -1px) rotate(4deg)`, offset: 0.8 }),
      style({ transform: `translate(2px, 2px) rotate(0deg)`, offset: 0.9 }),
    ])
  ),
]);
