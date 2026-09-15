'use client'

import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkyGrassBackground } from '@/components/layout/SkyGrassBackground'
import { useLocale } from '@/i18n/useLocale'

export default function Home() {
  const { t } = useLocale()

  return (
    <>
      <SkyGrassBackground />
      <SiteHeader />
      <main className="relative mx-auto min-h-[70vh] max-w-5xl px-4 py-10">
        <p className="font-pixel text-xs text-[var(--color-ink)] opacity-80">
          {t.hero.greeting}
        </p>
      </main>
    </>
  )
}
