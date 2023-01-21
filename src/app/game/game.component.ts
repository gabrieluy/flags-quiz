import { Component, OnInit } from '@angular/core';
import { Country } from '../core/game_manager/interfaces/country.interface';
import { GameManager } from '../core/game_manager/game-manager.class';
import { GameStatus } from '../core/game_manager/interfaces/game-status.interface';

@Component({
  selector: 'fq-game',
  template: `
    <div class="m-5">
      <div class="flex flex-row flex-wrap justify-content-center gap-3">
        <fq-points-chip [points]="status.points"></fq-points-chip>
        <fq-info-chip [label]="status.remainingFlags" icon="pi pi-flag"></fq-info-chip>
        <fq-info-chip [label]="status.successRate" icon="pi pi-percentage"></fq-info-chip>
      </div>
      <div class="flex justify-content-center p-3 m-3 ">
        <fq-country-flag [country]="status.selectedCountry" class="h-13rem"></fq-country-flag>
      </div>
      <div class="grid">
        <div *ngFor="let country of status.countryOptions" class="p-1 col-12 md:col-6 lg:col-4">
          <button pButton (click)="checkSelection(country)" class="w-full">
            {{ country.translations['spa'].common }}
          </button>
        </div>
      </div>

      <div class="mt-5">
        <fq-answer-history [history]="status.answerHistory"></fq-answer-history>
      </div>
    </div>
  `,
})
export class GameComponent implements OnInit {
  gameManager: GameManager = new GameManager();
  status: GameStatus = {
    isGameFinished: false,
    points: 0,
    remainingFlags: 0,
    successRate: 0,
    answerHistory: [],
    countryOptions: [],
    lastAnswer: { correct: false, country: {} as Country },
    selectedCountry: { flag: '', name: '', code: '', translations: {} },
  };

  ngOnInit(): void {
    this.status = this.gameManager.start();
  }

  public checkSelection(country: Country): void {
    this.status = this.gameManager.checkSelection(country);
    if (this.status.isGameFinished) {
      alert('viva!!');
      this.status = this.gameManager.start();
      return;
    }
  }
}
