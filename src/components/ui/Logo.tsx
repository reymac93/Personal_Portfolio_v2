import { profile } from '@/data/profile'

type LogoProps = {
  /** Text beside the mark: nothing, the first name, or the full name. */
  wordmark?: 'none' | 'short' | 'full'
  className?: string
}

/**
 * The site mark. Single source for the navbar and footer, which previously
 * carried duplicate copies of this markup.
 *
 * The tile inverts between themes — see `.logo-tile` in globals.css. It is
 * driven by CSS rather than React state so it flips on the same frame as the
 * rest of the palette, with no extra render and no flash.
 */
export function Logo({ wordmark = 'none', className = '' }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="logo-tile relative grid size-9 shrink-0 place-items-center rounded-lg border font-display text-[0.8125rem] font-bold tracking-tight transition-colors duration-300">
        {profile.initials}
        <span
          aria-hidden
          className="logo-dot absolute -right-0.5 -top-0.5 size-1.5 rounded-full transition-all duration-300"
        />
      </span>

      {wordmark === 'short' ? (
        <span className="hidden font-display text-sm font-semibold tracking-tight text-fg sm:block">
          {profile.shortName}
          <span className="text-accent-400">.</span>
        </span>
      ) : null}

      {wordmark === 'full' ? (
        <span className="font-display text-sm font-semibold text-fg">
          {profile.name}
        </span>
      ) : null}
    </span>
  )
}
