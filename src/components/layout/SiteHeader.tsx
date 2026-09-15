'use client'

import { useEffect, useState } from 'react'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { PixelButton } from '@/components/ui/PixelButton'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { cn } from '@/lib/cn'
import { useLocale } from '@/i18n/useLocale'

const NAV_ITEMS = [
  { href: '#hero', key: 'home' as const },
  { href: '#education', key: 'education' as const },
  { href: '#profile', key: 'profile' as const },
  { href: '#projects', key: 'projects' as const },
  { href: '#journey', key: 'journey' as const },
  { href: '#contact', key: 'contact' as const },
]

/**
 * Pixel double-line top bar with section anchors and mobile hamburger menu.
 */
export function SiteHeader() {
  const { t } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40">
      <PixelPanel className="px-3 py-2 sm:px-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <a
            href="#hero"
            className={cn(
              'font-pixel shrink-0 text-[10px] text-[var(--color-ink)] no-underline',
              'sm:text-xs',
            )}
            onClick={closeMenu}
          >
            {t.nav.home}
          </a>

          <nav
            className="ml-auto hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'font-pixel px-2 py-1 text-[10px] text-[var(--color-ink)] no-underline',
                  'hover:bg-[var(--color-accent)]',
                )}
              >
                {t.nav[item.key]}
              </a>
            ))}
            <LanguageSwitcher className="ml-2" />
          </nav>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <PixelButton
              variant="secondary"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-controls="site-mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="!px-3"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </PixelButton>
          </div>
        </div>
      </PixelPanel>

      {menuOpen ? (
        <PixelPanel className="md:hidden" thick={false}>
          <nav id="site-mobile-nav" aria-label="Mobile">
            <ul className="mx-auto flex max-w-5xl flex-col px-3 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'font-pixel block px-2 py-3 text-xs text-[var(--color-ink)] no-underline',
                      'hover:bg-[var(--color-accent)]',
                    )}
                    onClick={closeMenu}
                  >
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PixelPanel>
      ) : null}
    </header>
  )
}
