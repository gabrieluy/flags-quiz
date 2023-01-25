import { animation, style, animate, keyframes } from '@angular/animations';

export const scale = animation([
  animate(
    '{{ time }}',
    keyframes([
      style({ background: `{{ background }}`, scale: 1, offset: 0.5 }),
      style({ scale: 1.25, offset: 0.5 }),
      style({ scale: 1, offset: 1 }),
    ])
  ),
]);
