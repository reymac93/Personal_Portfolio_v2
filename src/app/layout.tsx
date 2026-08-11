import type { Metadata, Viewport } from 'next'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import { profile, socials, SITE_URL } from '@/data/profile'
import { themeInitScript, FAVICONS } from '@/lib/theme'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

const title = `${profile.name} — ${profile.role}`
const description =
  'Senior Full Stack & AI/ML Engineer with a decade of experience building scalable, data-driven applications. Python, FastAPI, Node.js, React, Next.js, TensorFlow, AWS and Azure.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${profile.shortName}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    'Reynan Macasaquit',
    'Senior Full Stack Engineer',
    'AI/ML Engineer',
    'Machine Learning Engineer',
    'FastAPI',
    'Next.js',
    'Python',
    'Node.js',
    'Philippines developer',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: profile.name,
    title,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@reymac93',
  },
  /**
   * Two tab icons, scoped by media so the mark always contrasts with the tab
   * strip. These queries track the OS; `syncFavicon` in lib/theme.ts overrides
   * them when the visitor has picked a theme manually.
   *
   * The apple-touch icon and OG image still come from the app/ file
   * conventions (apple-icon.tsx, opengraph-image.tsx).
   */
  icons: {
    icon: [
      {
        url: FAVICONS.light,
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: FAVICONS.dark,
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f6f9' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  description,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  telephone: profile.whatsapp,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Arayat',
    addressRegion: 'Pampanga',
    addressCountry: 'PH',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: `${profile.education.school} — ${profile.education.campus}`,
  },
  knowsAbout: [
    'Full Stack Development',
    'Machine Learning Engineering',
    'API Architecture',
    'Cloud Infrastructure',
  ],
  sameAs: socials.map((s) => s.href),
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* Must run before first paint — see lib/theme.ts. The `data-theme`
            attribute it sets on <html> is why this element carries
            suppressHydrationWarning. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
