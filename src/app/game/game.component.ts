import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Country } from '../core/game_manager/interfaces/country.interface';
import { GameManager } from '../core/game_manager/game-manager.class';
import { GameStatus } from '../core/game_manager/interfaces/game-status.interface';

@Component({
  selector: 'fq-game',
  template: `
    <div class="m-5">
      <div class="flex flex-row flex-wrap justify-content-center gap-2">
        <p-message severity="info" [text]="'Puntos: ' + status.points"></p-message>
        <p-message severity="info" [text]="'Banderas restantes: ' + status.remainingFlags"></p-message>
        <p-message severity="info" [text]="'Porcentaje Acierto: ' + status.successRate + ' %'"></p-message>
      </div>
      <div class="flex flex-row flex-wrap justify-content-center">
        <div class="p-3 m-3">
          <img class="h-15rem border-round shadow-6" [src]="status.selectedCountry.flag" alt="" />
        </div>
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

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.status = this.gameManager.start();
  }

  public checkSelection(country: Country): void {
    this.status = this.gameManager.checkSelection(country);
    this._showMessage();
    if (this.status.isGameFinished) {
      alert('viva!!');
      this.status = this.gameManager.start();
      return;
    }
  }

  private _showMessage() {
    const { correctAnswer } = this.status.selectionResult;
    this.messageService.clear();
    this.messageService.add({
      key: 'tl',
      severity: correctAnswer ? 'success' : 'error',
      summary: correctAnswer ? 'Correcto!' : 'Error!',
    });
  }
}
