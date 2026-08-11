import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  intro?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={`flex flex-col gap-5 ${centered ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      <Reveal direction="fade" duration={0.6}>
        <span className="inline-flex items-center gap-2.5 eyebrow">
          <span className="h-px w-8 bg-accent-400/60" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal direction="up" delay={0.08}>
        <h2 className="text-display max-w-3xl font-semibold">{title}</h2>
      </Reveal>

      {intro ? (
        <Reveal direction="up" delay={0.16}>
          <p
            className={`max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg ${centered ? 'mx-auto' : ''}`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
