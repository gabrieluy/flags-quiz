export const SHARE_URLS = {
  twitter: 'https://twitter.com/intent/tweet?text=',
  whatsapp: 'https://api.whatsapp.com/send/?text=',
} as const;

export type SharePlatform = keyof typeof SHARE_URLS;
