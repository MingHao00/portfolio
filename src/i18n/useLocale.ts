'use client'

import { useContext } from 'react'
import { LocaleContext, type LocaleContextValue } from '@/i18n/LocaleProvider'

/**
 * Access current locale, setter, and dictionary for the active language.
 */
export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
