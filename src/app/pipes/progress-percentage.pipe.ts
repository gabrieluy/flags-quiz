import { GameStatus } from '@core/services/game-manager/interfaces/game-status.interface';
import { Pipe, PipeTransform } from '@angular/core';

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
