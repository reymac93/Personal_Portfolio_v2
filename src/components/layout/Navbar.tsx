'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks, sectionIds } from '@/data/nav'
import { profile } from '@/data/profile'
import { useActiveSection, useScrolled } from '@/lib/useActiveSection'
import { easeOutExpo } from '@/lib/motion'
import { Magnetic } from '@/components/ui/MagneticButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Logo } from '@/components/ui/Logo'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(24)
  const active = useActiveSection(sectionIds)

  // Lock body scroll while the mobile drawer is up
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-80 transition-all duration-500 ${
          scrolled
            ? 'border-b border-line bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        <nav
          aria-label="Primary"
          className="container-x flex h-full items-center justify-between gap-6"
        >
          <a
            href="#top"
            className="group"
            aria-label={`${profile.name} — back to top`}
          >
            <Logo wordmark="short" />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-line-strong bg-ink-800"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span
                      className={`relative z-10 ${
                        isActive ? 'text-fg-strong' : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Magnetic strength={5} className="hidden sm:inline-flex">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-fg-strong px-5 py-2.5 text-sm font-semibold text-ink-1000 transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_0_28px_-4px_var(--color-accent-400)]"
              >
                Let&rsquo;s talk
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-lg border border-line-strong bg-ink-850 text-fg transition-colors hover:border-accent-400/50 hover:text-fg-strong lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-70 bg-ink-1000/95 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              className="container-x flex h-full flex-col justify-center gap-2"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="font-mono text-xs text-accent-400">{link.index}</span>
                    <span className="font-display text-3xl font-semibold text-fg-strong transition-transform duration-300 group-hover:translate-x-1.5 sm:text-4xl">
                      {link.label}
                    </span>
                    <ArrowUpRight className="ml-auto size-5 text-fg-faint transition-colors group-hover:text-accent-400" />
                  </a>
                </motion.li>
              ))}

              <motion.li
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="mt-8"
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-400"
                >
                  {profile.email}
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
