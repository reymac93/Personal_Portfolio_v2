export type Theme = 'light' | 'dark'

export const THEME_KEY = 'theme'
export const THEME_ATTR = 'data-theme'

/**
 * Runs synchronously before first paint, so the correct palette is applied on
 * the very first frame — no flash of the wrong theme.
 *
 * It always stamps an explicit data-theme (resolving system preference here
 * rather than in CSS), which is what lets globals.css carry a single light
 * override block instead of duplicating the palette under a media query.
 *
 * Wrapped in try/catch because localStorage throws in some privacy modes.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('${THEME_ATTR}',t)}catch(e){document.documentElement.setAttribute('${THEME_ATTR}','dark')}})()`

/** The theme currently painted, read from the DOM rather than React state. */
export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute(THEME_ATTR) === 'light'
    ? 'light'
    : 'dark'
}

/** Did the visitor make an explicit choice, or are we still following the OS? */
export function hasStoredPreference(): boolean {
  try {
    const s = localStorage.getItem(THEME_KEY)
    return s === 'light' || s === 'dark'
  } catch {
    return false
  }
}

/**
 * Tab icon paths. Each file matches its theme, exactly like the in-page logo:
 * light mode gets the light tile with a dark monogram, dark mode the reverse.
 * The monogram glyph is what contrasts with the browser tab strip, so the tile
 * is free to follow the theme.
 */
export const FAVICONS: Record<Theme, string> = {
  light: '/icon-light.svg',
  dark: '/icon-dark.svg',
}

/**
 * Points every icon link at the variant matching the site theme.
 *
 * The links ship with `media` attributes so the correct one is chosen with no
 * JS at all. Those media queries track the *OS* preference, though, so a
 * visitor who overrides the theme manually would otherwise keep the wrong tab
 * icon. Dropping `media` and setting `href` is the reliable way to override:
 * browsers re-evaluate an icon link's href, but not always its media.
 */
export function syncFavicon(theme: Theme): void {
  const href = FAVICONS[theme]
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="icon"]')
    .forEach((link) => {
      link.removeAttribute('media')
      if (link.getAttribute('href') !== href) link.setAttribute('href', href)
    })
}

export function applyTheme(theme: Theme, persist = true): void {
  document.documentElement.setAttribute(THEME_ATTR, theme)
  syncFavicon(theme)
  if (!persist) return
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Non-fatal: the theme still applies for this session.
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}

/**
 * Keeps the page in step with the OS while the visitor has not chosen manually.
 * Returns an unsubscribe function.
 */
export function followSystem(): () => void {
  const mql = window.matchMedia('(prefers-color-scheme: light)')
  const onChange = (e: MediaQueryListEvent) => {
    if (hasStoredPreference()) return
    applyTheme(e.matches ? 'light' : 'dark', false)
  }
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}
