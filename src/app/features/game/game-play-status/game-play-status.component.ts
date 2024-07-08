import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStore } from '@core/game/game.store';

import { transformOpt } from './animations/transform-option.animation';
import { fadeImage } from './animations/fade-image.animation';
import { saveIcon } from './animations/save-icon.animation';

@Component({
  selector: 'fm-game-play-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeImage, transformOpt, saveIcon],
  template: `
    <div class="m-3">
      <div class="flex justify-content-center">
        <fm-card class="col-12 md:col-6">
          <div class="flex flex-row flex-wrap justify-content-end mb-2 gap-2">
            <fm-save-icon [points]="gameStore.points()"></fm-save-icon>
            <fm-points-chip [points]="gameStore.points()"></fm-points-chip>
            <fm-time-chip [seconds]="gameStore.gameTime()"></fm-time-chip>
          </div>
          <p-progressBar
            [value]="gameStore.progressPercentage()"
            [color]="gameStore.successRate() | colorGradient"
            [showValue]="false"></p-progressBar>
        </fm-card>
      </div>
      <div class="flex justify-content-center mt-2">
        <fm-flag-img
          [hidden]="!gameStore.isImgLoad()"
          [@fadeImage]="gameStore.isImgLoad()"
          (imgLoad)="gameStore.onImgLoad()"
          [flag]="gameStore.selectedCountry().code"
          class="h-13rem md:h-20rem">
        </fm-flag-img>
      </div>
      <div class="grid mt-2">
        <div *ngFor="let country of gameStore.countryOptions()" class="p-1 col-12 md:col-6 lg:col-4">
          <button
            pButton
            [disabled]="!gameStore.isImgLoad()"
            [@transformOpt]="gameStore.isImgLoad()"
            (click)="gameStore.checkSelection(country)"
            [label]="country | countryName"
            class="w-full"></button>
        </div>
      </div>
      <div class="mt-2"></div>
    </div>
  `,
})
export class GamePlayStatusComponent {
  public gameStore = inject(GameStore);
}
