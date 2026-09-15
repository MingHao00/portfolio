'use client'

import { PixelPanel } from '@/components/ui/PixelPanel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { education } from '@/content/education'
import { useLocale } from '@/i18n/useLocale'

/**
 * Two education panels (university + graduate placeholders).
 */
export function EducationSection() {
  const { locale, t } = useLocale()

  return (
    <section id="education" className="scroll-mt-24 py-10 md:py-14">
      <SectionTitle>{t.sections.education}</SectionTitle>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <PixelPanel key={item.id} className="px-4 py-4">
            <h3 className="font-pixel text-xs leading-relaxed text-[var(--color-ink)]">
              {item.school[locale]}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]">
              {item.program[locale]}
            </p>
            <p className="mt-1 text-xs text-[var(--color-ink)] opacity-70">
              {item.period[locale]}
            </p>
            {item.highlight ? (
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
                {item.highlight[locale]}
              </p>
            ) : null}
          </PixelPanel>
        ))}
      </div>
    </section>
  )
}
