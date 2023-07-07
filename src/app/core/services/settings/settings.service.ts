import { Injectable, inject } from '@angular/core';
import { DifficultyType, Settings, SoundType } from '../../../settings/interfaces/settings.interface';
import { SettingsOptions } from '../../../settings/interfaces/settings-options.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class SettingsService {
  private _localStorage = inject(LocalStorageService);

  SETTINGS_STORAGE_KEY = 'fq:settings';
  DEFAULT_SETTINGS = {
    continents: ['northamerica', 'asia', 'southamerica', 'europe', 'oceania', 'africa'],
    difficulty: 'medium' as DifficultyType,
    sound: 'on' as SoundType,
  };

  DEFAULT_OPTIONS: SettingsOptions = {
    difficulty: ['easy', 'medium', 'hard'],
    continents: ['northamerica', 'asia', 'southamerica', 'europe', 'oceania', 'africa'],
    sound: ['on', 'off'],
  };

  get isSoundEnable(): boolean {
    return this.getSettings().sound == 'on';
  }

  public toggleSound(): void {
    const settings = this.getSettings();
    settings.sound === 'on' ? 'on' : 'off';
    this.save(settings);
  }

  public getSettings(): Settings {
    return this._localStorage.getData<Settings>(this.SETTINGS_STORAGE_KEY) || this.DEFAULT_SETTINGS;
  }

  public getSettingsOptions(): SettingsOptions {
    return this.DEFAULT_OPTIONS;
  }

  public save(settings: Settings): void {
    this._localStorage.saveData<Settings>(this.SETTINGS_STORAGE_KEY, settings);
  }
}
