import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/game/interfaces/country.interface';
import { GameStatus } from '../interfaces/game-status.interface';
import { fadeImage } from 'src/app/game/game-play-status/animations/fadeImage';

@Component({
  selector: 'fq-game-play-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeImage],
  template: `
    <div class="m-3">
      <div class="flex justify-content-center">
        <fq-card class="col-12 md:col-6">
          <div *ngIf="status" class="flex flex-row flex-wrap justify-content-end mb-2">
            <fq-points-chip [points]="status.points"></fq-points-chip>
          </div>
          <p-progressBar
            [value]="status | progressPercentage"
            [color]="status.successRate | colorGradient"
            [showValue]="false"></p-progressBar>
        </fq-card>
      </div>
      <div class="flex justify-content-center mt-2">
        <fq-flag-img
          [@fadeImage]="isImgLoad"
          (imgLoad)="onImgLoad()"
          [flag]="status.selectedCountry.cca2"
          class="h-13rem md:h-20rem">
        </fq-flag-img>
      </div>
      <div class="grid mt-2">
        <div *ngFor="let country of status?.countryOptions" class="p-1 col-12 md:col-6 lg:col-4">
          <button pButton [disabled]="!isImgLoad" (click)="select(country)" class="w-full">
            {{ country | countryName }}
          </button>
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
