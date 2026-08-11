'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  portraits,
  PORTRAIT_INTERVAL_MS,
  profile,
} from '@/data/profile'
import { easeOutExpo } from '@/lib/motion'
import { AdaptiveImage } from '@/components/ui/AdaptiveImage'
import type { CSSVars } from '@/lib/css'

const COUNT = portraits.length
const SWIPE_THRESHOLD = 44

export function PortraitSlider() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStart = useRef<number | null>(null)

  const go = useCallback((next: number) => {
    setIndex(((next % COUNT) + COUNT) % COUNT)
  }, [])

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  // Autoplay. setState inside the interval callback is not a synchronous
  // effect-body update, so it does not cascade renders.
  useEffect(() => {
    if (paused || reduced || COUNT < 2) return
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % COUNT),
      PORTRAIT_INTERVAL_MS,
    )
    return () => window.clearInterval(id)
  }, [paused, reduced, index])

  function onPointerDown(e: React.PointerEvent) {
    dragStart.current = e.clientX
  }

  function onPointerUp(e: React.PointerEvent) {
    const start = dragStart.current
    dragStart.current = null
    if (start === null) return
    const dx = e.clientX - start
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0) next()
    else prev()
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  const active = portraits[index]

  return (
    <figure
      className="group relative overflow-hidden rounded-2xl border border-line shadow-lift"
      data-paused={paused ? 'true' : 'false'}
      style={{ '--slide-ms': `${PORTRAIT_INTERVAL_MS}ms` } as CSSVars}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={`Photos of ${profile.name}`}
    >
      {/* ------------------------------------------------------------ Frame */}
      <div
        className="relative aspect-square touch-pan-y bg-ink-1000"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-label={`Slide ${index + 1} of ${COUNT}: ${active.label}`}
      >
        {portraits.map((shot, i) => {
          const isActive = i === index
          return (
            <motion.div
              key={shot.src}
              aria-hidden={!isActive}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.85, ease: easeOutExpo }}
              className="absolute inset-0"
              style={{ pointerEvents: 'none' }}
            >
              {/* Slow drift on the active slide only — stills feel alive
                  without the crop wandering far enough to lose the subject. */}
              <motion.div
                className="absolute inset-0"
                animate={
                  reduced ? { scale: 1 } : { scale: isActive ? 1.06 : 1 }
                }
                transition={{
                  duration: isActive ? PORTRAIT_INTERVAL_MS / 1000 + 1 : 0.6,
                  ease: 'linear',
                }}
              >
                <AdaptiveImage
                  src={shot.src}
                  alt={shot.alt}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={i === 0}
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          )
        })}

        {/* Scrim keeps the caption readable over any of the three photos */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-1000 via-ink-1000/25 to-transparent"
        />

        {/* Arrows — pointer devices, revealed on hover/focus */}
        {COUNT > 1 ? (
          <div className="pointer-events-none absolute inset-x-3 top-1/2 hidden -translate-y-1/2 justify-between lg:flex">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="pointer-events-auto grid size-9 place-items-center rounded-full border border-line-strong bg-ink-950/70 text-fg opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-accent-400/60 hover:text-accent-400 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="pointer-events-auto grid size-9 place-items-center rounded-full border border-line-strong bg-ink-950/70 text-fg opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-accent-400/60 hover:text-accent-400 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>

      {/* ---------------------------------------------------------- Caption */}
      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold text-fg-strong">
              {profile.name}
            </p>

            {/* Swaps with the slide */}
            <div className="relative mt-1 h-4 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active.label}
                  initial={reduced ? undefined : { y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduced ? undefined : { y: -14, opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className="absolute inset-0 truncate font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-400"
                >
                  {active.label}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <span className="flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-ink-950/70 px-3 py-1 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald-glow" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fg">
              Available
            </span>
          </span>
        </div>

        {/* -------------------------------------------------------- Controls */}
        {COUNT > 1 ? (
          <div className="mt-4 flex items-center gap-2">
            {portraits.map((shot, i) => {
              const isActive = i === index
              return (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show photo ${i + 1}: ${shot.label}`}
                  aria-current={isActive}
                  className={`relative h-1 overflow-hidden rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-10 bg-fg-strong/25'
                      : 'w-4 bg-fg-strong/25 hover:bg-fg-strong/40'
                  }`}
                >
                  {isActive ? (
                    <span
                      // Remount per slide restarts the fill animation
                      key={`fill-${index}`}
                      aria-hidden
                      className="dot-fill absolute inset-0 rounded-full bg-accent-400"
                    />
                  ) : null}
                </button>
              )
            })}

            <span className="ml-auto font-mono text-[0.625rem] tabular-nums text-fg-faint">
              {String(index + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
            </span>
          </div>
        ) : null}
      </figcaption>

      {/* Announce slide changes without moving focus */}
      <span className="sr-only" role="status" aria-live="polite">
        {`Slide ${index + 1} of ${COUNT}: ${active.label}`}
      </span>
    </figure>
  )
}
