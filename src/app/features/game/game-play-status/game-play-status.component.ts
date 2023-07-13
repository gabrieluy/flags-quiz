import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameStatus } from '@core/services/game-manager/interfaces/game-status.interface';
import { Country } from '@core/data/interfaces/country.interface';

import { transformOpt } from './animations/transform-option.animation';
import { fadeImage } from './animations/fade-image.animation';
import { saveIcon } from './animations/save-icon.animation';

@Component({
  selector: 'fq-game-play-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeImage, transformOpt, saveIcon],
  template: `
    <div class="m-3">
      <div class="flex justify-content-center">
        <fq-card class="col-12 md:col-6">
          <div *ngIf="status" class="flex flex-row flex-wrap justify-content-end mb-2 gap-2">
            <fq-save-icon [points]="status.points"></fq-save-icon>
            <fq-points-chip [points]="status.points"></fq-points-chip>
            <fq-time-chip [seconds]="status.gameTime"></fq-time-chip>
          </div>
          <p-progressBar
            [value]="status | progressPercentage"
            [color]="status.successRate | colorGradient"
            [showValue]="false"></p-progressBar>
        </fq-card>
      </div>
      <div class="flex justify-content-center mt-2">
        <fq-flag-img
          [hidden]="!isImgLoad"
          [@fadeImage]="isImgLoad"
          (imgLoad)="onImgLoad()"
          [flag]="status.selectedCountry.code"
          class="h-13rem md:h-20rem">
        </fq-flag-img>
      </div>
      <div class="grid mt-2">
        <div *ngFor="let country of status?.countryOptions" class="p-1 col-12 md:col-6 lg:col-4">
          <button
            pButton
            [disabled]="!isImgLoad"
            [@transformOpt]="isImgLoad"
            (click)="select(country)"
            [label]="country | countryName"
            class="w-full"></button>
        </div>
      </div>
      <div class="mt-2"></div>
    </div>
  `,
})
export class GamePlayStatusComponent {
  @Input() public status!: GameStatus;
  @Output() selectCountry: EventEmitter<Country> = new EventEmitter();
  public isImgLoad = false;

  public select(country: Country): void {
    this.selectCountry.emit(country);
    this.isImgLoad = false;
  }

  public onImgLoad(): void {
    this.isImgLoad = true;
  }
}
