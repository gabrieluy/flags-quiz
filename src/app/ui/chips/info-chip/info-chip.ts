import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fq-info-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="select-none text-white border-round-md font-medium px-3 py-2"><i [class]="icon"></i> {{ label }}</div>
  `,
  styles: [
    `
      div {
        background: var(--purple-500);
      }
    `,
  ],
})
export class InfoChipComponent {
  @Input() label: number | string = '';
  @Input() icon = 'pi pi-star';
}
