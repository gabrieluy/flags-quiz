import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagSrc',
  standalone: true,
})
export class FlagSrcPipe implements PipeTransform {
  transform(flag: string): string {
    return `assets/flags/4x3/${flag.toLowerCase()}.svg`;
  }
}
