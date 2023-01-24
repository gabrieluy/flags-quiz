import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from 'src/app/core/game_manager/interfaces/country.interface';

@Component({
  selector: 'fq-country-flag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <img class="border-round shadow-2" [class]="class" [src]="'assets/flags/4x3/' + country?.flag" /> `,
})
export class CountryFlagComponent {
  @Input() country: Country | undefined;
  @Input() class = 'w-7rem';
}
