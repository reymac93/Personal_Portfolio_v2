import type { CSSProperties } from 'react'

/**
 * Inline style that may also declare CSS custom properties.
 * React accepts them at runtime; CSSProperties alone rejects them at compile
 * time, and this is cleaner than casting at every call site.
 */
export type CSSVars = CSSProperties & Record<`--${string}`, string>
