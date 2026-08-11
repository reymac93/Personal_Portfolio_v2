'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Lock } from 'lucide-react'
import {
  projects,
  categoryMeta,
  type Project,
  type ProjectCategory,
} from '@/data/projects'
import { easeOutExpo } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { AdaptiveImage } from '@/components/ui/AdaptiveImage'

type Filter = 'all' | ProjectCategory

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'ai', label: categoryMeta.ai.label },
  { id: 'healthcare', label: categoryMeta.healthcare.label },
  { id: 'commerce', label: categoryMeta.commerce.label },
  { id: 'product', label: categoryMeta.product.label },
]

function CategoryChip({ category }: { category: ProjectCategory }) {
  const meta = categoryMeta[category]
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em]"
      style={{
        color: meta.accent,
        borderColor: 'color-mix(in oklab, currentColor 32%, transparent)',
        backgroundColor: 'color-mix(in oklab, currentColor 8%, transparent)',
      }}
    >
      {meta.label}
    </span>
  )
}

function LiveLink({ project }: { project: Project }) {
  if (!project.url) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
        <Lock className="size-3.5" aria-hidden />
        Private product
      </span>
    )
  }

  const host = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-accent-400"
    >
      {host}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  )
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1

  return (
    <SpotlightCard
      as="article"
      className="pa w-full"
      accent="var(--pa)"
      vars={{ '--pa-d': project.accent, '--pa-l': project.accentLight }}
    >
      <div
        className={`grid gap-0 lg:grid-cols-2 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}
      >
        {/* Poster */}
        <div className="group/img relative aspect-[16/10] overflow-hidden bg-ink-1000 lg:aspect-auto lg:min-h-[24rem]">
          <AdaptiveImage
            src={project.image}
            alt={`${project.name} — ${project.tagline}`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover/spot:scale-[1.04]"
          />
          {/* Tint toward the project's brand colour */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/spot:opacity-100"
            style={{
              background:
                'linear-gradient(to top, color-mix(in oklab, var(--pa) 22%, transparent), transparent 60%)',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-1000/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-900/50"
          />
          <span className="absolute left-5 top-5 z-10 rounded-full border border-line-strong bg-ink-1000/75 px-2.5 py-1 font-mono text-[0.625rem] text-fg-muted backdrop-blur-sm">
            {project.year}
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-between gap-7 p-7 sm:p-9">
          <div>
            <CategoryChip category={project.category} />

            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {project.name}
            </h3>
            <p className="pa-text mt-2 font-display text-base italic">
              {project.tagline}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-fg-muted">
              {project.description}
            </p>

            <div className="mt-6 rounded-xl border border-line bg-ink-1000/50 p-4">
              <p className="eyebrow mb-3">My role</p>
              <p className="text-sm text-fg">{project.role}</p>
              <ul className="mt-3.5 space-y-2">
                {project.contributions.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span
                      aria-hidden
                      className="pa-bg mt-1.5 size-1 shrink-0 rounded-full"
                    />
                    <span className="text-xs leading-relaxed text-fg-subtle">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.625rem] text-fg-subtle"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <LiveLink project={project} />
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

function CompactCard({ project }: { project: Project }) {
  return (
    <SpotlightCard
      as="article"
      className="pa h-full"
      accent="var(--pa)"
      vars={{ '--pa-d': project.accent, '--pa-l': project.accentLight }}
    >
      <div className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-1000">
          <AdaptiveImage
            src={project.image}
            alt={`${project.name} — ${project.tagline}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover/spot:scale-[1.06]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {project.name}
            </h3>
            <span className="shrink-0 font-mono text-[0.625rem] text-fg-faint">
              {project.year}
            </span>
          </div>

          <p className="pa-text mt-1.5 text-sm">
            {project.tagline}
          </p>

          <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
            {project.role}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.625rem] text-fg-subtle"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-5">
            <LiveLink project={project} />
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

export function Work() {
  const [filter, setFilter] = useState<Filter>('all')

  const { featured, compact } = useMemo(() => {
    const shown =
      filter === 'all' ? projects : projects.filter((p) => p.category === filter)
    return {
      featured: shown.filter((p) => p.featured),
      compact: shown.filter((p) => !p.featured),
    }
  }, [filter])

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[40rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--wash-work),transparent_70%)]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Products running in
              <br />
              <span className="text-fg-faint">production right now.</span>
            </>
          }
          intro="Nine shipped platforms across AI, healthcare, and commerce. Every entry lists what I actually owned — follow the links and judge the work yourself."
        />

        {/* Filter */}
        <div
          role="tablist"
          aria-label="Filter work by category"
          className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-1"
        >
          {filters.map((f) => {
            const isActive = filter === f.id
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setFilter(f.id)}
                className="relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
              >
                {isActive ? (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full border border-line-strong bg-ink-800"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span
                  className={`relative z-10 ${
                    isActive ? 'text-fg-strong' : 'text-fg-subtle hover:text-fg'
                  }`}
                >
                  {f.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Featured */}
        {featured.length > 0 ? (
          <div className="mt-10 space-y-5">
            <AnimatePresence mode="popLayout" initial={false}>
              {featured.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.55, ease: easeOutExpo, delay: i * 0.05 }}
                >
                  <FeaturedCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : null}

        {/* Compact */}
        {compact.length > 0 ? (
          <>
            {featured.length > 0 ? (
              <p className="eyebrow mt-16 mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-accent-400/60" aria-hidden />
                Also shipped
              </p>
            ) : null}

            <div
              className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${featured.length > 0 ? '' : 'mt-10'}`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {compact.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.05 }}
                  >
                    <CompactCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
