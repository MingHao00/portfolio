'use client'

import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkyGrassBackground } from '@/components/layout/SkyGrassBackground'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { JourneySection } from '@/components/sections/JourneySection'
import { ProfileSection } from '@/components/sections/ProfileSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'

export default function Home() {
  return (
    <>
      <SkyGrassBackground />
      <SiteHeader />
      <main className="relative mx-auto max-w-5xl px-4 pb-16">
        <HeroSection />
        <EducationSection />
        <ProfileSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection />
      </main>
    </>
  )
}
