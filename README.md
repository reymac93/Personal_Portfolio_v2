# Reynan Guinto Macasaquit — Portfolio

Personal portfolio for a Senior Full Stack & AI/ML Engineer. Built as a single
scroll-driven page with dark and light palettes and motion as a first-class
concern.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion 13

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | Does                                            |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Dev server with Turbopack                       |
| `npm run build`     | Production build                                |
| `npm start`         | Serve the production build                      |
| `npm run lint`      | ESLint (`eslint-config-next` flat config)       |
| `npm run typecheck` | `tsc --noEmit`                                  |

---

## Editing content

All copy lives in typed data modules — you should not need to touch a component
to update the site.

| File                     | Contains                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `src/data/profile.ts`    | Name, role, contact details, résumé link, hero copy, stats    |
| `src/data/experience.ts` | Work history, metric chips, certifications                    |
| `src/data/skills.ts`     | Expertise bento groups + the marquee ticker list              |
| `src/data/projects.ts`   | Projects, categories, roles, contributions, live URLs         |
| `src/data/nav.ts`        | Nav items and the scroll-spy section list                     |

`SITE_URL` in `src/data/profile.ts` feeds canonical URLs, Open Graph, the
sitemap, and `robots.txt`. **Set it to the real domain before launch** — it is
currently a Vercel placeholder.

---

## Theming

Dark and light, with dark as the base. The visitor's OS preference is honoured
on first visit; a manual choice is remembered in `localStorage` under `theme`.

**How it works** — and why it cannot rot the way a bolted-on dark mode does:

1. A tiny inline script (`themeInitScript` in `src/lib/theme.ts`) runs before
   first paint, resolves stored-choice → OS preference, and stamps
   `data-theme="light|dark"` on `<html>`. No flash of the wrong palette.
2. Because that attribute is always explicit, `globals.css` needs **one** light
   override block on `:root[data-theme='light']` — the same variable names with
   new values. There is no second copy of the palette under a
   `prefers-color-scheme` media query to drift out of sync.
3. Components contain **zero theme variants**. Every utility resolves through
   `var(--color-*)`, so redefining the variables flips the whole site.

`ThemeToggle` is deliberately stateless: it renders both icons and lets CSS
(`.only-dark` / `.only-light`) choose, so the correct icon is painted on the
first frame — no `useState`, no hydration mismatch, no icon flash. It also
keeps following the OS while no manual choice has been stored.

Light is **not** an inversion. The page sits on a cool off-white, cards go pure
white and gain elevation from `--shadow-panel` instead of a hairline, ambient
washes drop to roughly a third of their opacity, and the cursor spotlight
switches from `screen` to `multiply` blending (`screen` is invisible over
white). Every accent is a darkened variant.

### The logo

`Logo` (`src/components/ui/Logo.tsx`) is the single source for the mark in both
the navbar and the footer, with a `wordmark` prop for `none` / `short` / `full`.

The tile **follows the theme**: dark tile with a light monogram in dark mode,
light tile with a dark monogram in light mode. Both values come straight from
the surface and type tokens (`ink-850` / `fg-strong`), so the mark belongs to
the page rather than sitting on it like a sticker.

In light mode the tile is pure white on an off-white page, so it earns its edge
from the hairline plus a tight shadow — deliberately tighter than
`--shadow-panel`, which is tuned for large cards and reads as a smudge at 36px.
The accent dot swaps its glow for a page-coloured ring, since a glow is
invisible on white.

All of it lives in `.logo-tile` / `.logo-dot` in `globals.css`, so it switches
in the same frame as the rest of the palette with no extra render.

**Tab icon.** Two files that mirror the in-page logo, so the tab matches the
mode:

| File                    | Used in    | Tile  | Monogram |
| ----------------------- | ---------- | ----- | -------- |
| `public/icon-light.svg` | light mode | light | dark     |
| `public/icon-dark.svg`  | dark mode  | dark  | light    |

