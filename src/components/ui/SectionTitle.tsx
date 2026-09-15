import type { ReactNode } from 'react'

type SectionTitleProps = {
  children: ReactNode
}

/**
 * Short pixel-font section heading.
 */
export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="font-pixel text-sm leading-relaxed text-[var(--color-ink)] md:text-base">
      {children}
    </h2>
  )
}
