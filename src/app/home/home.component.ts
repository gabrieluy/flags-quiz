import { ChangeDetectionStrategy, Component } from '@angular/core';

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
                [label]="t('play')"
                class="col-10 md:col-5"
                [routerLink]="['/game']"></button>
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
export class HomeComponent {}
