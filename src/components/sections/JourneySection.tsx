'use client'

import { PixelPanel } from '@/components/ui/PixelPanel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { journey } from '@/content/journey'
import { useLocale } from '@/i18n/useLocale'

/**
 * Year-based journey nodes with placeholder body copy.
 */
export function JourneySection() {
  const { locale, t } = useLocale()

  return (
    <section id="journey" className="section-enter scroll-mt-24 py-10 md:py-14">
      <SectionTitle>{t.sections.journey}</SectionTitle>

      <ol className="mt-6 flex flex-col gap-4">
        {journey.map((node) => (
          <li key={node.id}>
            <PixelPanel className="px-4 py-4">
              <p className="font-pixel text-xs text-[var(--color-accent)]">
                {node.year}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]">
                {node.body[locale]}
              </p>
            </PixelPanel>
          </li>
        ))}
      </ol>
    </section>
  )
}
