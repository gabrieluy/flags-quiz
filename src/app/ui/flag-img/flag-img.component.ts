import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fq-flag-img',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img class="border-round shadow-2" [class]="class" [src]="'assets/flags/4x3/' + flag.toLowerCase() + '.svg'" />
  `,
})
export class FlagImgComponent {
  @Input() flag!: string;
  @Input() class = 'w-7rem';
}
