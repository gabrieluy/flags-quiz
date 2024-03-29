import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { GameManagerService } from '../../core/services/game-manager/game-manager.service';
import { SoundsService } from '../../core/services/sounds/sounds.service';
import { Country } from '../../core/data/interfaces/country.interface';

@Component({
  selector: 'fm-game',
  template: `
    <p-speedDial
      class="absolute top-0 left-0 p-2"
      showIcon="pi pi-bars"
      hideIcon="pi pi-times"
      [model]="items"
      direction="right"
      [transitionDelay]="80"></p-speedDial>
    <ng-container *ngIf="this.gameManager.status() as status">
      <ng-container *ngTemplateOutlet="!status.isGameFinished ? playGame : summary; context: { status }">
      </ng-container>
    </ng-container>

    <ng-template #playGame let-status="status">
      <fm-game-play-status [status]="status" (selectCountry)="checkSelection($event)"></fm-game-play-status>
      <div class="mt-5 px-2">
        <fm-answer-history [history]="status.answerHistory"></fm-answer-history>
      </div>
    </ng-template>

    <ng-template #summary let-status="status">
      <fm-game-summary [status]="status" (resetClick)="resetGame()"></fm-game-summary>
    </ng-template>
  `,
})
export class GameComponent implements OnInit, OnDestroy {
  @Input() isNewGame?: boolean; // from query params
  public gameManager = inject(GameManagerService);
  private _router = inject(Router);
  private _sounds = inject(SoundsService);

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

  ngOnInit(): void {
    this._sounds.playStartLevelSound();
    if (this.isNewGame) {
      this.gameManager.reset();
      return;
    }
    this.gameManager.init();
  }

  public checkSelection(country: Country): void {
    this.gameManager.checkSelection(country);
  }

  public resetGame(): void {
    this._sounds.playStartLevelSound();
    this.gameManager.reset();
  }

  ngOnDestroy(): void {
    this.gameManager.quitGame();
  }
}
