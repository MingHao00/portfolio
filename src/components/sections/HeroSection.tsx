'use client'

import { PixelPanel } from '@/components/ui/PixelPanel'
import { useLocale } from '@/i18n/useLocale'

const HERO_IMAGE_SRC = '/characters/hero-placeholder.svg'
const HERO_IMAGE_ALT = 'Pixel character'

/**
 * Landing hero: pixel character, thick name panel, dialog greeting.
 */
export function HeroSection() {
  const { t } = useLocale()

  return (
    <section id="hero" className="section-enter scroll-mt-24 py-10 md:py-14">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-8">
        <img
          src={HERO_IMAGE_SRC}
          alt={HERO_IMAGE_ALT}
          width={128}
          height={128}
          className="hero-character h-28 w-28 shrink-0 md:h-36 md:w-36"
          style={{ imageRendering: 'pixelated' }}
        />

        <div className="flex w-full max-w-xl flex-col gap-4">
          <PixelPanel thick className="px-4 py-3">
            <h1 className="font-pixel text-sm leading-relaxed text-[var(--color-ink)] md:text-base">
              {t.hero.name}
            </h1>
            <p className="mt-1 font-pixel text-[10px] text-[var(--color-ink)] opacity-80">
              {t.hero.role}
            </p>
          </PixelPanel>

          <PixelPanel className="px-4 py-3">
            <p className="text-sm leading-relaxed text-[var(--color-ink)]">
              {t.hero.greeting}
            </p>
          </PixelPanel>
        </div>
      </div>
    </section>
  )
}
