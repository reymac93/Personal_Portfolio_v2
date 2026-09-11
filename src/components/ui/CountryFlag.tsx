import type { ReactNode } from 'react'

type CountryCode = 'US' | 'GB' | 'DE'

const labels: Record<CountryCode, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  DE: 'Germany',
}

function UsFlag() {
  return (
    <svg viewBox="0 0 19 10" preserveAspectRatio="none" aria-hidden className="size-full">
      <rect width="19" height="10" fill="#bf0a30" />
      {[1, 3, 5, 7, 9].map((y) => (
        <rect key={y} y={y} width="19" height="1" fill="#fff" />
      ))}
      <rect width="8" height="5.4" fill="#002868" />
      {[0.7, 2, 3.3, 4.6].map((y, row) =>
        Array.from({ length: row % 2 === 0 ? 6 : 5 }, (_, i) => {
          const x = row % 2 === 0 ? 0.7 + i * 1.22 : 1.3 + i * 1.22
          return <circle key={`${row}-${i}`} cx={x} cy={y} r="0.28" fill="#fff" />
        }),
      )}
    </svg>
  )
}

function GbFlag() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden className="size-full">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L60 30" stroke="#C8102E" strokeWidth="2" />
      <path d="M60 0 L0 30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

function DeFlag() {
  return (
    <svg viewBox="0 0 5 3" preserveAspectRatio="none" aria-hidden className="size-full">
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#DD0000" />
      <rect y="2" width="5" height="1" fill="#FFCE00" />
    </svg>
  )
}

const flags: Record<CountryCode, () => ReactNode> = {
  US: UsFlag,
  GB: GbFlag,
  DE: DeFlag,
}

export function CountryFlag({
  code,
  className = '',
}: {
  code: CountryCode
  className?: string
}) {
  const Flag = flags[code]
  return (
    <span
      title={labels[code]}
      className={`relative block overflow-hidden bg-ink-1000 ${className}`}
    >
      <span className="sr-only">{labels[code]}</span>
      <Flag />
    </span>
  )
}

export type { CountryCode }
