import { Component, inject, OnInit } from '@angular/core';
import { DifficultyType } from './interfaces/settings.interface';
import { SettingsService } from './settings.service';

@Component({
  selector: 'fq-settings',
  template: `
    <div class="flex flex-wrap align-content-center min-h-screen justify-content-center p-2">
      <fq-card>
        <div class="flex justify-content-center col-12">
          <h2>Settings</h2>
        </div>
        <div class="flex flex-row flex-wrap justify-content-center">
          <div class="col-12 md:col-6">
            <div class="flex justify-content-center col-12">
              <h3>Difficulty</h3>
            </div>
            <div class="flex justify-content-center col-12">
              <p-selectButton
                [options]="difficultyOptions"
                [(ngModel)]="selectedDifficulty"
                optionLabel="label"></p-selectButton>
            </div>
          </div>
          <div class="flex flex-wrap justify-content-center col-12 md:col-6">
            <div class="flex justify-content-center col-12">
              <h3>Continents</h3>
            </div>
            <div class="flex flex-wrap justify-content-center col-12 gap-3">
              <div *ngFor="let continent of continentsOptions" class="field-checkbox">
                <p-checkbox
                  [name]="continent.value"
                  [value]="continent.value"
                  [(ngModel)]="selectedContinents"
                  [inputId]="continent.value"></p-checkbox>
                <label [for]="continent.value">{{ continent.label }}</label>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-content-center col-12 mt-3 gap-3">
            <button
              pButton
              label="Go Back"
              icon="pi pi-arrow-left"
              class="p-button-secondary col-11 md:col-5"
              [routerLink]="['../']"></button>
            <button
              pButton
              label="Save"
              icon="pi pi-save"
              (click)="saveSettings()"
              class="p-button-success col-11 md:col-5"></button>
          </div>
        </div>
      </fq-card>
    </div>
  `,
})
export class SettingsComponent implements OnInit {
  private _settingsService = inject(SettingsService);

  continentsOptions: { label: string; value: string }[] = [];
  difficultyOptions: { label: string; value: string }[] = [];
  selectedContinents: string[] = [];
  selectedDifficulty = {} as DifficultyType;

  ngOnInit(): void {
    this.difficultyOptions = this._settingsService.getDifficultyOptions();
    this.continentsOptions = this._settingsService.getContinentsOptions();
    const { continents, difficulty } = this._settingsService.getSettings();
    this.selectedDifficulty = difficulty;
    this.selectedContinents = continents;
  }

  saveSettings(): void {
    const settings = {
      difficulty: this.selectedDifficulty,
      continents: this.selectedContinents,
    };
    this._settingsService.save(settings);
  }
}
