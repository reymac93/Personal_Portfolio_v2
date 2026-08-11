import { profile, socials } from '@/data/profile'
import { navLinks } from '@/data/nav'
import { brandIcons } from '@/components/ui/BrandIcons'
import { BackToTop } from '@/components/ui/BackToTop'
import { Logo } from '@/components/ui/Logo'

/**
 * Server component on purpose. `new Date()` in a *client* component would be
 * evaluated once at prerender and again in the browser — a hydration mismatch
 * waiting for New Year's Eve. Here it only ever runs at build time.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-ink-1000">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <a href="#top" className="inline-flex">
              <Logo wordmark="full" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
              {profile.role} building scalable, data-driven systems from{' '}
              {profile.location}.
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="eyebrow">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 lg:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Elsewhere</p>
            <ul className="flex gap-2">
              {socials.map((social) => {
                const Icon = brandIcons[social.icon]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-lg border border-line bg-ink-900 text-fg-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/40 hover:text-accent-400"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 font-mono text-xs text-fg-subtle transition-colors hover:text-accent-400"
            >
              {profile.email}
            </a>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="font-mono text-xs text-fg-faint">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="font-mono text-xs text-fg-faint">
              Next.js · TypeScript · Tailwind
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}
