'use client'

import { PixelButton } from '@/components/ui/PixelButton'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { contacts } from '@/content/contacts'
import { useLocale } from '@/i18n/useLocale'

/**
 * Contact actions: mailto, GitHub, resume; LinkedIn only when set.
 */
export function ContactSection() {
  const { t } = useLocale()

  return (
    <section id="contact" className="scroll-mt-24 py-10 md:py-14">
      <SectionTitle>{t.sections.contact}</SectionTitle>

      <div className="mt-6 flex flex-wrap gap-3">
        <PixelButton href={`mailto:${contacts.email}`}>
          {t.contact.email}
        </PixelButton>
        <PixelButton href={contacts.github} variant="secondary">
          {t.contact.github}
        </PixelButton>
        <PixelButton href={contacts.resumePath} variant="secondary">
          {t.contact.resume}
        </PixelButton>
        {contacts.linkedin ? (
          <PixelButton href={contacts.linkedin} variant="secondary">
            {t.contact.linkedin}
          </PixelButton>
        ) : null}
      </div>
    </section>
  )
}
