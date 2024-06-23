import { Component, Input, OnInit, inject } from '@angular/core';
import { GameStore } from '@core/game/game.store';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { SoundsService } from '../../core/services/sounds/sounds.service';

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
    <ng-container>
      <ng-container *ngTemplateOutlet="!this.gameStore.isGameFinished() ? playGame : summary"> </ng-container>
    </ng-container>

    <ng-template #playGame>
      <fm-game-play-status></fm-game-play-status>
      <div class="mt-5 px-2">
        <fm-answer-history></fm-answer-history>
      </div>
    </ng-template>

    <ng-template #summary let-status="status">
      <fm-game-summary></fm-game-summary>
    </ng-template>
  `,
})
export class GameComponent implements OnInit {
  @Input() isNewGame?: boolean; // from query params
  public gameStore = inject(GameStore);
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
      this.gameStore.reset();
      return;
    }
    this.gameStore.init();
  }

  public resetGame(): void {
    this._sounds.playStartLevelSound();
    this.gameStore.reset();
  }
}
