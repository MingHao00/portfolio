'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { PixelButton } from '@/components/ui/PixelButton'
import { cn } from '@/lib/cn'
import { useLocale } from '@/i18n/useLocale'
import type { Locale } from '@/i18n/dictionaries'

const LOCALE_LABEL: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
}

const LOCALES: Locale[] = ['zh', 'en']

/**
 * Single control showing the active language; opens a listbox for the other option(s).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      const root = rootRef.current
      if (root && !root.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const otherLocales = LOCALES.filter((item) => item !== locale)

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <PixelButton
        variant="secondary"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {LOCALE_LABEL[locale]}
      </PixelButton>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Language"
          className={cn(
            'absolute right-0 top-full z-50 mt-1 min-w-full',
            'border-2 border-[var(--color-border-dark)] bg-[var(--color-panel)]',
            'shadow-[inset_2px_2px_0_var(--color-border-light)]',
          )}
        >
          {otherLocales.map((item) => (
            <li key={item} role="option" aria-selected={false}>
              <button
                type="button"
                className={cn(
                  'font-pixel w-full cursor-pointer px-4 py-2 text-left text-xs',
                  'text-[var(--color-ink)]',
                  'hover:bg-[var(--color-accent)]',
                  'focus-visible:bg-[var(--color-accent)]',
                  'active:bg-[var(--color-accent)]',
                )}
                onClick={() => {
                  setLocale(item)
                  setOpen(false)
                }}
              >
                {LOCALE_LABEL[item]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
