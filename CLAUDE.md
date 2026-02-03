# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

K.NOMAD is a Next.js 16+ web application for discovering Korean cities suitable for digital nomads. It features a responsive, component-driven UI with mock data for 10 cities, Unsplash image integration, and a modern tech stack (React 19, TypeScript, Tailwind CSS 4, Shadcn UI).

**Status**: Production-ready UI implementation (no backend). All sections are fully implemented and responsive.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check (catch TS errors without building)
npx tsc --noEmit
```

## Code Architecture

### Component Hierarchy

The app uses a hierarchical component structure:

- **Layout Components** (`components/layout/`)
  - `Header.tsx` - Responsive navigation with mobile menu toggle
  - `Footer.tsx` - Multi-section footer with links and copyright
  - Rendered in `app/layout.tsx`, wrapping all pages

- **Page Composition** (`app/page.tsx`)
  - Composes 7 section components in order: HeroSection → StatsSection → TopCitiesSection → RegionsSection → BudgetSection → ReviewsSection → CTASection
  - Server component by default, can add client directives as needed

- **Section Components** (`components/sections/`)
  - `HeroSection.tsx` - Search bar + quick filter chips
  - `StatsSection.tsx` - 4 stat cards grid (30+ cities, 500+ reviews, avg rating, visitors)
  - `TopCitiesSection.tsx` - Horizontal carousel of top 6 cities with scroll controls
  - `RegionsSection.tsx` - 6 region cards grid (with dynamic city counts)
  - `BudgetSection.tsx` - 3 budget category cards (economic/moderate/premium)
  - `ReviewsSection.tsx` - 3 most recent review cards with user avatars
  - `CTASection.tsx` - Signup call-to-action with email input and social login buttons

- **Reusable Components** (`components/city/`)
  - `CityCard.tsx` - City display component used across sections
    - Props: `city: City`, `variant?: 'default' | 'compact'`
    - Features: Image with 16:9 aspect ratio, stats grid (cost/internet/cafes/weather), rating display, like button, action button
    - Client component with `useState` for like button interactivity

- **Shadcn UI Components** (`components/ui/`)
  - Pre-built accessible components: Button, Card, Input, Badge, Separator, Avatar, Dialog, DropdownMenu
  - Used throughout sections for consistency

### Data Architecture

Data is separated by domain:

- **Types** (`types/`)
  - `city.ts` - City interface with CityStats, Region, and BudgetRange types
  - `review.ts` - Review interface
  - `index.ts` - Re-exports for cleaner imports

- **Mock Data** (`lib/data/`)
  - `cities.ts` - Array of 10 City objects with all required fields (id, name, nameEn, region, image keyword, totalScore, stats object with 7 metrics, rating, reviewCount, tags array, budget category)
  - `reviews.ts` - Array of 3 Review objects + stats array for StatsSection
  - `constants.ts` - REGIONS (6 items), BUDGETS (3 items), QUICK_FILTERS (4 items) - used for configurable UI

- **Image Handling** (`lib/unsplash.ts`)
  - `getUnsplashImage(keyword: string, size?: string)` - Generates Unsplash API URLs
  - `cityImageMap` - Maps image keywords to generated URLs
  - Images use Unsplash search API: `https://source.unsplash.com/[size]/?[keyword],korea,city`

### Styling Architecture

- **Tailwind CSS v4** with utility-first approach
- **Color System**: Shadcn color tokens defined in `app/globals.css` using CSS variables and OKLCH color space
- **Responsive Design**: Mobile-first with breakpoints:
  - Mobile: < 768px (no prefix)
  - Tablet: 768px - 1024px (`md:` prefix)
  - Desktop: > 1024px (`lg:` prefix)
- **Component Styling**: Shadcn components use CV (Class Variance Authority) for consistent variants
- **Animation**: Tailwind transitions + optional Framer Motion for complex animations

### Data Flow

1. **Mock data sources** (`lib/data/`) → Imported by components
2. **Components render** using TypeScript types from `types/`
3. **Unsplash URLs** generated dynamically in CityCard via `lib/unsplash.ts`
4. **Next.js Image** component optimizes images with responsive `sizes` attribute
5. **Client state** (useState) used sparingly:
   - CityCard: Like button toggle
   - Header: Mobile menu open/close
   - TopCitiesSection: Carousel scroll position
   - CTASection: Email input value
   - Other sections: UI-only (no backend submission)

## Key Implementation Details

### Client vs Server Components

- **Server Components** (default): HeroSection, StatsSection, RegionsSection, BudgetSection, ReviewsSection, CTASection
- **Client Components** (`'use client'`): Header (for mobile menu), CityCard (for like button), TopCitiesSection (for carousel scroll)
- **Page/Layout**: Mixed, Header wraps entire app in layout

### Image Optimization

