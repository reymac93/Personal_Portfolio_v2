/**
 * Generates on-brand poster art for each project into public/images/projects/.
 *
 * These are stylised brand cards — a wordmark and palette echoing each product —
 * NOT screenshots. Replace any of them with a real capture by dropping
 * `<id>.png` into public/images/projects/ and updating `image` in
 * src/data/projects.ts. Everything else adapts automatically.
 *
 * Run: node scripts/generate-posters.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '../public/images/projects')

const W = 1600
const H = 1000

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Deterministic PRNG so regeneration produces byte-identical files. */
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS =
  "'Helvetica Neue', Helvetica, Arial, sans-serif"
const MONO = "'SFMono-Regular', Consolas, monospace"

/* ------------------------------------------------------------------ motifs */

function starfield(seed, color, count = 220) {
  const rand = rng(seed)
  let out = ''
  for (let i = 0; i < count; i++) {
    const x = rand() * W
    const y = rand() * H
    const r = rand() * 1.9 + 0.3
    const o = rand() * 0.7 + 0.12
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${color}" opacity="${o.toFixed(2)}"/>`
  }
  return out
}

function constellation(seed, color, nodes = 22) {
  const rand = rng(seed)
  const pts = Array.from({ length: nodes }, () => ({
    x: 380 + rand() * (W - 460),
    y: 90 + rand() * (H - 220),
  }))
  let lines = ''
  for (let i = 0; i < pts.length - 1; i++) {
    lines += `<line x1="${pts[i].x.toFixed(1)}" y1="${pts[i].y.toFixed(1)}" x2="${pts[i + 1].x.toFixed(1)}" y2="${pts[i + 1].y.toFixed(1)}" stroke="${color}" stroke-width="1" opacity="0.28"/>`
  }
  const dots = pts
    .map(
      (p) =>
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${color}" opacity="0.85"/>`,
    )
    .join('')
  return lines + dots
}

function meshLines(seed, color) {
  const rand = rng(seed)
  let out = ''
  for (let i = 0; i < 26; i++) {
    const x1 = 700 + rand() * 900
    const y1 = rand() * H
    const x2 = 700 + rand() * 900
    const y2 = rand() * H
    out += `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="${color}" stroke-width="0.8" opacity="0.22"/>`
  }
  return out
}

function diagonalStripes(color) {
  let out = ''
  for (let i = -8; i < 26; i++) {
    const x = i * 120
    out += `<path d="M${x} ${H} L${x + 300} 0 L${x + 348} 0 L${x + 48} ${H} Z" fill="${color}" opacity="0.05"/>`
  }
  return out
}

function pulseLine(color) {
  return `<path d="M120 700 L420 700 L470 610 L520 800 L580 660 L640 700 L1480 700"
    fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round"
    stroke-linecap="round" opacity="0.55"/>`
}

function calendarSlots(color) {
  let out = ''
  for (let c = 0; c < 5; c++) {
    for (let r = 0; r < 3; r++) {
      const x = 980 + c * 116
      const y = 500 + r * 116
      const filled = (c + r) % 3 === 0
      out += `<rect x="${x}" y="${y}" width="92" height="92" rx="14" fill="${filled ? color : 'none'}" opacity="${filled ? 0.85 : 1}" stroke="${color}" stroke-width="1.5" ${filled ? '' : 'stroke-opacity="0.35"'}/>`
    }
  }
  return out
}

function goldFrame(color) {
  return `<rect x="70" y="70" width="${W - 140}" height="${H - 140}" fill="none" stroke="${color}" stroke-width="1" opacity="0.35"/>
    <rect x="88" y="88" width="${W - 176}" height="${H - 176}" fill="none" stroke="${color}" stroke-width="1" opacity="0.18"/>`
}

function arcMotif(color) {
  return `<circle cx="1330" cy="500" r="300" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>
    <circle cx="1330" cy="500" r="220" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.22"/>
    <circle cx="1330" cy="500" r="140" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.16"/>
    <circle cx="1330" cy="500" r="60" fill="${color}" opacity="0.16"/>`
}

/* ------------------------------------------------- shared poster scaffolding */

function radialGlow(id, color, cx, cy, r, opacity) {
  return {
    def: `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="${color}" stop-opacity="${opacity}"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>`,
    use: `<rect width="${W}" height="${H}" fill="url(#${id})"/>`,
  }
}

