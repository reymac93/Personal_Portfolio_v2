'use client'

import { ArrowUp } from 'lucide-react'

/** Isolated so the footer itself can stay a server component. */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group inline-flex items-center gap-2 font-mono text-xs text-fg-subtle transition-colors hover:text-accent-400"
    >
      Top
      <span className="grid size-7 place-items-center rounded-full border border-line-strong transition-transform duration-300 group-hover:-translate-y-0.5">
        <ArrowUp className="size-3.5" aria-hidden />
      </span>
    </button>
  )
}
