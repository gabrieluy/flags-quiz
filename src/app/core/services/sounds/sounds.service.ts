import { Injectable, inject } from '@angular/core';
import { END_LEVEL_URL, ERROR_URL, START_LEVEL_URL, SUCCESS_URL } from './sounds-urls.constants';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

@Injectable()
export class SoundsService {
  private _settings = inject(SettingsService);
  private audioPlayer: HTMLAudioElement;

  constructor() {
    this.audioPlayer = new Audio();
  }

  public playAnswerSound(isCorrect: boolean): void {
    const url = isCorrect ? SUCCESS_URL : ERROR_URL;
    this._playAudio(url);
  }

  public playStartLevelSound(): void {
    this._playAudio(START_LEVEL_URL);
  }

  public playEndLevelSound(): void {
    this._playAudio(END_LEVEL_URL);
  }

  private _playAudio(url: string) {
    if (this._settings.isSoundEnable) {
      this.audioPlayer.src = url;
      this.audioPlayer.load();
      this.audioPlayer.play();
    }
  }
}