function wrap({ bg, defs = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
${defs}
  </defs>
  <rect width="${W}" height="${H}" fill="${bg}"/>
${body}
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.05" style="mix-blend-mode:overlay"/>
</svg>
`
}

/* --------------------------------------------------------------- the posters */

const posters = {
  /* Seen in reference: black + crimson glow, spaced serif wordmark */
  alora() {
    const glow = radialGlow('g', '#c8102e', 800, 380, 620, 0.62)
    return wrap({
      bg: '#050405',
      defs: glow.def,
      body: `${glow.use}
  <text x="${W / 2}" y="235" text-anchor="middle" font-family="${SANS}" font-size="26"
    letter-spacing="12" fill="#e9e2e4" opacity="0.82">PRIVATE ACCESS &#183; GLOBAL TALENT</text>
  <text x="${W / 2}" y="500" text-anchor="middle" font-family="${SERIF}" font-size="186"
    letter-spacing="26" fill="#ffffff">ALORA</text>
  <rect x="${W / 2 - 230}" y="548" width="460" height="2" fill="#e2637a" opacity="0.55"/>
  <text x="${W / 2}" y="655" text-anchor="middle" font-family="${SERIF}" font-size="58" fill="#f2eaec">
    Where the world <tspan font-style="italic" fill="#e8425f">books beautiful talent.</tspan></text>
  <rect x="${W / 2 - 250}" y="775" width="230" height="76" fill="#8e1027"/>
  <text x="${W / 2 - 135}" y="822" text-anchor="middle" font-family="${SANS}" font-size="22"
    letter-spacing="4" fill="#ffffff">BOOK TALENT</text>
  <rect x="${W / 2 + 20}" y="775" width="240" height="76" fill="none" stroke="#8a8082" stroke-width="1.5"/>
  <text x="${W / 2 + 140}" y="822" text-anchor="middle" font-family="${SANS}" font-size="22"
    letter-spacing="4" fill="#efe9ea">APPLY TO ALORA</text>`,
    })
  },

  /* Seen in reference: navy starfield + rainbow gradient display type */
  salmaplus() {
    const glow = radialGlow('g', '#1b3f8f', 1180, 420, 760, 0.5)
    return wrap({
      bg: '#050a17',
      defs: `${glow.def}
    <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#38bdf8"/>
      <stop offset="0.3" stop-color="#5b5bf5"/>
      <stop offset="0.58" stop-color="#c026a8"/>
      <stop offset="0.8" stop-color="#f4552f"/>
      <stop offset="1" stop-color="#f9a825"/>
    </linearGradient>`,
      body: `${glow.use}
  ${starfield(7, '#cfe3ff', 260)}
  ${meshLines(11, '#7fb6ff')}
  <text x="110" y="330" font-family="${SANS}" font-size="34" letter-spacing="12"
    fill="#dbe7ff">HEALTHCARE WORKFORCE</text>
  <text x="104" y="500" font-family="${SANS}" font-size="150" font-weight="bold"
    letter-spacing="-2" fill="url(#rainbow)">INFRASTRUCTURE</text>
  <text x="110" y="600" font-family="${SANS}" font-size="46" fill="#e8effb">
    Built for hospitals. Designed for clinicians.</text>
  <rect x="110" y="690" width="330" height="112" rx="14" fill="none" stroke="#3ddbc4" stroke-width="2"/>
  <text x="275" y="758" text-anchor="middle" font-family="${SANS}" font-size="34" fill="#eaf6ff">Hospitals</text>
  <rect x="470" y="690" width="330" height="112" rx="14" fill="none" stroke="#a855f7" stroke-width="2"/>
  <text x="635" y="758" text-anchor="middle" font-family="${SANS}" font-size="34" fill="#eaf6ff">Clinicians</text>`,
    })
  },

  /* Seen in reference: black + tan gold, serif caps, constellation right */
  weruntheworld() {
    const glow = radialGlow('g', '#6b5a32', 1100, 420, 700, 0.4)
    return wrap({
      bg: '#0a0907',
      defs: glow.def,
      body: `${glow.use}
  ${constellation(23, '#cbb894', 24)}
  <rect x="110" y="228" width="46" height="2" fill="#cbb894"/>
  <text x="176" y="238" font-family="${SANS}" font-size="24" letter-spacing="8"
    fill="#cbb894">PRIVATE CAPITAL INTELLIGENCE</text>
  <text x="108" y="366" font-family="${SERIF}" font-size="94" fill="#f4f1ea">TRACK WHERE</text>
  <text x="108" y="466" font-family="${SERIF}" font-size="94" fill="#f4f1ea">CAPITAL MOVES.</text>
  <text x="108" y="566" font-family="${SERIF}" font-size="94" fill="#cbb894">BEFORE MARKETS</text>
  <text x="108" y="666" font-family="${SERIF}" font-size="94" fill="#cbb894">DO.</text>
  <rect x="110" y="742" width="46" height="1.5" fill="#7d7160"/>
  <rect x="110" y="800" width="330" height="76" fill="#cbb894"/>
  <text x="275" y="847" text-anchor="middle" font-family="${SANS}" font-size="21"
    letter-spacing="3" fill="#141210">APPLY FOR MEMBERSHIP</text>
  <rect x="466" y="800" width="300" height="76" fill="none" stroke="#4a443a" stroke-width="1.5"/>
  <text x="616" y="847" text-anchor="middle" font-family="${SANS}" font-size="21"
    letter-spacing="3" fill="#e6e0d4">EXPLORE SIGNALS</text>`,
    })
  },

  /* Seen in reference: light productivity UI with blue accent */
  taskflow() {
    const rows = [
      ['Listing appointment — 765 Prairie Sq', 'Aug 5, 10:30', true],
      ['Update MLS description — 765 Prairie Sq', 'Aug 5', false],
      ['Renew listing agreement — 412 Fairmont Ave', 'Aug 5, 17:45', false],
      ['Seller update call — Sandoval', 'Aug 8', false],
      ['Price review: 52 Maple Grove', 'Aug 12', false],
      ['Renew listing agreement — 901 Chestnut Row', 'Aug 12, 14:00', false],
    ]
    const list = rows
      .map(([label, when, active], i) => {
        const y = 300 + i * 78
        return `<rect x="404" y="${y}" width="740" height="62" rx="10" fill="${active ? '#eef2f7' : '#ffffff'}" stroke="#e6e9ef"/>
      <rect x="418" y="${y + 14}" width="4" height="34" rx="2" fill="#f5a623"/>
      <rect x="438" y="${y + 21}" width="20" height="20" rx="5" fill="none" stroke="#c3c9d4" stroke-width="2"/>
      <text x="476" y="${y + 38}" font-family="${SANS}" font-size="21" fill="#1e2430">${esc(label)}</text>
      <text x="1128" y="${y + 38}" text-anchor="end" font-family="${SANS}" font-size="17" fill="#e0533d">${esc(when)}</text>`
      })
      .join('')

    const sidebar = [
      'All Tasks',
      'Today',
      'Tomorrow',
      'Next 7 Days',
      'Inbox',
      'Calendar',
      'Team Workload',
      'Analytics',
    ]
      .map((label, i) => {
        const y = 250 + i * 62
        const active = label === 'Next 7 Days'
        return `${active ? `<rect x="24" y="${y - 26}" width="308" height="50" rx="10" fill="#e8eef8"/>` : ''}
      <rect x="46" y="${y - 16}" width="22" height="22" rx="5" fill="none" stroke="#8d97a8" stroke-width="2"/>
      <text x="86" y="${y + 2}" font-family="${SANS}" font-size="21" fill="${active ? '#1f56c8' : '#4a5464'}">${esc(label)}</text>`
      })
      .join('')

    return wrap({
      bg: '#f7f8fa',
      body: `<rect x="0" y="0" width="356" height="${H}" fill="#ffffff"/>
  <rect x="356" y="0" width="1" height="${H}" fill="#e6e9ef"/>
  <rect x="0" y="0" width="${W}" height="86" fill="#ffffff"/>
  <rect x="0" y="86" width="${W}" height="1" fill="#e6e9ef"/>
  <rect x="30" y="26" width="38" height="38" rx="10" fill="#2f6bff"/>
  <path d="M42 38 L56 38 L45 54 L52 44 L42 44 Z" fill="#ffffff"/>
  <text x="82" y="46" font-family="${SANS}" font-size="24" font-weight="bold" fill="#141922">TaskFlow</text>
  <text x="82" y="68" font-family="${SANS}" font-size="16" fill="#8d97a8">Productivity Suite</text>
  <rect x="404" y="28" width="520" height="36" rx="18" fill="#f1f3f7"/>
  <text x="432" y="52" font-family="${SANS}" font-size="18" fill="#9aa3b2">Search tasks, lists, people...</text>
  ${sidebar}
  <text x="404" y="170" font-family="${SANS}" font-size="46" font-weight="bold" fill="#141922">Next 7 Days</text>
  <text x="404" y="210" font-family="${SANS}" font-size="20" fill="#8d97a8">Aug 11 – Aug 17</text>
  <rect x="404" y="240" width="72" height="34" rx="17" fill="#2f6bff"/>
  <text x="440" y="263" text-anchor="middle" font-family="${SANS}" font-size="17" fill="#ffffff">All</text>
  ${list}
  <rect x="1188" y="120" width="384" height="760" rx="16" fill="#ffffff" stroke="#e6e9ef"/>
  <text x="1216" y="178" font-family="${SANS}" font-size="24" font-weight="bold" fill="#141922">Listing appointment</text>
  <rect x="1216" y="204" width="150" height="34" rx="8" fill="#f1f3f7"/>
  <text x="1291" y="227" text-anchor="middle" font-family="${SANS}" font-size="16" fill="#4a5464">Aug 5 · 10:30</text>
  <rect x="1378" y="204" width="110" height="34" rx="8" fill="#fff3d6"/>
  <text x="1433" y="227" text-anchor="middle" font-family="${SANS}" font-size="16" fill="#a06c00">Medium</text>
  <text x="1216" y="300" font-family="${MONO}" font-size="15" letter-spacing="2" fill="#9aa3b2">NOTES</text>
  <rect x="1216" y="318" width="328" height="140" rx="10" fill="#fafbfc" stroke="#e6e9ef"/>
  <text x="1216" y="512" font-family="${MONO}" font-size="15" letter-spacing="2" fill="#9aa3b2">SUBTASKS · 0/3</text>
  ${['Comps pulled', 'Photos booked', 'Net sheet']
    .map(
      (s, i) =>
        `<circle cx="1228" cy="${552 + i * 46}" r="10" fill="none" stroke="#c3c9d4" stroke-width="2"/>
      <text x="1252" y="${558 + i * 46}" font-family="${SANS}" font-size="19" fill="#4a5464">${esc(s)}</text>`,
    )
    .join('')}`,
    })
  },

  /* Not seen — clean brand poster in the product's palette */
  ketodiet() {
    const glow = radialGlow('g', '#84cc16', 1330, 500, 620, 0.34)
    return wrap({
      bg: '#07120a',
      defs: glow.def,
      body: `${glow.use}
  ${arcMotif('#84cc16')}
  <text x="110" y="300" font-family="${SANS}" font-size="26" letter-spacing="10"
    fill="#a3e635">NUTRITION &#183; RECIPES &#183; COMMERCE</text>
  <text x="106" y="470" font-family="${SANS}" font-size="132" font-weight="bold"
    letter-spacing="-3" fill="#f2fbe9">KetoDiet</text>
  <rect x="110" y="516" width="120" height="4" fill="#84cc16"/>
  <text x="110" y="612" font-family="${SANS}" font-size="44" fill="#cfe8b4">
    Keto nutrition, recipes, and commerce.</text>
  <text x="110" y="700" font-family="${MONO}" font-size="26" letter-spacing="3"
    fill="#7d9c62">SHOPIFY &#183; LIQUID &#183; CORE WEB VITALS</text>`,
    })
  },

  soleacademy() {
    const glow = radialGlow('g', '#fb923c', 1240, 480, 640, 0.32)
    return wrap({
      bg: '#0b0906',
      defs: glow.def,
      body: `${glow.use}
  ${diagonalStripes('#fb923c')}
  <text x="110" y="300" font-family="${SANS}" font-size="26" letter-spacing="10"
    fill="#fdba74">SNEAKER CULTURE RETAIL</text>
  <text x="106" y="452" font-family="${SANS}" font-size="128" font-weight="bold"
    letter-spacing="-2" fill="#fff7ed">SOLE</text>
  <text x="106" y="580" font-family="${SANS}" font-size="128" font-weight="bold"
    letter-spacing="-2" fill="#fb923c">ACADEMY</text>
  <text x="110" y="686" font-family="${SANS}" font-size="42" fill="#e8d9c8">
    Drops, raffles, and catalogue at launch scale.</text>
  <rect x="110" y="758" width="290" height="72" fill="#fb923c"/>
  <text x="255" y="804" text-anchor="middle" font-family="${SANS}" font-size="22"
    letter-spacing="4" fill="#1a1208">SHOP DROPS</text>`,
    })
  },

  luxurywish() {
    const glow = radialGlow('g', '#d4af6a', 800, 460, 660, 0.3)
    return wrap({
      bg: '#0c0a07',
      defs: glow.def,
      body: `${glow.use}
  ${goldFrame('#d4af6a')}
  <text x="${W / 2}" y="330" text-anchor="middle" font-family="${SANS}" font-size="24"
    letter-spacing="12" fill="#d4af6a">AUTHENTICATED &#183; CURATED &#183; ONE OF ONE</text>
  <text x="${W / 2}" y="500" text-anchor="middle" font-family="${SERIF}" font-size="122"
    letter-spacing="14" fill="#faf6ee">LUXURY WISH</text>
  <rect x="${W / 2 - 90}" y="546" width="180" height="1.5" fill="#d4af6a" opacity="0.7"/>
  <text x="${W / 2}" y="640" text-anchor="middle" font-family="${SERIF}" font-size="46"
    font-style="italic" fill="#e6d9bf">Authenticated luxury, curated.</text>
  <text x="${W / 2}" y="742" text-anchor="middle" font-family="${MONO}" font-size="24"
    letter-spacing="4" fill="#8d7c5d">SHOPIFY &#183; PROVENANCE &#183; PH</text>`,
    })
  },

  devoteddoc() {
    const glow = radialGlow('g', '#2dd4bf', 1180, 420, 660, 0.32)
    return wrap({
      bg: '#041210',
      defs: glow.def,
      body: `${glow.use}
  ${pulseLine('#2dd4bf')}
  <text x="110" y="300" font-family="${SANS}" font-size="26" letter-spacing="10"
    fill="#5eead4">DIRECT PRIMARY CARE</text>
  <text x="106" y="452" font-family="${SANS}" font-size="126" font-weight="bold"
    letter-spacing="-3" fill="#eafffb">Devoted Doc</text>
  <rect x="110" y="498" width="120" height="4" fill="#2dd4bf"/>
  <text x="110" y="592" font-family="${SANS}" font-size="44" fill="#a7ded6">
    Primary care without the insurance maze.</text>
  <rect x="110" y="790" width="300" height="72" rx="36" fill="#2dd4bf"/>
  <text x="260" y="836" text-anchor="middle" font-family="${SANS}" font-size="22"
    letter-spacing="3" fill="#04211d">BECOME A MEMBER</text>`,
    })
  },

  zocdoc() {
    const glow = radialGlow('g', '#ffae42', 1220, 620, 620, 0.26)
    return wrap({
      bg: '#0a1526',
      defs: glow.def,
      body: `${glow.use}
  ${calendarSlots('#ffae42')}
  <text x="110" y="300" font-family="${SANS}" font-size="26" letter-spacing="10"
    fill="#ffcf8a">HEALTHCARE MARKETPLACE</text>
  <text x="106" y="452" font-family="${SANS}" font-size="132" font-weight="bold"
    letter-spacing="-3" fill="#f3f8ff">Zocdoc</text>
  <rect x="110" y="498" width="120" height="4" fill="#ffae42"/>
  <text x="110" y="592" font-family="${SANS}" font-size="44" fill="#c3d4ea">
    Find and book in-network doctors.</text>
  <text x="110" y="690" font-family="${MONO}" font-size="24" letter-spacing="3"
    fill="#7f92ad">SEARCH &#183; AVAILABILITY &#183; REAL-TIME BOOKING</text>`,
    })
  },
}

mkdirSync(OUT_DIR, { recursive: true })

let count = 0
for (const [id, build] of Object.entries(posters)) {
  const svg = build()
  writeFileSync(resolve(OUT_DIR, `${id}.svg`), svg, 'utf8')
  count++
  console.log(`  ✓ projects/${id}.svg  (${(svg.length / 1024).toFixed(1)} kB)`)
}

console.log(`\nGenerated ${count} posters into public/images/projects/`)
