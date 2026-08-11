'use client'

import { useCallback, useRef } from 'react'
import type { CSSVars } from '@/lib/css'

type SpotlightCardProps = {
  children: React.ReactNode
  className?: string
  /** Accent used for the cursor-tracked glow and the border highlight. */
  accent?: string
  as?: 'div' | 'article' | 'li'
  /** Extra inline CSS custom properties (e.g. the per-project --pa-d/--pa-l pair). */
  vars?: CSSVars
}

/**
 * Cursor-tracked spotlight driven by CSS custom properties, so pointer moves
 * never trigger a React re-render. Degrades to a plain bordered card when the
 * pointer never enters (touch) or motion is reduced (CSS handles that).
 */
export function SpotlightCard({
  children,
  className = '',
  accent = 'var(--color-accent-400)',
  as: Tag = 'div',
  vars,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onPointerMove={handleMove}
      style={{ ...vars, ['--spot' as string]: accent }}
      className={`group/spot relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-ink-800/90 to-ink-900/95 shadow-panel transition-colors duration-500 hover:border-line-strong ${className}`}
    >
      {/* Cursor glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--spot) 14%, transparent), transparent 70%)',
        }}
      />
      {/* Top hairline that lights up on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-40 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            'linear-gradient(to right, transparent, color-mix(in oklab, var(--spot) 70%, transparent), transparent)',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  )
}
