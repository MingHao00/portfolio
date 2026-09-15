'use client'

import { PixelPanel } from '@/components/ui/PixelPanel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { projects } from '@/content/projects'
import { useLocale } from '@/i18n/useLocale'
import { cn } from '@/lib/cn'

/**
 * Responsive project grid; each card is an external link.
 */
export function ProjectsSection() {
  const { locale, t } = useLocale()

  return (
    <section id="projects" className="scroll-mt-24 py-10 md:py-14">
      <SectionTitle>{t.sections.projects}</SectionTitle>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline transition-transform hover:-translate-y-0.5"
          >
            <PixelPanel className="flex h-full flex-col px-4 py-4">
              <h3 className="font-pixel text-xs leading-relaxed text-[var(--color-ink)]">
                {project.name[locale]}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink)]">
                {project.description[locale]}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <span
                      className={cn(
                        'font-pixel inline-block px-1.5 py-0.5 text-[8px]',
                        'border border-[var(--color-border-dark)]',
                        'bg-[var(--color-panel)] text-[var(--color-ink)]',
                      )}
                    >
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </PixelPanel>
          </a>
        ))}
      </div>
    </section>
  )
}
