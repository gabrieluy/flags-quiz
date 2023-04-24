import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorGradient',
})
export class ColorGradientPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 30) {
      return 'var(--red-500)';
    }
    if (value < 70) {
      return 'var(--yellow-500)';
    }
    return 'var(--green-500)';
  }
}
