'use client'

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_LOCALE,
  dictionaries,
  isLocale,
  LOCALE_STORAGE_KEY,
  type Dict,
  type Locale,
} from '@/i18n/dictionaries'

export type LocaleContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  t: Dict
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

type LocaleProviderProps = {
  children: ReactNode
  defaultLocale?: Locale
}

/**
 * Client locale provider for static export (no next-intl routing).
 * Persists choice to localStorage under portfolio-locale.
 */
export function LocaleProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
      if (isLocale(stored)) {
        setLocaleState(stored)
      }
    } catch {
      // Ignore storage access errors (private mode, etc.)
    }
  }, [])

  function setLocale(next: Locale) {
    setLocaleState(next)
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      // Ignore storage write failures
    }
  }

  const value: LocaleContextValue = {
    locale,
    setLocale,
    t: dictionaries[locale],
  }

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}
