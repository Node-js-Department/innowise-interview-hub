import type { InitOptions } from 'i18next';

export const FALLBACK_LOCALE = 'en';
export const supportedLocales = ['en', 'fr'] as const;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type Locales = (typeof supportedLocales)[number];

// You can name the cookie to whatever you want
export const LANGUAGE_COOKIE = 'preferred_language';

export function getOptions(lang = FALLBACK_LOCALE, ns = 'common'): InitOptions {
  return {
    debug: false, // Set false to hide logs
    supportedLngs: supportedLocales,
    fallbackLng: FALLBACK_LOCALE,
    lng: lang,
    ns,
  };
}