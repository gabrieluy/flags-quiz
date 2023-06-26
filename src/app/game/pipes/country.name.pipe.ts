import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Country } from '../interfaces/country.interface';

@Pipe({
  name: 'countryName',
  standalone: true,
})
export class CountryNamePipe implements PipeTransform {
  private _transloco = inject(TranslocoService);

  transform(country: Country): string {
    const activeLang = this._transloco.getActiveLang();
    if (activeLang === this._transloco.getDefaultLang()) {
      return country.name.common;
    }
    return country.translations[activeLang].common;
  }
}
