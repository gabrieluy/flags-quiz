import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GameManagerService } from './game-manager.service';
import { Country } from './interfaces/country.interface';
import { GameStatus } from './interfaces/game-status.interface';

@Component({
  selector: 'fq-game',
  providers: [GameManagerService],
  template: `
    <ng-container *ngIf="status$ | async as status; else loading">
      <ng-container *ngTemplateOutlet="!status.isGameFinished ? playGame : summary; context: { status: status }">
      </ng-container>
      <div class="mt-5">
        <fq-answer-history [history]="status.answerHistory"></fq-answer-history>
      </div>
    </ng-container>

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
  private _gameManager = inject(GameManagerService);

  public status$: Observable<GameStatus>;

  constructor() {
    this.status$ = this._gameManager.getStatus();
  }

  public checkSelection(country: Country): void {
    this._gameManager.checkSelection(country);
  }

  public resetGame(): void {
    this._gameManager.reset();
  }
}
