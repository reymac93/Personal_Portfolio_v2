import { GraduationCap, Award, Quote } from 'lucide-react'
import { profile } from '@/data/profile'
import { certifications } from '@/data/experience'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { PortraitSlider } from '@/components/ui/PortraitSlider'

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sticky heading rail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="About"
                title={
                  <>
                    A decade of shipping,
                    <br />
                    <span className="text-fg-faint">not just prototyping.</span>
                  </>
                }
              />

              {/* Portrait slideshow */}
              <Reveal direction="scale" delay={0.14} className="mt-10">
                <PortraitSlider />
              </Reveal>

              <Reveal direction="up" delay={0.2} className="mt-4">
                <figure className="panel panel-sheen p-6">
                  <Quote className="size-6 text-accent-400/70" aria-hidden />
                  <blockquote className="mt-4 font-display text-lg leading-snug text-fg">
                    &ldquo;The interesting problems are never in the happy
                    path.&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
                    Engineering principle
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          {/* Prose + credentials */}
          <div className="lg:col-span-7">
            <RevealGroup className="space-y-6" stagger={0.1}>
              {profile.summary.map((paragraph, i) => (
                <Reveal key={i} asChildOfStagger direction="up">
                  <p
                    className={`leading-relaxed ${
                      i === 0
                        ? 'text-lg text-fg sm:text-xl'
                        : 'text-base text-fg-muted'
                    }`}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </RevealGroup>

            {/* Education */}
            <Reveal direction="up" delay={0.1} className="mt-12">
              <div className="panel p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-850">
                    <GraduationCap className="size-5 text-accent-400" aria-hidden />
                  </span>
                  <div>
                    <p className="eyebrow">Education</p>
                    <h3 className="mt-2 font-display text-lg font-semibold">
                      {profile.education.degree}
                    </h3>
                    <p className="mt-1 text-sm text-fg-muted">
                      {profile.education.school} · {profile.education.campus}
                    </p>
                    <p className="mt-1 font-mono text-xs text-fg-faint">
                      {profile.education.period}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Certifications */}
            <div className="mt-6">
              <Reveal direction="fade">
                <p className="eyebrow mb-4 flex items-center gap-2.5">
                  <Award className="size-3.5" aria-hidden />
                  Certifications
                </p>
              </Reveal>

              <RevealGroup className="space-y-2.5" stagger={0.07}>
                {certifications.map((cert) => (
                  <Reveal key={cert.title} asChildOfStagger direction="up">
                    <div className="group flex items-start gap-4 rounded-xl border border-line bg-ink-900/50 p-4 transition-colors duration-300 hover:border-line-strong hover:bg-ink-850">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-400 transition-shadow duration-300 group-hover:shadow-[0_0_10px_var(--color-accent-400)]" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug text-fg">
                          {cert.title}
                        </p>
                        <p className="mt-1 font-mono text-xs text-fg-faint">
                          {cert.issuer} · {cert.year}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