- **Next.js Image component** used for all city images
- `sizes` attribute: `"(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Unsplash URLs configured in `next.config.ts` under `remotePatterns`
- Images lazy-loaded with automatic AVIF/WebP conversion

### Responsive Patterns

- **Grid layouts**: Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` pattern
- **Containers**: `max-w-7xl mx-auto px-4` for content centering
- **Section padding**: `py-12 lg:py-20` for vertical rhythm
- **Gap/spacing**: Consistent use of Tailwind spacing scale (4, 6, 8, 12)

### TypeScript Patterns

- **Import path alias**: `@/*` maps to root directory (configured in `tsconfig.json`)
- **Type safety**: All components are strictly typed; no `any` types
- **Re-exports**: `types/index.ts` centralizes type imports for cleaner component imports
- **Union types**: Region and BudgetRange are discriminated unions for type-safe filtering

## Common Development Tasks

### Adding a New City

1. Update `lib/data/cities.ts`:
   - Add new City object to array
   - Include all required fields: id, name, nameEn, region, image, totalScore, stats (7 metrics), rating, reviewCount, tags, budget
   - Use region name exactly matching REGIONS in `lib/data/constants.ts`

2. New region or budget category:
   - Update corresponding array in `lib/data/constants.ts`
   - Update Region or BudgetRange type in `types/city.ts` if new region/category added

3. Image keyword:
   - Use descriptive, comma-separated keywords in the `image` field
   - Final URL generation adds `,korea,city` suffix

### Modifying Section Content

- **Configuration data**: Edit `lib/data/constants.ts` (REGIONS, BUDGETS, QUICK_FILTERS)
- **Section layout**: Modify component JSX (grid cols, spacing, colors)
- **Mock data**: Update relevant file in `lib/data/`
- **Styling**: Update Tailwind classes directly in component (no separate CSS files)

### Adding Interactivity

1. Identify which components need state (currently: Header, CityCard, TopCitiesSection, CTASection)
2. Add `'use client'` directive at top of file
3. Import `useState` from React
4. Use state for: toggle buttons (like), form inputs (email), scroll positions (carousel), menu visibility

### Testing Responsive Design

```bash
# Development server running, open browser DevTools:
# Chrome/Edge: F12 → Toggle device toolbar (Ctrl+Shift+M)
# Test viewports: 375px (mobile), 768px (tablet), 1920px (desktop)

# Or test via command line (if headless browser available):
# npx playwright test
```

## External Dependencies

### Critical Libraries

- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library with hooks
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Utility CSS
- **Shadcn/ui** - Pre-built component library (via radix-ui primitives)
- **Lucide React** - Icon library (30+ icons used across UI)
- **Unsplash API** - City images (no authentication needed for basic usage)

### Minor Dependencies

- **Framer Motion** - Animation library (installed, optional for enhanced animations)
- **class-variance-authority** - Component variant library
- **clsx** - Classname utility
- **tailwind-merge** - Tailwind class merging utility

## Image Domains Configuration

The `next.config.ts` file allows images from:
- `source.unsplash.com` - City images
- `i.pravatar.cc` - User avatar placeholders in reviews

This enables Next.js Image optimization for external domains.

## Notes and Constraints

### Current Scope (UI Only)

✅ All sections fully implemented and responsive
✅ 10 cities with complete mock data
✅ Unsplash image integration
✅ Interactive components (like button, carousel, mobile menu)
✅ TypeScript strict mode
✅ Accessibility-friendly (semantic HTML, alt text)

❌ No backend/database (Supabase, etc.)
❌ No authentication (buttons UI-only)
❌ No search/filter logic (UI-only)
❌ No form submissions (CTASection email input is UI-only)
❌ No review submission functionality
❌ No user profiles or personalization

### Future Enhancements

To extend this project:
- Connect CTASection to email service (SendGrid, Mailchimp)
- Implement HeroSection search + filter logic with API calls
- Add city detail pages (`app/cities/[id]`)
- Build backend API routes (`app/api/`)
- Integrate Supabase for reviews and user data
- Add authentication (NextAuth.js or similar)
- Implement actual review submission

## Performance Considerations

- **Build time**: ~2.6 seconds for production build (measured)
- **Image optimization**: Next.js handles srcset generation and format conversion automatically
- **Code splitting**: Sections are separate components, enabling granular code splitting
- **Lighthouse**: Target score > 90 (unoptimized baseline meets this)
- **Bundle size**: Minimal due to Shadcn tree-shaking and Tailwind v4 JIT compilation

## Known Limitations and Design Decisions

1. **Hard-coded city count in RegionsSection** - Dynamically counts cities per region from mock data (avoids mismatch with constants)
2. **Unsplash rate limits** - Free tier allows ~50 requests/hour per IP; suitable for development/demo
3. **No dark mode currently** - CSS color system supports dark mode (in globals.css), but toggle not implemented
4. **Mobile menu overlay** - Header hamburger menu uses absolute positioning; blocks interaction behind menu when open (intentional UX)
5. **Like button is cosmetic** - Saves to component state only, not persisted to backend
