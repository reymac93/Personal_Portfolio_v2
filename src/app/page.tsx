import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CursorGlow } from '@/components/layout/CursorGlow'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { About } from '@/components/sections/About'
import { Expertise } from '@/components/sections/Expertise'
import { Experience } from '@/components/sections/Experience'
import { Work } from '@/components/sections/Work'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Experience />
        <Work />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
