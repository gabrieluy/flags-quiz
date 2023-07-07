import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FlagSrcPipe } from 'src/app/game/pipes/flag-src.pipe';

@Component({
  selector: 'fq-flag-img',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <img class="border-round shadow-2" [class]="class" [src]="flag | flagSrc" (load)="onImageLoad()" /> `,
  imports: [FlagSrcPipe],
})
export class FlagImgComponent {
  @Input() flag!: string;
  @Input() class = 'w-7rem';

  @Output() imgLoad: EventEmitter<void> = new EventEmitter();

  onImageLoad() {
    this.imgLoad.emit();
  }
}
