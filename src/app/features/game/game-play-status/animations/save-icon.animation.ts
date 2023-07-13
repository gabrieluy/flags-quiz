import { animateChild, transition, animate, trigger, style, state, query, group } from '@angular/animations';

export const saveIcon = [
  trigger('saveIcon', [
    transition(':increment', [animate('1s ease-in-out', style({ opacity: 1, transform: 'rotate(360deg)' }))]),
    transition(':decrement', [animate('1s ease-in-out', style({ opacity: 1, transform: 'rotate(360deg)' }))]),
  ]),
];
