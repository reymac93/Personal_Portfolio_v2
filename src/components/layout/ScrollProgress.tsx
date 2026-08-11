'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/** Hairline reading-progress bar pinned under the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-90 h-0.5 origin-left bg-gradient-to-r from-accent-600 via-accent-400 to-cyan-glow"
    />
  )
}
