import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from '@shared-ui/animations/fadeIn.animation';

export const fadeCard = trigger('fadeCard', [
  transition(':enter', [useAnimation(fadeIn, { params: { time: '0.5s' } })]),
]);
