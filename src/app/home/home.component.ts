import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { GameManagerService } from '../game/game-manager.service';

@Component({
  selector: 'fq-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap align-content-center min-h-screen justify-content-center p-2">
      <fq-card *transloco="let t; read: 'home'">
        <div class="flex flex-row flex-wrap">
          <div class="flex justify-content-center col-12">
            <h1>Flags Quiz!</h1>
          </div>
          <div class="flex justify-content-center col-12">
            <img class="w-10rem h-10rem" src="assets/images/pet.png" />
          </div>
          <div class="flex flex-wrap justify-content-center col-12 mt-5">
            <div class="flex flex-wrap justify-content-center col-12 gap-3">
              <button
                pButton
                icon="pi pi-play"
                [label]="hasPersistedState ? t('continue') : t('play')"
                class="col-10 md:col-5"
                [routerLink]="['/game']"></button>
              <button
                *ngIf="hasPersistedState"
                pButton
                icon="pi pi-replay"
                [label]="t('new')"
                class="col-10 md:col-5 p-button-secondary"
                [routerLink]="['/game']"
                [queryParams]="{ isNewGame: true }"></button>
              <button
                pButton
                icon="pi pi-cog"
                [label]="t('settings')"
                class="p-button-help col-10 md:col-5"
                [routerLink]="['/settings']"></button>
            </div>
          </div>
        </div>
      </fq-card>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  public gameManager = inject(GameManagerService);
  public hasPersistedState = false;

  ngOnInit(): void {
    this.hasPersistedState = this.gameManager.hasPersistedState();
  }
}
