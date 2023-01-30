import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameStatus } from 'src/app/game/interfaces/game-status.interface';

@Component({
  selector: 'fq-game-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div *ngIf="status" class="flex flex-row flex-wrap">
    <div class="flex justify-content-center col-12">
      <h3>Thanks for playing!</h3>
    </div>
    <div class="flex align-items-center justify-content-center md:justify-content-end col-12 md:col-6">
      <img class="w-10rem h-10rem" src="assets/images/pet.webp" />
    </div>
    <div class="flex justify-content-center md:justify-content-start col-12 md:col-6">
      <ul>
        <li class="flex mb-3 align-items-center">
          <i class="pi pi-star-fill text-yellow-500 mr-2"></i>
          <span class="font-medium"> {{ status.points }} Points</span>
        </li>
        <li class="flex mb-3 align-items-center">
          <i class="pi pi-percentage text-green-500 mr-2"></i>
          <span class="font-medium"> {{ status.successRate }} Success rate</span>
        </li>
        <li class="flex mb-3 align-items-center">
          <i class="pi pi-check text-green-500 mr-2"></i>
          <span class="font-medium"> {{ status.correctAnswers }} Correct Answers</span>
        </li>
        <li class="flex align-items-center">
          <i class="pi pi-times text-red-500 mr-2"></i>
          <span class="font-medium"> {{ status.incorrectAnswers }} Incorrect Answers</span>
        </li>
      </ul>
    </div>
    <div class="flex justify-content-center col-12 gap-2">
      <button icon="pi pi-replay" label="Restart" class="col-6 md:col-3" pButton (click)="reset()"></button>
      <button icon="pi pi-share-alt" label="Share" class="col-6 md:col-3" pButton (click)="share()"></button>
    </div>
  </div>`,
})
export class GameSummaryComponent {
  @Input() public status!: GameStatus;
  @Output() resetClick: EventEmitter<void> = new EventEmitter();

  public reset(): void {
    this.resetClick.emit();
  }

  public share(): void {
    throw new Error('Method not implemented.');
  }
}
