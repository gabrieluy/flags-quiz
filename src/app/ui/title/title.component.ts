import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fq-title',
  standalone: true,
  styleUrls: ['title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1 class="my-2">Flags Quiz!</h1> `,
})
export class TitleComponent {
  @Input() text = '';
}
