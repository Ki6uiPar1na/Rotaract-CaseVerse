# CaseVerse 2026

**Where Strategy Meets Sustainability**

National SDG-Aligned Case Competition organized by Rotaract Club of Jatiya Kabi Kazi Nazrul Islam University.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Router v7

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts)
├── components/
│   ├── ui/           # Reusable UI components (SectionHeading, CTASection, EmptyState)
│   ├── layout/       # Layout wrapper
│   ├── navigation/   # Navbar component
│   └── footer/       # Footer component
├── data/             # JSON data files
│   ├── site.json     # Site config, nav, stats, SDGs, SEO
│   ├── competition.json  # Competition details, prizes
│   ├── rounds.json   # Round details (Round 1, 2, Grand Finale)
│   ├── timeline.json # Timeline events
│   ├── sponsors.json # Sponsor list
│   ├── judges.json   # Judge profiles
│   ├── news.json     # News articles
│   ├── faq.json      # FAQ items
│   └── organizers.json
├── hooks/            # Custom React hooks
├── lib/              # Utilities and data service
│   ├── data.ts       # Centralized data service
│   ├── utils.ts      # Utility functions (cn, formatDate, etc.)
│   ├── storage.ts    # localStorage wrapper
│   └── constants.ts  # App constants
├── pages/            # Page components (18 routes)
├── types/            # TypeScript interfaces
├── App.tsx           # Router setup with lazy loading
├── main.tsx          # Entry point
└── index.css         # Global styles + Tailwind theme
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About CaseVerse |
| `/competition` | Competition Overview |
| `/competition/round-1` | Round 1 — Case Solution |
| `/competition/round-2` | Round 2 — Online Video Content |
| `/competition/grand-finale` | Grand Finale |
| `/timeline` | Competition Timeline |
| `/news` | News & Updates |
| `/news/:slug` | News Article |
| `/sponsors` | Sponsors & Partners |
| `/judges` | Judges |
| `/results` | Results |
| `/prizes` | Prizes & Recognition |
| `/faq` | FAQ |
| `/contact` | Contact |
| `/register` | Team Registration |
| `/dashboard` | Participant Dashboard |
| `*` | 404 |

## Editing JSON Data

All dynamic content comes from JSON files in `src/data/`. Edit these files to update the website.

### Adding a Sponsor

Add an entry to `src/data/sponsors.json`:

```json
{
  "id": "unique-id",
  "name": "Sponsor Name",
  "logo": "/images/sponsors/logo.png",
  "category": "gold",
  "website": "https://example.com",
  "description": "Brief description"
}
```

Categories: `title`, `gold`, `silver`, `media`, `knowledge`, `strategic`, `supporting`

### Adding a Judge

Add an entry to `src/data/judges.json`:

```json
{
  "id": "unique-id",
  "name": "Judge Name",
  "photo": "/images/judges/photo.jpg",
  "designation": "Title",
  "organization": "Organization",
  "bio": "Brief bio",
  "linkedin": "https://linkedin.com/in/username"
}
```

### Adding News

Add an entry to `src/data/news.json`:

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "Article Title",
  "category": "announcement",
  "date": "2026-02-01",
  "author": "Author Name",
  "coverImage": "/images/news/image.jpg",
  "excerpt": "Short summary",
  "content": "Full article content with paragraphs separated by \\n\\n.",
  "featured": true,
  "tags": ["tag1", "tag2"]
}
```

Categories: `announcement`, `event-update`, `result`, `general`

### Modifying Timeline

Edit `src/data/timeline.json`. Each item needs:

- `id`, `title`, `description`
- `startDate`, `endDate` (ISO format)
- `type`: `pre-event`, `registration`, `round`, `finale`
- `status`: `upcoming`, `active`, `completed`

### Changing Colors

Edit the CSS variables in `src/index.css` under `@theme`:

```css
--color-primary: #0E7C66;  /* Main brand color */
--color-accent: #B8E986;   /* Accent color */
--color-bg: #07110F;       /* Background */
--color-surface: #0D1A17;  /* Card/surface color */
--color-text: #F5F7F5;     /* Main text */
--color-muted: #9AA8A3;    /* Muted text */
--color-border: #1E302B;   /* Border color */
```

## Architecture: JSON → API Migration

The data layer is designed for easy backend migration:

**Current (JSON):**
```ts
import { data } from "@/lib/data";
export function getSponsors() { return data.sponsors; }
```

**Future (API):**
```ts
export async function getSponsors() {
  const res = await fetch("/api/sponsors");
  return res.json();
}
```

React components consume the data service, not JSON files directly.

## Registration (Prototype)

The registration form uses `localStorage` to persist drafts and store mock submissions. No backend is connected yet. The `storage` utility in `src/lib/storage.ts` provides `get()`, `set()`, and `remove()` methods.

## Performance

- Route-level code splitting via `React.lazy()` + `Suspense`
- CSS-only animations for `prefers-reduced-motion`
- Optimized font loading (Space Grotesk + Inter)
- No heavy background videos or excessive particles

## License

Private — CaseVerse 2026, Rotaract Club of JKKNIU
# Rotaract-CaseVerse
