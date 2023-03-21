import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ContinentOpt } from './interfaces/continent-opt.interface';
import { DifficultyType, Settings } from './interfaces/settings.interface';

@Injectable()
export class SettingsService {
  private cookieService = inject(CookieService);

  COOKIE_NAME = 'fq:settings';
  DEFAULT_SETTINGS = {
    difficulty: { label: 'Medium', value: 'medium' } as DifficultyType,
    continents: ['North America', 'Asia', 'South America', 'Europe', 'Oceania', 'Africa', 'Antarctica'],
  };

  public getSettings(): Settings {
    const settings = this.cookieService.get(this.COOKIE_NAME);
    if (settings) {
      return JSON.parse(settings);
    }
    return this.DEFAULT_SETTINGS;
  }

  public save(settings: Settings): void {
    this.cookieService.set(this.COOKIE_NAME, JSON.stringify(settings));
  }

  public getDifficultyOptions(): { label: string; value: string }[] {
    return [
      { label: 'Easy', value: 'easy' },
      { label: 'Medium', value: 'medium' },
      { label: 'Hard', value: 'hard' },
    ];
  }

  public getContinentsOptions(): ContinentOpt[] {
    return this.DEFAULT_SETTINGS.continents.map(c => ({ label: c, value: c }));
  }
}
