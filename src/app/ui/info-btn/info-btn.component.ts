import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'fq-info-btn',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p-button [label]="label + ''" [icon]="icon" [styleClass]="styleClass"></p-button> `,
})
export class InfoBtnComponent {
  @Input() label: string | number = '';
  @Input() icon = 'pi pi-info';
  @Input() styleClass = 'p-button-help p-button-sm';
}
