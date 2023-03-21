import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/game/interfaces/country.interface';
import { GameStatus } from 'src/app/game/interfaces/game-status.interface';
import { fadeIn } from 'src/app/ui/animations/fadeIn.animation';

@Component({
  selector: 'fq-game-play-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('fadeIn', [transition('* <=> *', [useAnimation(fadeIn, { params: { time: '0.5s' } })])])],
  template: `
    <div class="m-4">
      <div *ngIf="status" class="flex flex-row flex-wrap justify-content-center gap-3">
        <fq-points-chip [points]="status.points"></fq-points-chip>
        <fq-info-chip [label]="status.remainingFlags" icon="pi pi-flag"></fq-info-chip>
        <fq-info-chip [label]="status.successRate" icon="pi pi-percentage"></fq-info-chip>
      </div>
      <div class="flex justify-content-center p-3 m-3 ">
        <fq-flag-img [@fadeIn]="status.selectedCountry" [flag]="status.selectedCountry.cca2" class="h-13rem">
        </fq-flag-img>
      </div>
      <div class="grid">
        <div *ngFor="let country of status?.countryOptions" class="p-1 col-12 md:col-6 lg:col-4">
          <button pButton (click)="select(country)" class="w-full">
            {{ country.translations['spa'].common }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class GamePlayStatusComponent {
  @Input() public status!: GameStatus;
  @Output() selectCountry: EventEmitter<Country> = new EventEmitter();

  public select(country: Country): void {
    this.selectCountry.emit(country);
  }
}
