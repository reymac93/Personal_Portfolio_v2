'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Mail, MapPin, Copy, Check, ArrowUpRight, Download } from 'lucide-react'
import { profile, socials } from '@/data/profile'
import { brandIcons } from '@/components/ui/BrandIcons'
import { easeOutExpo } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { Magnetic } from '@/components/ui/MagneticButton'

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the
      // adjacent mailto link is the fallback, so stay quiet.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-line-strong bg-ink-850 px-3 py-2 font-mono text-xs text-fg-muted transition-colors hover:border-accent-400/50 hover:text-fg-strong"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="size-3.5 text-emerald-glow" aria-hidden />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <Copy className="size-3.5" aria-hidden />
            Copy
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  )
}

const WhatsappIcon = brandIcons.whatsapp

export function Contact() {
  const waNumber = profile.whatsapp.replace(/[^\d]/g, '')

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      {/* Closing glow — mirrors the hero so the page bookends itself */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[36rem] bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,var(--wash-contact),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-backdrop opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 70% at 50% 90%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 70% at 50% 90%, black, transparent 75%)',
        }}
      />

      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let&rsquo;s build something
                  <br />
                  <span className="text-gradient animate-shine">worth shipping.</span>
                </>
              }
              intro="Open to senior and staff-level engineering roles, plus selective consulting. I read every message and reply within a day or two."
            />

            <Reveal direction="up" delay={0.2} className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={7}>
                  <a
                    href={`mailto:${profile.email}?subject=Project%20enquiry`}
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-fg-strong px-7 py-3.5 text-sm font-semibold text-ink-1000 transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_var(--color-accent-400)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent-400 to-cyan-glow transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                    <Mail className="relative z-10 size-4" aria-hidden />
                    <span className="relative z-10">Send an email</span>
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
                    View résumé
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Channels */}
          <div className="lg:col-span-6">
            <RevealGroup className="space-y-3" stagger={0.08}>
              {/* Email */}
              <Reveal asChildOfStagger direction="up">
                <div className="panel panel-sheen flex items-center gap-4 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-850 text-accent-400">
                    <Mail className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-1 block truncate font-mono text-sm text-fg transition-colors hover:text-accent-400"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <CopyEmail />
                </div>
              </Reveal>

              {/* WhatsApp */}
              <Reveal asChildOfStagger direction="up">
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel group flex items-center gap-4 p-5 transition-colors duration-300 hover:border-line-strong"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-850 text-emerald-glow">
                    <WhatsappIcon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">WhatsApp</p>
                    <p className="mt-1 font-mono text-sm text-fg">
                      {profile.whatsappDisplay}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-fg-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-400" />
                </a>
              </Reveal>

              {/* Location */}
              <Reveal asChildOfStagger direction="up">
                <div className="panel flex items-center gap-4 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-850 text-violet-glow">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">Based in</p>
                    <p className="mt-1 text-sm text-fg">{profile.location}</p>
                    <p className="mt-0.5 font-mono text-xs text-fg-faint">
                      {profile.timezone} · Remote-first
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Socials */}
              <Reveal asChildOfStagger direction="up">
                <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                  {socials.map((social) => {
                    const Icon = brandIcons[social.icon]
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} — ${social.handle}`}
                        className="group flex flex-col items-center gap-2.5 rounded-xl border border-line bg-ink-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/40 hover:bg-ink-850"
                      >
                        <Icon className="size-5 text-fg-subtle transition-colors duration-300 group-hover:text-accent-400" />
                        <span className="font-mono text-[0.625rem] text-fg-faint transition-colors group-hover:text-fg-muted">
                          {social.label}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </Reveal>
            </RevealGroup>
          </div>
        </div>

        {/* Oversized email wordmark */}
        <Reveal direction="up" delay={0.1} className="mt-20">
          <a
            href={`mailto:${profile.email}`}
            className="group block border-t border-line pt-10"
          >
            <motion.span
              className="flex flex-wrap items-baseline justify-between gap-4"
              whileHover="hover"
            >
              <span className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-bold tracking-tight text-fg-faint transition-colors duration-500 group-hover:text-fg-strong">
                {profile.email}
              </span>
              <motion.span
                variants={{ hover: { x: 8, y: -8 } }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors duration-300 group-hover:border-accent-400 group-hover:text-accent-400"
              >
                <ArrowUpRight className="size-5" aria-hidden />
              </motion.span>
            </motion.span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
