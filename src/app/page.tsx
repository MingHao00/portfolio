'use client'

import { useEffect, useRef } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkyGrassBackground } from '@/components/layout/SkyGrassBackground'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { JourneySection } from '@/components/sections/JourneySection'
import { ProfileSection } from '@/components/sections/ProfileSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { useLocale } from '@/i18n/useLocale'

const LOCALE_FADE_CLASS = 'locale-fade'

export default function Home() {
  const { locale } = useLocale()
  const contentRef = useRef<HTMLDivElement>(null)
  const isFirstLocaleEffect = useRef(true)

  useEffect(() => {
    if (isFirstLocaleEffect.current) {
      isFirstLocaleEffect.current = false
      return
    }

    const el = contentRef.current
    if (!el) {
      return
    }

    el.classList.remove(LOCALE_FADE_CLASS)
    // Restart CSS animation without remounting sections
    void el.offsetWidth
    el.classList.add(LOCALE_FADE_CLASS)
  }, [locale])

  return (
    <>
      <SkyGrassBackground />
      <SiteHeader />
      <main className="relative mx-auto max-w-5xl px-4 pb-16">
        <div ref={contentRef}>
          <HeroSection />
          <EducationSection />
          <ProfileSection />
          <ProjectsSection />
          <JourneySection />
          <ContactSection />
        </div>
      </main>
    </>
  )
}
