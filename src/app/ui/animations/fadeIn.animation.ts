import { animation, style, animate, keyframes } from '@angular/animations';

export const fadeIn = animation([animate('{{ time }}', keyframes([style({ opacity: 0 }), style({ opacity: 1 })]))]);
