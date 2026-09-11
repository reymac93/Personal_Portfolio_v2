export type ProjectCategory = 'ai' | 'healthcare' | 'commerce' | 'product'

export type Project = {
  id: string
  name: string
  tagline: string
  category: ProjectCategory
  /** Long-form context shown on the featured cards. */
  description: string
  /** What Reynan owned on the engagement. */
  role: string
  contributions: string[]
  stack: string[]
  url?: string
  /**
   * Poster art lives at /images/projects/<id>.svg by default.
   * Drop a real screenshot in as /images/projects/<id>.png and point here.
   */
  image: string
  /** Brand colour for the dark palette. */
  accent: string
  /** Darkened variant so the same brand reads on the light palette. */
  accentLight: string
  featured: boolean
  year: string
}

export const categoryMeta: Record<
  ProjectCategory,
  { label: string; accent: string }
> = {
  ai: { label: 'AI Platforms', accent: 'var(--color-violet-glow)' },
  healthcare: { label: 'Healthcare', accent: 'var(--color-emerald-glow)' },
  commerce: { label: 'Shopify & Commerce', accent: 'var(--color-amber-glow)' },
  product: { label: 'Product', accent: 'var(--color-accent-400)' },
}

export const projects: Project[] = [
  // ---------------------------------------------------------------- AI
  {
    id: 'alora',
    name: 'Alora',
    tagline: 'Where the world books beautiful talent.',
    category: 'ai',
    description:
      'An invitation-only talent marketplace pairing global brands with vetted models and creators. Membership gating, application review, and booking flows sit on top of an AI-assisted matching layer.',
    role: 'Full stack engineering — booking flows, membership gating, and matching services',
    contributions: [
      'Built the application and review pipeline behind the private-access membership model.',
      'Implemented booking request flows with role-separated dashboards for talent and clients.',
      'Wired AI-assisted matching to rank talent against brief requirements.',
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AWS'],
    url: 'https://joinalora.ai/',
    image: '/images/projects/alora.png',
    accent: '#ef5a70',
    accentLight: '#b00c26',
    featured: true,
    year: '2025',
  },
  {
    id: 'salmaplus',
    name: 'Salma+',
    tagline: 'Healthcare workforce infrastructure.',
    category: 'ai',
    description:
      'A two-sided platform connecting hospitals with clinicians — credentialing, shift matching, and network analytics in one system, built for hospitals and designed for the clinicians who actually use it.',
    role: 'Full stack & ML engineering — matching engine and network analytics',
    contributions: [
      'Built the hospital and clinician onboarding paths as separate, permission-scoped experiences.',
      'Developed the shift-matching service that scores clinician availability against hospital demand.',
      'Shipped network analytics dashboards over a normalized credentialing dataset.',
    ],
    stack: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Azure'],
    url: 'https://salmaplus.ai/',
    image: '/images/projects/salmaplus.png',
    accent: '#4c8dff',
    accentLight: '#1d5fd6',
    featured: true,
    year: '2025',
  },
  {
    id: 'weruntheworld',
    name: 'We Run The World',
    tagline: 'Track where capital moves. Before markets do.',
    category: 'ai',
    description:
      'Private capital intelligence for investors, developers, and family offices. Signal feeds across capital flows, infrastructure, wealth migration, and corridor development, surfaced through an opportunity map and city-level intelligence products.',
    role: 'Full stack engineering — data ingestion, signal pipeline, and membership platform',
    contributions: [
      'Built ingestion pipelines that normalize capital-movement signals from disparate sources.',
      'Implemented the Opportunity Map and Location Intelligence views over geospatial data.',
      'Delivered the membership application and entitlement system gating premium signal tiers.',
    ],
    stack: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Mapbox', 'AWS'],
    url: 'https://weruntheworld.ai/',
    image: '/images/projects/weruntheworld.png',
    accent: '#cbb894',
    accentLight: '#8a6f2f',
    featured: true,
    year: '2025',
  },

  // ---------------------------------------------------------------- Product
  {
    id: 'taskflow',
    name: 'TaskFlow',
    tagline: 'Productivity suite for pipeline-driven teams.',
    category: 'product',
    description:
      'A task and pipeline workspace built around real estate workflows — nested lists, subtask checklists, team workload views, calendar scheduling, habit tracking, and a CRM pipeline, with an assistant layer for triage.',
    role: 'Product engineering — data model, real-time sync, and the task workspace UI',
    contributions: [
      'Designed the nested list and subtask data model backing lists, tags, and saved views.',
      'Built the detail panel with inline notes, subtask progress, comments, and attachments.',
      'Implemented Today / Tomorrow / Next 7 Days scheduling with assignee and workload rollups.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSocket'],
    image: '/images/projects/taskflow.png',
    accent: '#3b82f6',
    accentLight: '#1d5fd6',
    featured: true,
    year: '2026',
  },

  // ---------------------------------------------------------------- Commerce
  {
    id: 'sotobeach',
    name: 'So To Beach',
    tagline: 'Resortwear for sun-soaked days.',
    category: 'commerce',
    description:
      'A UK Shopify store for designer beachwear, raffia hats, and vacation sets — house line plus Pitusa and Chelsea Peers — merchandised so a collection story leads cleanly into the cart.',
    role: 'Shopify development — theme architecture, merchandising, and conversion',
    contributions: [
      'Built custom theme sections for collection stories, bestsellers, and multi-brand browsing.',
      'Merchandised hats, beachwear, and sets so the catalogue reads as an edit, not a grid dump.',
      'Tuned the homepage path from lookbook to checkout — social proof, collection CTAs, and mobile cart.',
    ],
    stack: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    url: 'https://sotobeach.co.uk/',
    image: '/images/projects/sotobeach.png',
    accent: '#d4b07a',
    accentLight: '#8b6530',
    featured: true,
    year: '2026',
  },

  // ---------------------------------------------------------------- Healthcare
  {
    id: 'devoteddoc',
    name: 'Devoted Doc',
    tagline: 'Direct primary care, without the insurance maze.',
    category: 'healthcare',
    description:
      'A membership-based primary care practice site with plan comparison, enrollment, and patient scheduling.',
    role: 'Full stack engineering — enrollment and scheduling',
    contributions: [
      'Built membership enrollment with plan selection and recurring billing hooks.',
      'Integrated patient scheduling against provider availability.',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    url: 'https://devoteddoc.com/',
    image: '/images/projects/devoteddoc.svg',
    accent: '#2dd4bf',
    accentLight: '#0d7d70',
    featured: false,
    year: '2023',
  },
  {
    id: 'zocdoc',
    name: 'Zocdoc',
    tagline: 'Find and book in-network doctors.',
    category: 'healthcare',
    description:
      'A high-traffic healthcare marketplace for finding in-network providers and booking appointments in real time against live practice calendars.',
    role: 'Frontend & API engineering — search, availability, and booking surfaces',
    contributions: [
      'Contributed to provider search and availability interfaces under high request volume.',
      'Worked on API integrations keeping appointment state consistent across clients.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    url: 'https://www.zocdoc.com/',
    image: '/images/projects/zocdoc.svg',
    accent: '#ffae42',
    accentLight: '#9a5b00',
    featured: false,
    year: '2021',
  },

  // ---------------------------------------------------------------- Commerce (also shipped)
  {
    id: 'ketodiet',
    name: 'KetoDiet',
    tagline: 'Keto nutrition, recipes, and commerce.',
    category: 'commerce',
    description:
      'A nutrition brand combining a large recipe and education library with a Shopify storefront, tuned for organic search and mobile conversion.',
    role: 'Shopify development — theme architecture and performance',
    contributions: [
      'Built custom Shopify theme sections for recipe and product merchandising.',
      'Optimized Core Web Vitals across template types on mobile.',
    ],
    stack: ['Shopify', 'Liquid', 'JavaScript', 'SCSS'],
    url: 'https://ketodiet.com/',
    image: '/images/projects/ketodiet.svg',
    accent: '#84cc16',
    accentLight: '#4d7c0f',
    featured: false,
    year: '2022',
  },
  {
    id: 'soleacademy',
    name: 'Sole Academy',
    tagline: 'Sneaker culture retail.',
    category: 'commerce',
    description:
      'A sneaker retailer running timed drops and raffles alongside standard catalogue commerce, where traffic spikes are the normal operating condition.',
    role: 'Shopify development — drop mechanics and catalogue',
    contributions: [
      'Implemented raffle and timed-release mechanics that hold up under launch traffic.',
      'Built filtered catalogue browsing across size and brand inventory.',
    ],
    stack: ['Shopify', 'Liquid', 'JavaScript', 'Tailwind CSS'],
    url: 'https://soleacademy.net/',
    image: '/images/projects/soleacademy.svg',
    accent: '#fb923c',
    accentLight: '#b45309',
    featured: false,
    year: '2022',
  },
  {
    id: 'luxurywish',
    name: 'Luxury Wish',
    tagline: 'Authenticated luxury, curated.',
    category: 'commerce',
    description:
      'A curated luxury marketplace where authentication status, provenance, and one-of-one inventory drive the product experience.',
    role: 'Shopify development — catalogue and authentication surfacing',
    contributions: [
      'Built single-quantity inventory handling for one-of-one luxury pieces.',
      'Surfaced authentication and provenance detail through custom product templates.',
    ],
    stack: ['Shopify', 'Liquid', 'JavaScript', 'SCSS'],
    url: 'https://luxurywish.ph/',
    image: '/images/projects/luxurywish.svg',
    accent: '#d4af6a',
    accentLight: '#87682a',
    featured: false,
    year: '2023',
  },
]
