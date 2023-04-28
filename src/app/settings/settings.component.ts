import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsOptions } from './interfaces/settings-options.interface';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'fq-settings',
  template: `
    <div class="flex flex-wrap align-content-center min-h-screen justify-content-center p-2">
      <fq-card *transloco="let t; read: 'settings'">
        <form [formGroup]="formGroup">
          <div class="flex justify-content-center col-12">
            <h2>{{ t('title') }}</h2>
          </div>
          <div class="flex flex-row flex-wrap justify-content-center">
            <fq-option-wrapper class="col-12 md:col-6" [label]="t('sound')">
              <p-selectButton [options]="options.sound" formControlName="sound">
                <ng-template let-sound>
                  {{ t(sound) }}
                </ng-template>
              </p-selectButton>
            </fq-option-wrapper>
            <fq-option-wrapper class="col-12 md:col-6" [label]="t('language')">
              <fq-language-picker></fq-language-picker>
            </fq-option-wrapper>
            <fq-option-wrapper class="col-12 md:col-6" [label]="t('difficulty')">
              <p-selectButton [options]="options.difficulty" formControlName="difficulty">
                <ng-template let-difficulty>
                  {{ t(difficulty) }}
                </ng-template>
              </p-selectButton>
            </fq-option-wrapper>
            <fq-option-wrapper class="col-12 md:col-6" [label]="t('continents')">
              <fq-multiselect-picker
                [parentForm]="formGroup"
                [items]="options.continents"
                [placeholder]="t('continents.placeholder')"
                controlName="continents"
                translationScope="continents"></fq-multiselect-picker>
            </fq-option-wrapper>
            <div class="flex flex-wrap justify-content-center col-12 mt-3">
              <button
                pButton
                [label]="t('back')"
                icon="pi pi-arrow-left"
                class="p-button-outlined col-6"
                (click)="clickBack()"></button>
            </div>
          </div>
        </form>
      </fq-card>
    </div>
  `,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;

  private _valueChangesSub!: Subscription;
  private _settingsService = inject(SettingsService);
  private _fb = inject(FormBuilder);
  private _location = inject(Location);

  options: SettingsOptions = {} as SettingsOptions;

  ngOnInit(): void {
    this.options = this._settingsService.getSettingsOptions();
    const { continents, difficulty, sound } = this._settingsService.getSettings();

    this.formGroup = this._fb.group({
      continents: [continents],
      difficulty: [difficulty],
      sound: [sound],
    });

    this._valueChangesSub = this.formGroup.valueChanges.subscribe(() => {
      this.saveSettings();
    });
  }

  public saveSettings(): void {
    const settings = {
      continents: this.formGroup.value.continents,
      difficulty: this.formGroup.value.difficulty,
      sound: this.formGroup.value.sound,
    };
    this._settingsService.save(settings);
  }

  public clickBack(): void {
    this._location.back();
  }

  public ngOnDestroy(): void {
    this._valueChangesSub.unsubscribe();
  }
}
