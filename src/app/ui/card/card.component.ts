import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fq-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white-alpha-90 border-round shadow-2 p-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
