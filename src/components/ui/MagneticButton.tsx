'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

type MagneticProps = {
  children: React.ReactNode
  className?: string
  /** How far the element drifts toward the cursor, in px. */
  strength?: number
}

/** Wraps any element so it leans toward the pointer, then springs back. */
export function Magnetic({ children, className, strength = 10 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })

  function handleMove(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(relX * strength * 2)
    y.set(relY * strength * 2)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  if (reduced) {
    return <span className={className}>{children}</span>
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-flex ${className ?? ''}`}
    >
      {children}
    </motion.span>
  )
}
