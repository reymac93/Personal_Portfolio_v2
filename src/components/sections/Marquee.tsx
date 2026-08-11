import { marqueeTech } from '@/data/skills'

function Row({
  items,
  reverse = false,
  duration,
}: {
  items: string[]
  reverse?: boolean
  duration: string
}) {
  // Duplicated once so the -50% keyframe loops seamlessly
  const loop = [...items, ...items]

  return (
    <div
      className="flex w-max animate-marquee items-center gap-3"
      style={{
        ['--marquee-duration' as string]: duration,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      {loop.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex shrink-0 items-center gap-3 rounded-full border border-line bg-ink-900/70 px-5 py-2.5 font-mono text-xs tracking-wide text-fg-muted"
        >
          <span className="size-1 rounded-full bg-accent-400/70" aria-hidden />
          {item}
        </span>
      ))}
    </div>
  )
}

/** Two counter-scrolling tech tickers. Decorative — hidden from assistive tech. */
export function Marquee() {
  const half = Math.ceil(marqueeTech.length / 2)

  return (
    <section
      aria-hidden
      className="relative border-y border-line bg-ink-1000/60 py-8"
    >
      <div className="edge-fade-x flex flex-col gap-3">
        <Row items={marqueeTech.slice(0, half)} duration="46s" />
        <Row items={marqueeTech.slice(half)} duration="38s" reverse />
      </div>
    </section>
  )
}
