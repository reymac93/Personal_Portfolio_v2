'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useMediaQuery } from '@/lib/useMediaQuery'

/**
 * Soft accent light that trails the pointer. Pointer-devices only — it is
 * decorative, so it never renders on touch or under reduced-motion.
 */
export function CursorGlow() {
  const reduced = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const enabled = finePointer && !reduced

  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-0 hidden size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] lg:block"
    >
      {/* Tint, blend mode and strength all come from theme vars — `screen`
          disappears over white, so light mode switches to `multiply`. */}
      <div className="cursor-glow size-full rounded-full" />
    </motion.div>
  )
}
