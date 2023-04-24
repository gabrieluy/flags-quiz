import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GameManagerService } from './game-manager.service';
import { Country } from './interfaces/country.interface';
import { GameStatus } from './interfaces/game-status.interface';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'fq-game',
  template: `
    <p-speedDial
      class="absolute top-0 left-0 p-2"
      showIcon="pi pi-bars"
      hideIcon="pi pi-times"
      [model]="items"
      direction="right"
      [transitionDelay]="80"></p-speedDial>
    <ng-container *ngIf="status$ | async as status; else loading">
      <ng-container *ngTemplateOutlet="!status.isGameFinished ? playGame : summary; context: { status: status }">
      </ng-container>
    </ng-container>

    <ng-template #playGame let-status="status">
      <fq-game-play-status [status]="status" (selectCountry)="checkSelection($event)"></fq-game-play-status>
      <div class="mt-5 px-2">
        <fq-answer-history [history]="status.answerHistory"></fq-answer-history>
      </div>
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
  private _router = inject(Router);

  public status$: Observable<GameStatus>;
  public items: MenuItem[] = [
    {
      icon: 'pi pi-home',
      command: () => this._router.navigate(['/']),
    },
    {
      icon: 'pi pi-cog',
      command: () => this._router.navigate(['/settings']),
    },
    {
      icon: 'pi pi-refresh',
      command: () => this.resetGame(),
    },
  ];

  constructor() {
    this.resetGame();
    this.status$ = this._gameManager.getStatus();
  }

  public checkSelection(country: Country): void {
    this._gameManager.checkSelection(country);
  }

  public resetGame(): void {
    this._gameManager.reset();
  }
}
