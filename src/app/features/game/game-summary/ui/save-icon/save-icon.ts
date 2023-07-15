import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { saveIcon } from './animations/save-icon.animation';

@Component({
  selector: 'fm-save-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [saveIcon],
  template: `
    <div class="select-none text-primary px-1 py-2">
      <i [@saveIcon]="points" class="pi pi-save "></i>
    </div>
  `,
  styles: [
    `
      i {
        opacity: 0;
      }
    `,
  ],
})
export class SaveIconComponent {
  @Input() points = 0;
}
