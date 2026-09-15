'use client'

import { PixelPanel } from '@/components/ui/PixelPanel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { profile } from '@/content/profile'
import { skills } from '@/content/skills'
import { useLocale } from '@/i18n/useLocale'
import { cn } from '@/lib/cn'

/**
 * Short bilingual profile copy plus flat skill chips.
 */
export function ProfileSection() {
  const { locale, t } = useLocale()

  return (
    <section id="profile" className="scroll-mt-24 py-10 md:py-14">
      <SectionTitle>{t.sections.profile}</SectionTitle>

      <PixelPanel className="mt-6 px-4 py-4">
        <p className="text-sm leading-relaxed text-[var(--color-ink)] md:text-base">
          {profile[locale]}
        </p>
      </PixelPanel>

      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill.id}>
            <span
              className={cn(
                'font-pixel inline-block px-2 py-1 text-[10px]',
                'border-2 border-[var(--color-border-dark)]',
                'bg-[var(--color-accent)] text-[var(--color-ink)]',
              )}
            >
              {skill.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
