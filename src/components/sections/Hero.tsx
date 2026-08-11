'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { ArrowDown, ArrowUpRight, Download, MapPin, Clock } from 'lucide-react'
import { profile, stats } from '@/data/profile'
import { easeOutExpo } from '@/lib/motion'
import { SplitText } from '@/components/ui/SplitText'
import { Magnetic } from '@/components/ui/MagneticButton'
import { Counter } from '@/components/ui/Counter'

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Blueprint grid, masked to a soft ellipse so it never reads as a spreadsheet */}
      <div
        className="absolute inset-0 grid-backdrop"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)',
        }}
      />

      {/* Aurora blobs */}
      <div className="absolute -left-[15%] top-[-20%] size-[46rem] animate-aurora rounded-full bg-[radial-gradient(circle,var(--aurora-a),transparent_66%)] blur-[70px]" />
      <div
        className="absolute -right-[10%] top-[4%] size-[40rem] animate-aurora rounded-full bg-[radial-gradient(circle,var(--aurora-b),transparent_66%)] blur-[80px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-24%] left-[26%] size-[42rem] animate-aurora rounded-full bg-[radial-gradient(circle,var(--aurora-c),transparent_66%)] blur-[90px]"
        style={{ animationDelay: '-12s' }}
      />

      {/* Vignette + floor fade into the next section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_35%,var(--color-ink-950)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden noise pt-28 pb-16"
    >
      <Aurora />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="container-x relative z-10"
      >
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------------------------------------------------- Headline */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span className="relative inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink-850/70 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="relative grid size-2 place-items-center">
                  <span className="absolute size-2 animate-pulse-ring rounded-full bg-emerald-glow" />
                  <span className="size-2 rounded-full bg-emerald-glow" />
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg">
                  {profile.availability}
                </span>
              </span>
              <span className="eyebrow">{profile.role}</span>
            </motion.div>

            <h1 className="text-hero font-extrabold">
              <span className="block">
                <SplitText text="I build systems" />
              </span>
              <span className="block">
                {/* The gradient must live on each word span: background-clip:text
                    only paints an element's own text, never its children's. */}
                <SplitText
                  text="that think"
                  delay={0.18}
                  className="text-gradient animate-shine"
                  wordClassName="text-gradient animate-shine"
                />{' '}
                <SplitText text="& scale." delay={0.32} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: easeOutExpo }}
              className="mt-8 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg"
            >
              {profile.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease: easeOutExpo }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={7}>
                <a
                  href="#work"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-fg-strong px-7 py-3.5 text-sm font-semibold text-ink-1000 transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_var(--color-accent-400)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent-400 to-cyan-glow transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                  <span className="relative z-10">View selected work</span>
                  <ArrowUpRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>

              <Magnetic strength={7}>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-all duration-300 hover:border-accent-400/60 hover:bg-ink-850 hover:text-fg-strong"
                >
                  <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Résumé
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* ---------------------------------------------------- Side cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: easeOutExpo }}
            className="lg:col-span-4"
          >
            <div className="flex flex-col gap-3">
              <div className="panel panel-sheen animate-float p-5">
                <p className="eyebrow mb-4">Currently</p>
                <p className="font-display text-lg font-semibold leading-snug text-fg-strong">
                  Senior Full Stack &amp; AI/ML Engineer
                </p>
                <p className="mt-1 text-sm text-fg-muted">Helenhood Inc · Since 2022</p>
                <div className="mt-5 space-y-2.5 border-t border-line pt-4">
                  <p className="flex items-center gap-2.5 text-sm text-fg-muted">
                    <MapPin className="size-4 shrink-0 text-accent-400" />
                    {profile.location}
                  </p>
                  <p className="flex items-center gap-2.5 text-sm text-fg-muted">
                    <Clock className="size-4 shrink-0 text-accent-400" />
                    {profile.timezone} · Overlaps US &amp; EU hours
                  </p>
                </div>
              </div>

              <div
                className="panel animate-float p-5"
                style={{ animationDelay: '-3.5s' }}
              >
                <p className="eyebrow mb-3">Focus</p>
                <ul className="space-y-2 text-sm text-fg-muted">
                  {['Production ML pipelines', 'High-throughput APIs', 'Cloud architecture'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="size-1 rounded-full bg-accent-400" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------------------------------------------------- Stat strip */}
        <motion.dl
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.85 } },
          }}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <dd className="font-display text-4xl font-bold tracking-tight text-fg-strong sm:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-sm font-medium text-fg">{stat.label}</dt>
              <p className="mt-1 text-xs leading-relaxed text-fg-faint">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="grid size-11 place-items-center rounded-full border border-line-strong bg-ink-850/60 text-fg-muted backdrop-blur-sm transition-colors hover:border-accent-400/60 hover:text-accent-400"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
