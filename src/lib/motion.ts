import type { Variants } from 'motion/react'

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Shared entrance variants. Distance is intentionally small — big travel reads as cheap. */
export const revealVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -26 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
}

export type RevealDirection = keyof typeof revealVariants

/** Trigger a little before the element is centred, so reveals feel responsive. */
export const VIEWPORT_EARLY = { once: true, amount: 0.1 } as const
