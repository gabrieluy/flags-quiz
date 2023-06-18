import { transition, style, animate, trigger } from '@angular/animations';

export const fadeImage = trigger('fadeImage', [
  transition('true => false', [style({ opacity: 0 })]),
  transition('false => true', [
    style({ opacity: 0 }),
    animate('0.2s', style({ opacity: 0 })),
    animate('0.2s ease-in-out', style({ opacity: 1 })),
  ]),
]);
