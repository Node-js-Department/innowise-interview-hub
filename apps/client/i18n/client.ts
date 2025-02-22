'use client';

import { getCookie } from 'cookies-next';
import i18next, { i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect } from 'react';
import { initReactI18next, useTranslation as useTransAlias } from 'react-i18next';

import { useLocale } from '../hooks/locale-provider';
import { FALLBACK_LOCALE, getOptions, LANGUAGE_COOKIE, Locales, supportedLocales } from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['cookie'],
      lookupCookie: LANGUAGE_COOKIE,
      caches: ['cookie'],
    },
    preload: runsOnServerSide ? supportedLocales : [],
  });

export function useTranslation(ns = 'common') {
  const lng = useLocale();

  const translator = useTransAlias(ns);
  const { i18n } = translator;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    useCustomTranslationImplementation(i18n, lng);
  }
  return translator;
}

function useCustomTranslationImplementation(i18n: i18n, lng: Locales) {
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
}

export function getLocale() {
  return (getCookie(LANGUAGE_COOKIE) ?? FALLBACK_LOCALE) as Locales;
}
