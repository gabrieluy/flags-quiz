import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  public hasData(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  public getData<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return undefined;
  }

  public saveData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeData(keys: string[]): void {
    keys.forEach(key => localStorage.removeItem(key));
  }
}
