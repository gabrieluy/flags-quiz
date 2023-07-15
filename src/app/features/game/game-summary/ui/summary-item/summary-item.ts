import { Component, Input } from '@angular/core';

@Component({
  selector: 'fm-summary-item',
  template: `
    <li class="flex mb-3 align-items-center">
      <i [class]="iconClasses"></i>
      <span class="font-bold">{{ text }}</span>
    </li>
  `,
  standalone: true,
})
export class SummaryItemComponent {
  @Input() icon!: string;
  @Input() color!: string;
  @Input() text!: string;

  get iconClasses(): string[] {
    return ['pi', `pi-${this.icon}`, `text-${this.color}-500`, 'mr-2'];
  }
}
