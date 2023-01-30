export interface Country {
  code: string;
  name: string;
  translations: { [key: string]: Language };
  flag: string;
}

export interface Language {
  official: string;
  common: string;
}
