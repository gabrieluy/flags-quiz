import { transition, style, animate, trigger } from '@angular/animations';

export const transformOpt = trigger('transformOpt', [
  transition('false => true', [
    animate('0.2s', style({ transform: 'scale(0)' })),
    animate('0.2s ease-in-out', style({ transform: 'scale(1)' })),
  ]),
]);
