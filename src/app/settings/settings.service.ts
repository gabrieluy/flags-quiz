import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DifficultyType, Settings, SoundType } from './interfaces/settings.interface';
import { SettingsOptions } from './interfaces/settings-options.interface';

@Injectable()
export class SettingsService {
  private cookieService = inject(CookieService);

  COOKIE_NAME = 'fq:settings';
  DEFAULT_SETTINGS = {
    continents: ['northamerica', 'asia', 'southamerica', 'europe', 'oceania', 'africa', 'antarctica'],
    difficulty: 'medium' as DifficultyType,
    sound: 'on' as SoundType,
  };

  DEFAULT_OPTIONS: SettingsOptions = {
    difficulty: ['easy', 'medium', 'hard'],
    continents: ['northamerica', 'asia', 'southamerica', 'europe', 'oceania', 'africa', 'antarctica'],
    sound: ['on', 'off'],
  };

  public getSettings(): Settings {
    const settings = this.cookieService.get(this.COOKIE_NAME);
    if (settings) {
      return JSON.parse(settings);
    }
    return this.DEFAULT_SETTINGS;
  }

  public getSettingsOptions(): SettingsOptions {
    return this.DEFAULT_OPTIONS;
  }

  public save(settings: Settings): void {
    this.cookieService.set(this.COOKIE_NAME, JSON.stringify(settings));
  }
}
