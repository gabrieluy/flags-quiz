import { transition, style, animate, trigger } from '@angular/animations';
export const fadeInImage = trigger('fadeInImage', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 0 })),
    animate('0.5s ease-in-out', style({ opacity: 1 })),
  ]),
]);
