export const SITE_URL = 'https://reymac93.vercel.app'

export const profile = {
  name: 'Reynan Guinto Macasaquit',
  shortName: 'Reynan',
  initials: 'RM',
  role: 'Senior Full Stack & AI/ML Engineer',
  location: 'Arayat, Pampanga, Philippines',
  timezone: 'GMT+8',
  availability: 'Open to senior & staff-level roles',
  startYear: 2014,

  email: 'rey.mac93@outlook.com',
  whatsapp: '+639995215400',
  whatsappDisplay: '+63 999 521 5400',
  resumeUrl:
    'https://drive.google.com/file/d/1DJZurSPNsHPeeVPpgxE5jVc2sdeg-pY5/view?usp=sharing',

  headline: {
    lead: 'I build systems',
    accent: 'that think',
    trail: 'and scale.',
  },

  subheadline:
    'Senior Full Stack & AI/ML Engineer with a decade of shipping data-driven products across frontend, backend, and cloud — from high-throughput APIs and Shopify storefronts to machine learning models running in production.',

  summary: [
    'I design and deliver scalable, data-driven applications across the entire stack. My work sits where product engineering meets applied machine learning: FastAPI and Django services, Node.js backends, React and Angular frontends, and ML models deployed to AWS and Azure for real-time and batch inference.',
    'Over the last decade I have taken legacy monoliths apart into modular architectures, tuned PostgreSQL and MongoDB schemas until queries stopped hurting, and stood up CI/CD pipelines that turned week-long release cycles into same-day deploys.',
    'I care about the unglamorous parts — observability, failure modes, and the interfaces between systems — because those are what decide whether software survives contact with production.',
  ],

  education: {
    degree: "Bachelor's Degree in Computer Science",
    school: 'STI College',
    campus: 'San Fernando, Pampanga',
    period: '2010 — 2014',
  },
} as const

/**
 * About-section slideshow. Sources are 1:1, so the frame is square and nothing
 * is cropped. `alt` describes the photo for screen readers; `label` is the
 * caption shown on the card and changes with the slide.
 *
 * Add or remove entries freely — the slider adapts to the array length.
 */
export const portraits = [
  {
    src: '/images/portrait-1.png',
    label: 'Senior Full Stack & AI/ML Engineer',
    alt: 'Reynan Guinto Macasaquit, wearing a grey suit jacket, in an office with a city skyline behind him.',
  },
  {
    src: '/images/portrait-2.png',
    label: 'Architecture review',
    alt: 'Reynan at a whiteboard, marker in hand, walking teammates through an API architecture diagram.',
  },
  {
    src: '/images/portrait-3.png',
    label: 'Deep work',
    alt: 'Reynan writing code at a multi-monitor workstation in an open-plan office in the evening.',
  },
] as const

/** How long each slide holds before advancing, in milliseconds. */
export const PORTRAIT_INTERVAL_MS = 5000

export const socials = [
  {
    label: 'GitHub',
    handle: '@reymac93',
    href: 'https://github.com/reymac93',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'in/reymac93',
    href: 'https://www.linkedin.com/in/reymac93/',
    icon: 'linkedin',
  },
  {
    label: 'X',
    handle: '@reymac93',
    href: 'https://x.com/reymac93',
    icon: 'x',
  },
  {
    label: 'Facebook',
    handle: '/macpain93',
    href: 'https://www.facebook.com/macpain93/',
    icon: 'facebook',
  },
] as const

export const stats = [
  {
    value: 11,
    suffix: '+',
    label: 'Years shipping software',
    detail: 'Since 2014, across three engineering orgs',
  },
  {
    value: 9,
    suffix: '',
    label: 'Products in production',
    detail: 'Commerce, healthcare, and AI platforms',
  },
  {
    value: 40,
    suffix: '%',
    label: 'Performance gain',
    detail: 'Legacy monolith refactored into modular services',
  },
  {
    value: 35,
    suffix: '%',
    label: 'Faster release cycles',
    detail: 'Docker + CI/CD pipelines replacing manual deploys',
  },
] as const
