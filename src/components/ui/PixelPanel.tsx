import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const BORDER_THIN = 2
const BORDER_THICK = 4

type PixelPanelProps = {
  children: ReactNode
  className?: string
  thick?: boolean
}

/**
 * Classic double-line embossed pixel panel.
 * Dark outer edge + light inner rim over --color-panel fill.
 */
export function PixelPanel({ children, className, thick = false }: PixelPanelProps) {
  const borderWidth = thick ? BORDER_THICK : BORDER_THIN
  const inset = thick ? BORDER_THICK : BORDER_THIN

  return (
    <div
      className={cn('bg-[var(--color-panel)] text-[var(--color-ink)]', className)}
      style={{
        borderStyle: 'solid',
        borderWidth,
        borderColor: 'var(--color-border-dark)',
        boxShadow: [
          `inset ${inset}px ${inset}px 0 var(--color-border-light)`,
          `inset -${inset}px -${inset}px 0 color-mix(in srgb, var(--color-border-dark) 35%, transparent)`,
        ].join(', '),
      }}
    >
      {children}
    </div>
  )
}
