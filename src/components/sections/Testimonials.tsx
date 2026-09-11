'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import {
  CLIENT_INTERVAL_MS,
  testimonials,
  type Testimonial,
} from '@/data/testimonials'
import { easeOutExpo } from '@/lib/motion'
import type { CSSVars } from '@/lib/css'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { AdaptiveImage } from '@/components/ui/AdaptiveImage'
import { CountryFlag } from '@/components/ui/CountryFlag'

const COUNT = testimonials.length
const SWIPE_THRESHOLD = 44

function wrap(n: number) {
  return ((n % COUNT) + COUNT) % COUNT
}

function ProjectChip({ name, href }: { name: string; href?: string }) {
  const className =
    'inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-1000/55 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-subtle transition-colors duration-300'

  if (!href) {
    return <span className={className}>{name}</span>
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:border-accent-400/45 hover:text-fg`}
    >
      {name}
      <ArrowUpRight className="size-3" aria-hidden />
    </a>
  )
}

function Slide({ item }: { item: Testimonial }) {
  return (
    <div className="grid lg:grid-cols-12">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-1000 sm:aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-[26rem]">
        <AdaptiveImage
          src={item.photo}
          alt={item.alt}
          sizes="(max-width: 1024px) 100vw, 42vw"
          className={`${item.photoClass} transition-transform duration-[900ms] ease-out-expo`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-1000/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-900/50"
        />

        {/* Country flag — top left of this client. */}
        <span className="absolute left-4 top-4 z-20 overflow-hidden rounded-md shadow-lift ring-1 ring-black/25">
          <CountryFlag
            code={item.country}
            className="h-[18px] w-[28px] sm:h-5 sm:w-8"
          />
        </span>
      </div>

      <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-7 lg:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Quote className="size-7 pa-text opacity-80" aria-hidden />
            {item.badge ? (
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] pa-text"
                style={{
                  borderColor: 'color-mix(in oklab, var(--pa) 32%, transparent)',
                  backgroundColor:
                    'color-mix(in oklab, var(--pa) 8%, transparent)',
                }}
              >
                {item.badge}
              </span>
            ) : null}
          </div>

          <blockquote className="mt-5 font-display text-xl font-medium leading-snug tracking-tight text-fg-strong sm:text-2xl">
            {item.quote}
          </blockquote>
        </div>

        <footer className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
          <cite className="not-italic">
            <span className="block font-display text-lg font-semibold tracking-tight text-fg-strong">
              {item.name}
            </span>
            <span className="mt-1 block text-sm text-fg-muted">
              {item.role} of {item.company}
            </span>
          </cite>

          <ul className="flex flex-wrap gap-1.5">
            {item.projects.map((project) => (
              <li key={project.name}>
                <ProjectChip name={project.name} href={project.href} />
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  )
}

export function Testimonials() {
  const reduced = useReducedMotion()
  const [[index, direction], setPage] = useState([0, 1])
  const dragStart = useRef<number | null>(null)

  const active = testimonials[index]

  const go = useCallback((next: number, dir?: number) => {
    const wrapped = wrap(next)
    setPage((current) => {
      const from = current[0]
      const inferred =
        wrapped === wrap(from + 1) ? 1 : wrapped === wrap(from - 1) ? -1 : wrapped > from ? 1 : -1
      return [wrapped, dir ?? inferred]
    })
  }, [])

  const next = useCallback(() => go(index + 1, 1), [go, index])
  const prev = useCallback(() => go(index - 1, -1), [go, index])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden) return
      setPage(([i]) => [wrap(i + 1), 1])
    }, CLIENT_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [index])

  function onPointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest('a, button')) return
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

  return (
    <section id="clients" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[36rem] bg-[radial-gradient(ellipse_55%_50%_at_50%_40%,var(--wash-clients),transparent_70%)]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Kind words"
          title={
            <>
              People I ship with,
              <br />
              <span className="text-fg-faint">not just for.</span>
            </>
          }
          intro="Five clients. Eight products still in the world. The slider keeps moving — swipe, use the arrows, or tap a face to jump."
        />

        <Reveal direction="up" delay={0.12} className="mt-14">
          <div
            className="pa group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-ink-800/90 to-ink-900/95 shadow-panel"
            data-paused="false"
            style={
              {
                '--pa-d': active.accent,
                '--pa-l': active.accentLight,
                '--slide-ms': `${CLIENT_INTERVAL_MS}ms`,
              } as CSSVars
            }
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <p className="sr-only" role="status" aria-live="polite">
              Slide {index + 1} of {COUNT}: {active.name}, {active.role} of{' '}
              {active.company}
            </p>

            <div className="relative overflow-hidden touch-pan-y">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) =>
                      reduced ? { opacity: 0 } : { x: d * 56, opacity: 0 },
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) =>
                      reduced ? { opacity: 0 } : { x: d * -56, opacity: 0 },
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduced ? 0.01 : 0.55, ease: easeOutExpo }}
                >
                  <Slide item={active} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-3 right-3 hidden items-center justify-between lg:flex">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous client"
                className="pointer-events-auto grid size-10 place-items-center rounded-full border border-line-strong bg-ink-950/70 text-fg opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-accent-400/60 hover:text-accent-400 focus-visible:opacity-100 group-hover:opacity-100"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next client"
                className="pointer-events-auto grid size-10 place-items-center rounded-full border border-line-strong bg-ink-950/70 text-fg opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-accent-400/60 hover:text-accent-400 focus-visible:opacity-100 group-hover:opacity-100"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          {/* Client rail — the playhead flows along these faces. */}
          <div
            role="tablist"
            aria-label="Choose a client"
            className="mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar sm:gap-3"
          >
            {testimonials.map((item, i) => {
              const isActive = i === index
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${item.name}, ${item.role} of ${item.company}`}
                  onClick={() => go(i)}
                  className={`pa group/rail relative flex min-w-0 flex-1 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-500 sm:px-4 ${
                    isActive
                      ? 'border-line-strong bg-ink-850'
                      : 'border-line bg-ink-900/50 hover:border-line-strong hover:bg-ink-850/70'
                  }`}
                  style={
                    {
                      '--pa-d': item.accent,
                      '--pa-l': item.accentLight,
                    } as CSSVars
                  }
                >
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-line-strong bg-ink-1000 sm:size-11">
                    <span className="absolute -left-px -top-px z-10 overflow-hidden rounded-br-sm">
                      <CountryFlag code={item.country} className="h-2.5 w-4" />
                    </span>
                    <AdaptiveImage
                      src={item.photo}
                      alt={item.alt}
                      sizes="44px"
                      className={item.photoClass}
                    />
                  </span>

                  <span className="min-w-0 hidden sm:block">
                    <span
                      className={`block truncate font-display text-sm font-semibold ${
                        isActive ? 'text-fg-strong' : 'text-fg'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-faint">
                      {item.company}
                    </span>
                  </span>

                  {isActive ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-line"
                    >
                      <span
                        key={`fill-${index}`}
                        className="dot-fill block h-full pa-bg"
                      />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
            {String(index + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