The tile follows the theme and the **monogram** provides contrast against the
browser tab strip — at favicon size the glyph is what you actually see, so a
light tile in light mode still reads fine. Each carries a hairline so the
rounded-square shape survives against a same-value strip.

They ship as `<link rel="icon" media="(prefers-color-scheme: …)">`, so the right
one is picked with no JS. Those queries track the **OS**, though, so
`syncFavicon` in `src/lib/theme.ts` rewrites the `href` whenever the visitor
toggles manually — otherwise someone forcing light mode on a dark OS would keep
the wrong tab icon. (It drops `media` and sets `href`, because browsers reliably
re-evaluate an icon link's href but not always its media.)

The Apple touch icon (`apple-icon.tsx`) stays a single dark tile — iOS home
screen icons cannot be theme-aware.

### Contrast

Both palettes pass **WCAG AA (4.5:1)** for every text tier against every
surface it can sit on — page, card, raised tile, and recessed well. That
constraint is what sets the low end of each ramp, so `fg-muted` / `fg-subtle` /
`fg-faint` sit closer together than they would in a purely visual design;
hierarchy is carried by size, weight, and letter-spacing as much as by colour.

Project brand colours are data, not tokens, so each project carries **two**:
`accent` for dark and `accentLight` for light. `Work.tsx` passes both as
`--pa-d` / `--pa-l`, and the `.pa` class resolves them to one inherited `--pa`.
Without this, golds like `#cbb894` and limes like `#84cc16` are illegible on
white — and Alora's `#c8102e` crimson is illegible on near-black.

If you change any colour, re-check contrast before shipping.

## Photos

The About section runs a **portrait slideshow** (`PortraitSlider`) over the
`portraits` array in `src/data/profile.ts`:

| File                        | Caption                            |
| --------------------------- | ---------------------------------- |
| `public/images/portrait-1.png` | Senior Full Stack & AI/ML Engineer |
| `public/images/portrait-2.png` | Architecture review                |
| `public/images/portrait-3.png` | Deep work                          |

Add, remove, or reorder entries and the slider adapts — the dots, the `01 / 03`
counter, and keyboard/swipe bounds all derive from the array length. A single
entry renders as a plain static frame with no controls.

**Behaviour:** crossfade every `PORTRAIT_INTERVAL_MS` (5 s) with a slow scale
drift on the active slide, pausing on hover and on focus. Dots, hover arrows,
`←`/`→` keys, and touch swipe all work. Each slide's `label` animates in with
it; `alt` is per-photo and describes the actual scene.

**Accessibility:** `aria-roledescription="carousel"`, a labelled group per
slide, `aria-current` on the active dot, and a visually-hidden `aria-live`
region announcing "Slide 2 of 3: Architecture review" without moving focus.
Under `prefers-reduced-motion` autoplay is off and transitions are instant —
the slider becomes a manual gallery.

**Sizing:** sources are 1:1, so the frame is `aspect-square` and nothing is
cropped. If you swap in photos of a different ratio, change the frame in
`PortraitSlider.tsx` to match, or the subject will be cut — one of these three
has the face far right and would lose it in a 4:5 crop.

The source PNGs are ~2 MB each, which is fine: `next/image` serves them as AVIF
at roughly **20–27 KB** each.

## Project images

Cards read `image` from `src/data/projects.ts`. Each project currently points at
generated **poster art** in `public/images/projects/<id>.svg` — stylised brand
cards (wordmark + palette), not screenshots.

### Swapping in a real screenshot

1. Save the capture as `public/images/projects/<id>.png`
   (ids: `alora`, `salmaplus`, `weruntheworld`, `taskflow`, `ketodiet`,
   `soleacademy`, `luxurywish`, `devoteddoc`, `zocdoc`).
2. Change that project's `image` in `src/data/projects.ts` to
   `/images/projects/<id>.png`.

That is the whole change. `AdaptiveImage` detects the extension and turns Next's
image optimizer back on automatically (it stays off for SVG, which the optimizer
cannot process). Recommended capture: **1600×1000**, top-aligned — cards crop
with `object-top`.

Posters can be regenerated at any time:

```bash
node scripts/generate-posters.mjs
```

Output is deterministic (seeded PRNG), so reruns produce identical files.

---

## Design system

Everything is tokenised in the `@theme` block at the top of
`src/app/globals.css`. No `tailwind.config.js` — Tailwind v4 is configured in
CSS, which is the only place it is read from.

- **Surfaces** — `ink-1000` → `ink-600`, built around `#1f1f1f`
- **Type** — `fg-strong` / `fg` / `fg-muted` / `fg-subtle` / `fg-faint`
- **Accent** — `accent-300` → `accent-600`; `accent-400` is primary
  (`#5da9ff` in dark, `#1a66d8` in light)
- **Support hues** — `cyan-glow`, `violet-glow`, `emerald-glow`, `amber-glow`, `rose-glow`
- **Elevation** — `shadow-panel`, `shadow-lift` (near-flat in dark, real depth in light)
- **Composite utilities** — `container-x`, `panel`, `panel-sheen`, `eyebrow`,
  `text-gradient`, `glass`, `grid-backdrop`, `noise`, `edge-fade-x`,
  `no-scrollbar`, `only-dark` / `only-light`, `pa` / `pa-text` / `pa-bg`

Fonts are loaded via `next/font`: **Sora** (display), **Inter** (body),
**JetBrains Mono** (labels and figures).

### Palette structure

There is no `dark:` variant anywhere in the codebase — see **Theming** above.
Dark values live in `@theme`; light redefines the same names in one block.
`color-scheme` is set per theme so form controls and scrollbars follow.

---

## Motion

Reusable primitives in `src/components/ui/`:

| Component        | Effect                                                      |
| ---------------- | ----------------------------------------------------------- |
| `Reveal`         | Scroll-triggered entrance, 7 directions                     |
| `RevealGroup`    | Orchestrates staggered children                             |
| `SplitText`      | Word-by-word masked slide for headlines                     |
| `SpotlightCard`  | Cursor-tracked glow via CSS vars (no re-render on move)      |
| `Magnetic`       | Springs an element toward the pointer                        |
| `Counter`        | rAF count-up when scrolled into view                         |
| `ThemeToggle`    | Stateless light/dark switch, CSS-selected icon               |

Plus `ScrollProgress` (reading bar) and `CursorGlow` (pointer-devices only).

**Reduced motion is honoured throughout.** A global
`@media (prefers-reduced-motion: reduce)` block in `globals.css` neutralises
every animation and transition, and each JS-driven component checks
`useReducedMotion()` and renders a static fallback rather than a no-op
animation.

---

## Accessibility notes

- Skip-to-content link, single `<h1>`, ordered heading levels
- `aria-expanded` / `aria-controls` on the mobile menu and every timeline toggle
- `role="tablist"` + `aria-selected` on the work filter
- Decorative layers (`Marquee`, aurora, grid, glow) carry `aria-hidden`
- `aria-live` status on the copy-email confirmation
- Visible `:focus-visible` ring on every interactive element
- Scroll offset handled once, by `scroll-padding-top` on `html`

---

## Deploying

Zero-config on Vercel — push and import. For any other host:
`npm run build && npm start`.

Before going live:

1. Set `SITE_URL` in `src/data/profile.ts` to the production domain.
2. Replace poster art with real screenshots where you have them.
3. Confirm the Google Drive résumé link is set to public sharing.

The Open Graph image and Apple touch icon are **generated at build time**
(`src/app/opengraph-image.tsx`, `src/app/apple-icon.tsx`), so there are no
static paths for them to 404 on. The two tab icons are real files in `public/`
(see **The logo**) because they need `media` attributes the file convention
cannot express.
