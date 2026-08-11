'use client'

import { useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { followSystem, getTheme, syncFavicon, toggleTheme } from '@/lib/theme'

/**
 * Stateless by design. Both icons render every time and CSS picks which one is
 * visible from :root[data-theme], so the right icon is painted on the first
 * frame — no useState, no hydration mismatch, no icon flash.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  useEffect(() => {
    // Reconcile the tab icon once on mount: the shipped `media` attributes
    // resolve against the OS, which is wrong if a manual choice is stored.
    syncFavicon(getTheme())
    // Then keep tracking the OS while no manual choice exists.
    return followSystem()
  }, [])

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className={`group relative grid size-10 place-items-center overflow-hidden rounded-lg border border-line-strong bg-ink-850 text-fg-muted transition-colors duration-300 hover:border-accent-400/50 hover:text-accent-400 ${className}`}
    >
      {/* Shown while the dark palette is active — clicking goes to light. */}
      <Sun
        className="only-dark size-[1.15rem] transition-transform duration-500 group-hover:rotate-45"
        aria-hidden
      />
      {/* Shown while the light palette is active — clicking goes to dark. */}
      <Moon
        className="only-light size-[1.15rem] transition-transform duration-500 group-hover:-rotate-12"
        aria-hidden
      />
    </button>
  )
}
