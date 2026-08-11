'use client'

import { motion, useReducedMotion } from 'motion/react'
import { easeOutExpo } from '@/lib/motion'

type SplitTextProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  /** Masked upward slide — the signature "editorial" headline reveal. */
  once?: boolean
}

/**
 * Splits a line into words and slides each up from behind a clipping mask.
 * Whole-word (not per-character) keeps screen-reader output intact.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  once = true,
}: SplitTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
