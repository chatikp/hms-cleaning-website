# Harrell Maintenance Solution (HMS) — Website

A premium marketing + booking website for a residential/commercial cleaning company, built with React, Vite, and Tailwind CSS.

## Stack

- **React 18 + Vite** — fast dev server, code-split routes
- **Tailwind CSS** — soft blue / warm sand (neutral) / ivory / charcoal design system,
  with a Fraunces italic accent font for warm, editorial emphasis words in headlines
  (inspired by scbypeter.com, blended ~35-40% into HMS's existing identity)
- **React Router v6** — client-side routing, lazy-loaded pages
- **Framer Motion** — scroll reveals, page/step transitions, respects `prefers-reduced-motion` via `MotionConfig`
- **React Hook Form + Zod** — validated Quote, Booking, and Contact forms
- **react-helmet-async** — per-page SEO meta tags + JSON-LD structured data
- **lucide-react** — icon set (explicit imports only, no barrel import, keeps bundle small)

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint      # ESLint
```

## Project structure

```
src/
  components/
    layout/       Navbar, Footer, Logo, sticky mobile CTA, page shell
    ui/            Reusable primitives: Button, Card, Section, Badge,
                    Accordion, form fields, PlaceholderImage, Reveal, etc.
    home/          Homepage-only sections (Hero, StatsBar, HowItWorks, CtaBanner,
                    StatementBand, ServiceAreas, FactStrip)
    services/      ServiceCard
    gallery/       BeforeAfterSlider (draggable + keyboard accessible)
    testimonials/  TestimonialCard, TestimonialCarousel
    blog/          BlogCard
    seo/           Seo (Helmet wrapper: title/description/OG/canonical/JSON-LD)
  pages/           One file per route (see App.jsx for the route map)
  data/            Static content: services, testimonials, FAQ, blog posts,
                    gallery items, siteConfig (business info, hours, map)
  lib/             Zod schemas, pricing estimate calculator, icon map,
                    scroll-to-top helper
```

## Content & configuration

- **Business info** (name, phone, address, hours, map embed, social links) lives in
  `src/data/siteConfig.js` — update this first when handing off to the real business.
- **Services, FAQ, testimonials, blog posts, gallery items** are plain data files
  in `src/data/` — no CMS wiring, easy to edit or later swap for a headless CMS/API.
- **Google Maps**: the Contact page uses a keyless `google.com/maps?...&output=embed`
  iframe (`siteConfig.mapEmbedSrc`). For a richer, interactive map (custom markers,
  styling) swap in the Maps JavaScript API with a billed API key.

## Forms

`Quote`, `Booking`, and `Contact` are fully validated (Zod) and have real client-side
UX (multi-step booking flow, live price estimate, loading/success states), but **submit
handlers currently simulate a network request** (`setTimeout`) rather than calling a
real API. Before launch, wire `onSubmit` in `src/pages/Quote.jsx`, `Booking.jsx`, and
`Contact.jsx` to your backend/CRM/email endpoint (e.g. a serverless function, Formspree,
or your booking system's API).

## Brand & logo

The real HMS logo (provided by the client) lives in `src/assets/brand/`:

- `logo-full-source.png` — the original artwork, kept for provenance/future re-exports
- `logo-mark.webp` — the circular emblem only, background-removed and masked to a
  transparent circle with `sharp` (see git history for the processing script). Used in
  `Logo.jsx` (navbar + footer, wrapped in a white badge so it reads on any background)
  and as the source for all favicons (`public/favicon-*.png`, `apple-touch-icon.png`,
  `logo-512.png`) and the generated `public/og-image.jpg` social share image
- `logo-full.webp` — the full lockup (icon + wordmark + tagline), for light-background
  brand moments only (its text is dark and won't read on dark sections)

## Design language

Beyond color/type, a few deliberate, brand-specific shape choices replace generic
"template" defaults — the goal was to avoid the site reading as an AI-generated
boilerplate:

- **Asymmetric card corners** (`Card.jsx`, `IconTile.jsx`, `TestimonialCard.jsx`): every
  box uses a mixed radius (e.g. `rounded-[28px_10px_28px_10px]`) plus a colored accent
  edge (top bar or left bar) instead of a uniform `rounded-2xl` + gray border.
- **`BrandMotif.jsx`**: thin circular arcs + a small sparkle cluster, redrawn from the
  logo's own linework, used as section decoration in place of generic blurred gradient
  blobs (Hero, CtaBanner, PageHero).
- **`CornerFrame.jsx`**: L-shaped corner brackets overlaid on photography (hero image,
  before/after sliders) for a curated/gallery framing feel instead of a plain rounded
  photo crop.
- **`SeamBadge.jsx`**: a small circular logo medallion straddling the seam between two
  stacked sections (used once, between the stats bar and the statement band on Home) in
  place of a flat color-block cut.
- **Bento-style services grid** on Home: the first service card spans two columns with
  a horizontal "featured" layout (`ServiceCard`'s `featured` prop) rather than a uniform
  3-column grid.

## Images

The hero photo and four before/after gallery categories (kitchen, bathroom, living
room, carpet) use AI-generated photorealistic interiors (via Higgsfield/`nano_banana_pro`),
optimized to WebP in `src/assets/images/`. Generation stopped after 5 images because the
connected Higgsfield workspace ran out of credits (free plan, 0 credits remaining) —
there was no "before" (dirty) counterpart generated, and no office photo. Two
work-arounds are in place until more credits are available:

- **Before/after slider** (`src/components/gallery/BeforeAfterSlider.jsx`): the same
  "after" photo is reused for the "before" side with a color-grade filter
  (`grayscale/sepia/brightness/contrast`) plus a corner "grime" vignette (multiplied
  radial gradients) and a fine noise-grain overlay, simulating dust/buildup concentrated
  in corners and edges — same room composition, no extra asset needed. Swap in a true
  "before" photo by passing a `beforeImage` prop and rendering it in place of the
  filtered `<img>`.
- **Office category / team photos / everything else**: still uses `PlaceholderImage`
  (a styled gradient block with an icon). Each usage already has descriptive `alt` text
  wired through, so swapping in a real photo later is a drop-in change.

To generate more real photos once credits are available: generate an "office" shot the
same way as the other categories, and — for genuinely photographed (not filtered)
before/after pairs — generate each "after" shot first, then feed it back in as an
image-to-image reference with a prompt asking for a dirty/cluttered version of the same
room, so the composition matches exactly.

**Note on "Fable 5" / Higgsfield**: Fable 5 is a Claude *language* model (used for
reasoning/agent tasks), not an image or video generator — it can't produce or animate
imagery itself. For any future animated hero/cinemagraph treatment, use Higgsfield's
video tools (`generate_video`, image-to-video, `motion_control`) once credits are
available; the current hero uses a still photo with a CSS/Framer-Motion cursor-parallax
effect instead.

## Accessibility (WCAG AA)

- Skip-to-content link, visible focus rings, semantic landmarks/headings
- All interactive elements keyboard-operable (accordion, carousel, before/after slider,
  gallery filter tabs, multi-step booking form)
- Form fields have associated `<label>`s and `aria-invalid`/`aria-describedby` on error
- Color contrast checked against the palette (charcoal text on light backgrounds)
- `MotionConfig reducedMotion="user"` makes all Framer Motion animations respect the
  OS-level "reduce motion" setting; a CSS fallback in `index.css` also disables
  transitions/animations for `prefers-reduced-motion: reduce`

## SEO

- Unique `<title>`/meta description/canonical/Open Graph/Twitter tags per page via `Seo`
- JSON-LD: `HousekeepingService` (site-wide, in `index.html`), `Service` (per service
  page), `FAQPage`, `Article` (blog posts), `AggregateRating` (testimonials)
- `vite-plugin-sitemap` generates `sitemap.xml` at build time; `public/robots.txt`
  references it
- Route-based code splitting keeps initial JS small; verify with `npm run build`

## Performance notes

- Routes are lazy-loaded (`React.lazy` + `Suspense`) so each page ships its own chunk
- Icons are imported explicitly (see `src/lib/icons.js`) rather than via a barrel
  import, which previously bloated the bundle by ~750KB
- Manual vendor/motion chunks are configured in `vite.config.js`
- Generated photos were converted from PNG to WebP and resized before committing
  (hero ~230KB, category photos 28-100KB each) — a ~13x reduction from the raw PNGs
