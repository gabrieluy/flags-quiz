import { Pipe, PipeTransform } from '@angular/core';
import { GameStatus } from '../interfaces/game-status.interface';

@Pipe({
  name: 'progressPercentage',
  standalone: true,
})
export class ProgressPercentagePipe implements PipeTransform {
  transform(status: GameStatus): number {
    const value = Math.floor((status.answerHistory().length * 100) / status.playableCountriesCount);
    return value;
  }
}
