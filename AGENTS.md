# WebEngine — Agent Context

## What This Is

WebEngine is a **premium freelance web design & development portfolio site**. The website itself is the primary sales tool — it must demonstrate the quality of work being sold to small-business owners.

**Business:** Custom websites for small businesses (design, development, SEO, deployment, hosting, maintenance).

**Tone:** Premium, modern, confident, human, trustworthy. Not corporate, not cheesy, not generic agency-speak.

**Positioning:** Solo developer / boutique studio — direct communication, no agency runaround. Honest about scale; do not fabricate clients, testimonials, stats, or credentials.

---

## Tech Stack

- **Next.js 15** (App Router, `src/app/`)
- **TypeScript**
- **Tailwind CSS** (custom CSS variables in `globals.css`)
- **Framer Motion** (animations; respect `prefers-reduced-motion`)
- **Lucide React** (icons)

```bash
npm run dev      # localhost:3000
npm run build    # production build
npm run lint
```

---

## Project Structure

```
src/
├── app/                    # Routes & layout
│   ├── page.tsx            # Homepage (all sections)
│   ├── work/[slug]/        # Case study pages
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── globals.css         # Design tokens, utilities
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # Navigation, Footer
│   ├── sections/           # Homepage sections (Hero, FeaturedWork, etc.)
│   ├── ui/                 # Reusable UI (Button, BrowserFrame, Reveal)
│   └── seo/                # JSON-LD structured data
├── data/                   # Content as data (edit here, not in components)
│   ├── projects.ts         # Portfolio / case studies
│   ├── services.ts
│   ├── pricing.ts
│   ├── faq.ts
│   ├── content.ts          # Process steps, trust points, value props
│   └── contact.ts          # Form options (budget, timeline)
└── lib/
    ├── site.ts             # Site config (name, email, author, nav)
    └── hooks.ts            # usePrefersReducedMotion, useScrollProgress, cn
```

---

## Homepage Sections (in order)

1. **Hero** — Centered headline + CTAs (no project preview)
2. **ValueStrip** — Custom designs, responsive, SEO, full service
3. **FeaturedWork** — Lumina Within case study with live browser iframe
4. **Services** — Expandable accordion list
5. **Process** — 5-step timeline (horizontal desktop, vertical mobile)
6. **WhyWorkWithMe** — Trust points + author bio
7. **Pricing** — Business Website ($1,500+) / Custom + Website Care plan
8. **FAQ** — Accordion
9. **FinalCTA** — Closing message
10. **ContactForm** — Project inquiry form
11. **Footer**

---

## Design System

| Token | Usage |
|-------|-------|
| `--background` | Page background (warm white / near-black dark) |
| `--foreground` | Primary text |
| `--accent` | Copper/gold accent (RGB format for opacity support) |
| `--muted` / `--muted-foreground` | Subtle backgrounds & secondary text |
| `--border` | Hairline dividers |

**Fonts:** Geist Sans (body), Instrument Serif (display headings)

**Utilities:**
- `.section-padding` — horizontal padding
- `.section-spacing` — vertical section padding (`py-16 md:py-20 lg:py-24`)
- `.grain` — subtle noise texture overlay

**Design principles:**
- Aggressive whitespace, strong typography hierarchy
- Sophisticated neutrals + one accent color
- No excessive gradients, blobs, glassmorphism, or rounded-card grids
- Polished but restrained motion
- Performance matters — minimize client components, lazy-load iframes

---

## Content Rules

- **Do not invent** clients, testimonials, revenue, years of experience, awards, or statistics
- **Only featured project:** Lumina Within (`src/data/projects.ts`)
- Add future projects to `projects.ts` — components are data-driven
- Pricing is "starting prices" — not legally binding; scope-dependent
- Update site identity in `src/lib/site.ts` (name, email, author, social links)

---

## Key Components

| Component | Purpose |
|-----------|---------|
| `BrowserFrame` | Browser chrome mockup with lazy iframe + graceful fallback |
| `Reveal` | Scroll-triggered fade/slide animation wrapper |
| `Button` | Primary/secondary/ghost CTAs with motion |
| `SectionHeading` | Consistent section labels + titles |

---

## Conventions

- Prefer **server components** unless interactivity is needed (`"use client"`)
- Content lives in `src/data/` — keep components presentational
- Use existing patterns for spacing, typography, and animation
- Semantic HTML, accessible forms, visible focus states, alt text
- SEO: metadata in `layout.tsx`, JSON-LD in `JsonLd.tsx`, sitemap/robots in `app/`
- Minimize scope — match existing code style, don't over-engineer

---

## Common Tasks

| Task | Where to edit |
|------|---------------|
| Change business name/email | `src/lib/site.ts` |
| Add a portfolio project | `src/data/projects.ts` |
| Update pricing | `src/data/pricing.ts` |
| Edit services | `src/data/services.ts` |
| Edit FAQ | `src/data/faq.ts` |
| Adjust colors/fonts | `src/app/globals.css`, `tailwind.config.ts` |
| Wire contact form | `src/components/sections/ContactForm.tsx` |
