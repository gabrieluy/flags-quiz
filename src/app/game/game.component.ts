import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameManagerService } from '../core/game_manager/game-manager.service';
import { Country } from '../core/game_manager/interfaces/country.interface';
import { GameStatus } from '../core/game_manager/interfaces/game-status.interface';

@Component({
  selector: 'fq-game',
  providers: [GameManagerService],
  template: `
    <div class="m-4" *ngIf="status$ | async as status; else loading">
      <ng-container *ngTemplateOutlet="!status.isGameFinished ? playGame : summary; context: { status: status }">
      </ng-container>
      <div class="mt-5">
        <fq-answer-history [history]="status.answerHistory"></fq-answer-history>
      </div>
    </div>

    <ng-template #playGame let-status="status">
      <fq-game-play-status [status]="status" (selectCountry)="checkSelection($event)"></fq-game-play-status>
    </ng-template>

    <ng-template #summary let-status="status">
      <fq-game-summary [status]="status" (resetClick)="resetGame()"></fq-game-summary>
    </ng-template>

    <ng-template #loading>
      {{ 'Loading ...' }}
    </ng-template>
  `,
})
export class GameComponent {
  public status$: Observable<GameStatus>;

  constructor(private gameManager: GameManagerService) {
    this.status$ = this.gameManager.getStatus();
  }

  public checkSelection(country: Country): void {
    this.gameManager.checkSelection(country);
  }

  public resetGame(): void {
    this.gameManager.reset();
  }
}
