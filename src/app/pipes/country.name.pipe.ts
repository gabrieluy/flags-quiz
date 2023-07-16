import { Country } from '@core/data/interfaces/country.interface';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'countryName',
  standalone: true,
})
export class CountryNamePipe implements PipeTransform {
  private _transloco = inject(TranslocoService);

  transform(country: Country): string {
    const activeLang = this._transloco.getActiveLang();
    if (activeLang === 'en') {
      return country.name.common;
    }
    return country.translations[activeLang].common;
  }
}
