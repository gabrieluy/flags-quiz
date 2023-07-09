import { GameManagerService } from '@core/services/game-manager/game-manager.service';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'fq-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap align-content-center min-h-screen justify-content-center p-2">
      <fq-card *transloco="let t; read: 'about'">
        <div class="flex flex-row flex-wrap">
          <div class="flex justify-content-center col-12">
            <h2>{{ t('title') }}</h2>
          </div>
          <div class="flex justify-content-center col-12">
            <p class="text-lg text-center	">
              {{ t('description') }}
            </p>
          </div>
          <div class="flex flex-wrap justify-content-center col-12 mt-5">
            <div class="flex flex-wrap justify-content-center col-12 gap-3">
              <button
                pButton
                [label]="t('back')"
                icon="pi pi-arrow-left"
                class="col-11 md:col-5 p-button-outlined"
                [routerLink]="['/home']"></button>
              <button
                pButton
                icon="pi pi-github"
                [label]="t('show-code')"
                class="col-11 md:col-5 bg-gray-900 border-none"
                [routerLink]="['/settings']"></button>
            </div>
          </div>
        </div>
      </fq-card>
    </div>
  `,
})
export class AboutComponent implements OnInit {
  public gameManager = inject(GameManagerService);
  public hasPersistedState = false;

  ngOnInit(): void {
    this.hasPersistedState = this.gameManager.hasPersistedState();
  }
}
