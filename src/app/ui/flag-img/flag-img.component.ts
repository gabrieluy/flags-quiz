import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fq-flag-img',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="border-round shadow-2"
      [class]="class"
      [src]="'assets/flags/4x3/' + flag.toLowerCase() + '.svg'"
      (load)="onImageLoad()" />
  `,
})
export class FlagImgComponent {
  @Input() flag!: string;
  @Input() class = 'w-7rem';

  @Output() imgLoad: EventEmitter<void> = new EventEmitter();

  onImageLoad() {
    this.imgLoad.emit();
  }
}
