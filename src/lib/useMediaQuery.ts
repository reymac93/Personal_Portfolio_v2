'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query the React-idiomatic way. Using
 * useSyncExternalStore (rather than useState + useEffect) means no cascading
 * render on mount and a correct `false` snapshot during SSR.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
