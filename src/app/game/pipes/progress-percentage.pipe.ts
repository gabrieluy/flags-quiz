import { Pipe, PipeTransform } from '@angular/core';
import { GameStatus } from '../interfaces/game-status.interface';

@Pipe({
  name: 'progressPercentage',
})
export class ProgressPercentagePipe implements PipeTransform {
  transform(status: GameStatus): number {
    console.log(`actual = ${status.actualFlagCount} total: ${status.actualFlagCount + status.remainingFlags}`);
    const value = Math.floor((status.actualFlagCount * 100) / (status.actualFlagCount + status.remainingFlags));
    console.log(`valor = ${value}`);
    return value;
  }
}
