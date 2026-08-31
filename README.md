# WebEngine

Premium freelance web design & development portfolio site.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

- **Site config**: `src/lib/site.ts` — name, email, author bio, navigation
- **Projects**: `src/data/projects.ts` — add new case studies here
- **Services**: `src/data/services.ts`
- **Pricing**: `src/data/pricing.ts`
- **FAQ**: `src/data/faq.ts`

## Contact Form (Resend)

The contact form sends inquiries via [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_xxxxxxxx          # Same key from your Resend dashboard
CONTACT_TO_EMAIL=you@example.com    # Where inquiries land
CONTACT_FROM_EMAIL=WebEngine <hello@webengine.shayvanpelt.com>
```

**Domain setup:** Add `webengine.shayvanpelt.com` as a new domain in Resend (same account as HealthEngine). Add the DNS records Resend provides, wait for verification, then use that address as `CONTACT_FROM_EMAIL`. For local testing before verification, use `onboarding@resend.dev`.


Deploy to Vercel or any Next.js-compatible platform.

```bash
npm run build
npm start
```
