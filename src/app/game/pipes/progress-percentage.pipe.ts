import { Pipe, PipeTransform } from '@angular/core';
import { GameStatus } from '../interfaces/game-status.interface';

@Pipe({
  name: 'progressPercentage',
  standalone: true,
})
export class ProgressPercentagePipe implements PipeTransform {
  transform(status: GameStatus): number {
    const value = Math.floor((status.actualFlagCount * 100) / (status.actualFlagCount + status.remainingFlags));
    return value;
  }
}
