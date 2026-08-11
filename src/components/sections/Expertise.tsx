import { Brain, Server, Database, Cloud, Layers, Wrench } from 'lucide-react'
import { skillDomains, type SkillDomain } from '@/data/skills'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const iconMap = {
  brain: Brain,
  server: Server,
  database: Database,
  cloud: Cloud,
  layers: Layers,
  wrench: Wrench,
} as const

const spanClass: Record<SkillDomain['span'], string> = {
  wide: 'lg:col-span-4',
  tall: 'lg:col-span-2 lg:row-span-2',
  normal: 'lg:col-span-2',
}

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 sm:py-32">
      {/* Section-level ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--wash-expertise),transparent_65%)] blur-3xl"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Expertise"
          title={
            <>
              The stack I reach for,
              <br />
              <span className="text-fg-faint">and why.</span>
            </>
          }
          intro="Six domains, one throughline: choose the boring, well-understood tool unless the problem genuinely demands otherwise."
        />

        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
          stagger={0.07}
        >
          {skillDomains.map((domain) => {
            const Icon = iconMap[domain.icon]
            return (
              <Reveal
                key={domain.id}
                asChildOfStagger
                direction="up"
                className={spanClass[domain.span]}
              >
                <SpotlightCard accent={domain.accent} className="h-full">
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-3.5">
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-850"
                        style={{ color: domain.accent }}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="font-display text-base font-semibold tracking-tight">
                        {domain.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                      {domain.blurb}
                    </p>

                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {domain.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-md border border-line bg-ink-1000/60 px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-fg-subtle transition-colors duration-300 group-hover/spot:text-fg-muted"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
