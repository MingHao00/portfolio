import type { MouseEventHandler, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type PixelButtonVariant = 'primary' | 'secondary'

type PixelButtonProps = {
  children: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  className?: string
  variant?: PixelButtonVariant
}

const VARIANT_CLASS: Record<PixelButtonVariant, string> = {
  primary: 'bg-[var(--color-accent)]',
  secondary: 'bg-[var(--color-panel)]',
}

const BASE_CLASS = cn(
  'font-pixel inline-block cursor-pointer px-4 py-2 text-center text-xs',
  'text-[var(--color-ink)] no-underline',
  'border-2 border-[var(--color-border-dark)]',
  'shadow-[inset_2px_2px_0_var(--color-border-light),inset_-2px_-2px_0_rgba(0,0,0,0.2)]',
  'transition-transform active:translate-y-px',
)

/**
 * Pixel-styled button. Renders an anchor when `href` is set (external: new tab).
 */
export function PixelButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
}: PixelButtonProps) {
  const classes = cn(BASE_CLASS, VARIANT_CLASS[variant], className)

  if (href) {
    const isExternal = /^https?:\/\//i.test(href)

    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
