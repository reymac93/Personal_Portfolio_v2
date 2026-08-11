'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ElementType } from 'react'
import {
  easeOutExpo,
  revealVariants,
  VIEWPORT_EARLY,
  type RevealDirection,
} from '@/lib/motion'

type RevealProps = {
  children: React.ReactNode
  as?: ElementType
  direction?: RevealDirection
  delay?: number
  duration?: number
  className?: string
  /** Set when a parent orchestrates the stagger — skips its own viewport trigger. */
  asChildOfStagger?: boolean
}

export function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  asChildOfStagger = false,
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  if (reduced) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  const orchestrated = asChildOfStagger
    ? {}
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: VIEWPORT_EARLY }

  return (
    <MotionTag
      variants={revealVariants[direction]}
      {...orchestrated}
      transition={{ duration, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/** Wrap a group so children reveal in sequence. Children should use <Reveal asChildOfStagger />. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  as?: ElementType
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  if (reduced) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_EARLY}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
