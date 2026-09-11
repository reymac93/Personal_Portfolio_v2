import type { CountryCode } from '@/components/ui/CountryFlag'

export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
  country: CountryCode
  photo: string
  photoClass: string
  alt: string
  accent: string
  accentLight: string
  badge?: string
  projects: { name: string; href?: string }[]
}

/** How long each slide holds before the slider advances. */
export const CLIENT_INTERVAL_MS = 7000

export const testimonials: Testimonial[] = [
  {
    id: 'jonathan-howard',
    quote:
      "Our agents were living in three tools and still dropping follow-ups. Reynan sat with how Onward actually works — nested lists, the pipeline, today versus next week — and TaskFlow replaced the pile. Nobody asked for a walkthrough. They just opened it Monday.",
    name: 'Jonathan Howard',
    role: 'CEO',
    company: 'Onward',
    country: 'US',
    photo: '/images/testimonials/jonathan-howard.jpg',
    photoClass: 'object-cover object-[72%_14%]',
    alt: 'Jonathan Howard, CEO of Onward.',
    accent: '#3b82f6',
    accentLight: '#1d5fd6',
    projects: [{ name: 'TaskFlow' }],
  },
  {
    id: 'carley-corbin',
    quote:
      "I don't brief Reynan like a vendor. I tell him what the product has to do — private membership, clinician matching, capital signals — and he comes back with the system. Alora, Salma+, We Run The World all went out under the same quiet standard: if a stranger hits it at midnight, it still works.",
    name: 'Carley Corbin',
    role: 'CEO',
    company: 'Alora',
    country: 'US',
    photo: '/images/testimonials/carley-corbin.png',
    photoClass: 'object-cover object-[50%_18%]',
    alt: 'Carley Corbin, CEO of Alora.',
    accent: '#ef5a70',
    accentLight: '#b00c26',
    badge: 'Repeat client · 3 products',
    projects: [
      { name: 'Alora', href: 'https://joinalora.ai/' },
      { name: 'Salma+', href: 'https://salmaplus.ai/' },
      { name: 'We Run The World', href: 'https://weruntheworld.ai/' },
    ],
  },
  {
    id: 'joe-nahas',
    quote:
      "Luxury Wish had to feel like a salon, not a catalogue — one-of-one pieces, authentication on the page, no 'add twelve to cart.' Reynan built the product templates around provenance. Shoppers could tell, in one glance, that the piece was real and the only one.",
    name: 'Joe Nahas',
    role: 'Founder',
    company: 'ExpRealty',
    country: 'US',
    photo: '/images/testimonials/joe-nahas.jpg',
    photoClass: 'object-cover object-[42%_12%]',
    alt: 'Joe Nahas, founder of ExpRealty.',
    accent: '#d4af6a',
    accentLight: '#87682a',
    projects: [{ name: 'Luxury Wish', href: 'https://luxurywish.ph/' }],
  },
  {
    id: 'natalie-murph',
    quote:
      "I needed the store to feel like the brand — sun, hats, the slow scroll from lookbook into the bag. Reynan didn't drop a generic theme on us. Collection stories, merchandising, the path to checkout — it finally looks like So To Beach, and it sells like one.",
    name: 'Natalie Murph',
    role: 'CEO',
    company: 'So To Beach',
    country: 'GB',
    photo: '/images/testimonials/natalie-murph.png',
    photoClass: 'object-cover object-[50%_18%]',
    alt: 'Natalie Murph, CEO of So To Beach.',
    accent: '#d4b07a',
    accentLight: '#8b6530',
    projects: [{ name: 'So To Beach', href: 'https://sotobeach.co.uk/' }],
  },
  {
    id: 'paul-weiss',
    quote:
      'Sole Academy spikes on drop day. KetoDiet lives and dies on recipe pages and mobile. Two very different shops, one engineer who already knew where Shopify breaks. Reynan tuned the bits customers actually feel — catalogue, drops, speed — and we stopped firefighting launches.',
    name: 'Paul Weiss',
    role: 'CEO',
    company: 'Uniq Solutions',
    country: 'DE',
    photo: '/images/testimonials/paul-weiss.jpg',
    photoClass: 'object-cover object-[50%_18%]',
    alt: 'Paul Weiss, CEO of Uniq Solutions.',
    accent: '#fb923c',
    accentLight: '#b45309',
    badge: 'Repeat client · 2 products',
    projects: [
      { name: 'Sole Academy', href: 'https://soleacademy.net/' },
      { name: 'KetoDiet', href: 'https://ketodiet.com/' },
    ],
  },
]
