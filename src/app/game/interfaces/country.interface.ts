export interface Country {
  name: Name;
  tld?: string[];
  code: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: string;
  unMember: boolean;
  capital?: string[];
  altSpellings: string[];
  region: string;
  subregion?: string;
  languages?: unknown;
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  area: number;
  flag: string;
  maps: Maps;
  population: number;
  fifa?: string;
  timezones: string[];
  continents: string[];
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  borders?: string[];
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: Translation | undefined };
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Translation {
  official: string;
  common: string;
}
