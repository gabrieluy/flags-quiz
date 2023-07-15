import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fm-option-wrapper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex justify-content-center">
      <h3>{{ label }}</h3>
    </div>
    <div class="flex justify-content-center">
      <ng-content></ng-content>
    </div>
  `,
})
export class OptionWrapperComponent {
  @Input() label = '';
}
