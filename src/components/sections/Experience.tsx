'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ChevronRight, Briefcase } from 'lucide-react'
import { experience } from '@/data/experience'
import { easeOutExpo } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

function Entry({
  item,
  index,
}: {
  item: (typeof experience)[number]
  index: number
}) {
  const [open, setOpen] = useState(index === 0)
  const panelId = `exp-panel-${item.id}`

  return (
    <Reveal direction="up" delay={index * 0.05} className="relative pl-12 sm:pl-16">
      {/* Rail node */}
      <span className="absolute left-0 top-7 grid size-8 place-items-center sm:size-10">
        <span className="absolute inset-0 rounded-full border border-line-strong bg-ink-950" />
        {item.current ? (
          <>
            <span className="absolute size-2.5 animate-pulse-ring rounded-full bg-emerald-glow" />
            <span className="relative size-2.5 rounded-full bg-emerald-glow" />
          </>
        ) : (
          <span className="relative size-2 rounded-full bg-fg-faint" />
        )}
      </span>

      <div className="panel panel-sheen mb-4 p-6 sm:p-7">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {item.role}
              </h3>
              {item.current ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-emerald-glow">
                  Current
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
              <span className="font-medium text-accent-400">{item.company}</span>
              <span className="text-fg-faint" aria-hidden>
                ·
              </span>
              <span className="text-fg-subtle">{item.mode}</span>
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-line bg-ink-1000/60 px-3 py-1 font-mono text-xs text-fg-subtle">
            {item.period}
          </span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-fg-muted sm:text-base">
          {item.summary}
        </p>

        {/* Metric chips */}
        <dl className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {item.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-line bg-ink-1000/50 px-4 py-3"
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-bold tracking-tight text-fg-strong">
                  {metric.value}
                </span>
                <span className="mt-0.5 block text-xs text-fg-subtle">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Expandable detail */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle transition-colors hover:text-accent-400"
        >
          <ChevronRight
            className={`size-4 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
            aria-hidden
          />
          {open ? 'Hide detail' : 'What I did'}
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
              className="overflow-hidden"
            >
              <ul className="mt-5 space-y-3 border-t border-line pt-5">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3.5">
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-accent-400"
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-fg-muted">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Stack */}
        <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-ink-1000/60 px-2.5 py-1 font-mono text-[0.6875rem] text-fg-subtle"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 65%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Three orgs, one habit:
              <br />
              <span className="text-fg-faint">leave it faster than I found it.</span>
            </>
          }
          intro="Every number below is one I can walk through in an interview — what the baseline was, what changed, and how it was measured."
        />

        <div ref={railRef} className="relative mt-16">
          {/* Rail track */}
          <div
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-px bg-line sm:left-5"
          />
          {/* Rail progress fill, driven by scroll */}
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-accent-400 via-accent-500 to-transparent sm:left-5"
          />

          <div className="space-y-2">
            {experience.map((item, i) => (
              <Entry key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* Rail terminus */}
          <div className="relative pl-12 pt-2 sm:pl-16">
            <span className="absolute left-0 top-2 grid size-8 place-items-center sm:size-10">
              <span className="absolute inset-0 rounded-full border border-line bg-ink-950" />
              <Briefcase className="relative size-3.5 text-fg-faint" aria-hidden />
            </span>
            <p className="pt-1.5 font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
              Career start · 2014
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
