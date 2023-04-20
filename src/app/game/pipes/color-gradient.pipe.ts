import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorGradient',
})
export class ColorGradientPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 20) {
      return 'var(--red-500)';
    }
    if (value < 40) {
      return 'var(--orange-500)';
    }
    if (value < 60) {
      return 'var(--orange-200)';
    }
    if (value < 80) {
      return 'var(--green-200)';
    }
    return 'var(--green-500)';
  }
}
