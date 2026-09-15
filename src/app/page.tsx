'use client'

import { PixelButton } from '@/components/ui/PixelButton'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useLocale } from '@/i18n/useLocale'

export default function Home() {
  const { locale, setLocale, t } = useLocale()

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-stretch justify-center gap-6 p-6">
      <SectionTitle>{t.sections.education}</SectionTitle>

      <PixelPanel className="p-4">
        <p className="text-sm leading-relaxed">{t.hero.greeting}</p>
        <p className="mt-2 text-sm">
          {t.language.label}: {locale === 'zh' ? '中文' : 'English'}
        </p>
      </PixelPanel>

      <div className="flex flex-wrap gap-3">
        <PixelButton
          variant={locale === 'zh' ? 'primary' : 'secondary'}
          onClick={() => setLocale('zh')}
        >
          中文
        </PixelButton>
        <PixelButton
          variant={locale === 'en' ? 'primary' : 'secondary'}
          onClick={() => setLocale('en')}
        >
          English
        </PixelButton>
      </div>
    </main>
  )
}
