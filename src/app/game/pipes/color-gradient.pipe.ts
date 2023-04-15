import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorGradient',
})
export class ColorGradientPipe implements PipeTransform {
  transform(value: number): string {
    const red = 255 * ((100 - value) / 100);
    const green = 200 * (value / 100);
    const blue = 50;
    return `rgb(${red}, ${green}, ${blue})`;
  }
}
