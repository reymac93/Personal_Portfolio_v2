'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

type CounterProps = {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/** Counts up once the element scrolls into view. Uses rAF so it never blocks paint. */
export function Counter({
  to,
  suffix = '',
  prefix = '',
  duration = 1600,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [animated, setAnimated] = useState(0)

  // Derived, not stored — avoids a synchronous setState for the reduced case.
  const value = reduced ? to : animated

  useEffect(() => {
    if (!inView || reduced) return

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo — fast start, long settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setAnimated(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
