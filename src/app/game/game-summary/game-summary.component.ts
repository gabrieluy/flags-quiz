import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameStatus } from 'src/app/game/interfaces/game-status.interface';

@Component({
  selector: 'fq-game-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap align-content-center min-h-screen justify-content-center p-2">
      <fq-card>
        <div class="flex flex-row flex-wrap">
          <div class="flex justify-content-center col-12">
            <h2>Thanks for playing!</h2>
          </div>
          <div class="flex justify-content-center col-12">
            <img class="w-10rem h-10rem col-12" src="assets/images/pet.webp" />
          </div>
          <div class="flex justify-content-center col-12">
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
          <div class="flex flex-wrap justify-content-center col-12 mt-3 gap-3">
            <button pButton icon="pi pi-replay" label="Restart" class="col-11 md:col-5" (click)="reset()"></button>
            <button pButton icon="pi pi-share-alt" label="Share" class="col-11 md:col-5" (click)="share()"></button>
          </div>
        </div>
      </fq-card>
    </div>
  `,
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
