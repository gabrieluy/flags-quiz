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
        <img class="h-13rem border-round shadow-6" [src]="'assets/flags/4x3/' + status.selectedCountry.flag" alt="" />
      </div>
      <div class="flex flex-row flex-wrap justify-content-center gap-2">
        <p-button *ngFor="let country of status.countryOptions" (click)="checkSelection(country)">
          {{ country.translations['spa'].common }}
        </p-button>
      </div>
      <fq-flag-grid
        [countryList]="status.correctAnswers"
        dividerText="RESPUESTAS CORRECTAS"
        styleClass="bg-green-100 mt-5"></fq-flag-grid>
      <fq-flag-grid
        [countryList]="status.incorrectAnswers"
        dividerText="RESPUESTAS INCORRECTAS"
        styleClass="text-red-500 bg-red-100 mt-5"></fq-flag-grid>
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
    correctAnswers: [],
    incorrectAnswers: [],
    countryOptions: [],
    selectedCountry: { flag: '', name: '', code: '', translations: {} },
    selectionResult: { correctAnswer: false },
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
