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

# Clean build artifacts
rm -rf .next node_modules package-lock.json && npm install
```

## Custom Commands

### create-designs
Parallel UI design variant generation using git worktrees. Creates 4 independent design variants with separate development servers.

**Usage**: `create-designs <theme1> <theme2> <theme3> <theme4>`

**Example**: `create-designs dark neon minimal glassmorphism`

This command:
1. Creates worktree instances (`./worktree/agent-1` through `agent-4`)
2. Each agent applies a different design theme to the UI
3. Starts separate dev servers on ports 4001-4004 for side-by-side preview
4. Automatically fixes errors during startup
5. Allows comparing design variants in real-time

## Code Architecture

### Component Hierarchy

The app uses a hierarchical component structure:

- **Layout Components** (`components/layout/`)
  - `Header.tsx` - Responsive navigation with mobile menu toggle
  - `Footer.tsx` - Multi-section footer with links and copyright
  - Rendered in `app/layout.tsx`, wrapping all pages

- **Page Composition** (`app/page.tsx`)
  - Composes 3 section components in order: HeroSection → CityListSection → CTASection
  - Client component (uses useState for filter management)
  - Pages: Home (`/`), Login (`/login`), Signup (`/signup`)

- **Section Components** (`components/sections/`)
  - `HeroSection.tsx` - 4-category filter UI (Budget, Region, Environment, Season) with search bar and reset button
  - `CityListSection.tsx` - Grid display of filtered cities sorted by likes, with real-time filtering using useMemo
  - `CTASection.tsx` - Signup call-to-action with email input and social login buttons

- **Reusable Components** (`components/city/`)
  - `CityCard.tsx` - City display component with interactive like/dislike buttons
    - Props: `city: City`
    - Features: Image with 16:9 aspect ratio, filter info display (budget/region/environment/season), likes/dislikes counters, interactive thumb buttons
    - Client component with `useState` for like/dislike button interactivity

- **Shadcn UI Components** (`components/ui/`)
  - Pre-built accessible components: Button, Card, Input, Badge, Separator, Avatar, Dialog, DropdownMenu
  - Used throughout sections for consistency

### Data Architecture

Data is separated by domain:

- **Types** (`types/`)
  - `city.ts` - City interface, Environment, Season, Region, and BudgetRange union types
  - `review.ts` - Review interface (for future use)
  - `supabase.ts` - Supabase database types
  - `index.ts` - Re-exports for cleaner imports

- **Mock Data** (`lib/data/`)
  - `cities.ts` - Array of 10 City objects with fields: id, name, nameEn, region, image, totalScore, environment[], bestSeason[], likes, dislikes, tags[], budget
  - `constants.ts` - Filter configuration arrays:
    - REGIONS (7 items including '전체')
    - BUDGETS (3 items: under100, range100to200, over200)
    - ENVIRONMENTS (4 items: 자연친화, 도심선호, 카페작업, 코워킹 필수)
    - SEASONS (4 items: 봄, 여름, 가을, 겨울)

- **Image Handling** (`lib/unsplash.ts`)
  - `getUnsplashImage(imageKey: string)` - Generates Unsplash Source API URLs
  - Images use Unsplash Source API: `https://source.unsplash.com/800x600/?[imageKey]`
  - Configured in `next.config.ts` with remotePatterns for source.unsplash.com

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
3. **Filter state** managed in `app/page.tsx` and passed down to HeroSection and CityListSection
4. **Unsplash URLs** generated dynamically in CityCard via `lib/unsplash.ts`
5. **Next.js Image** component optimizes images with responsive `sizes` attribute
6. **Client state** (useState) used for:
   - app/page.tsx: Filter state (budget, region, environment, season)
   - CityCard: Like/dislike button toggles with mutual exclusivity
   - Header: Mobile menu open/close, user authentication state
   - CTASection: Email input value (UI-only, no backend submission)

## Key Implementation Details

### Client vs Server Components

- **Client Components** (`'use client'`):
  - app/page.tsx (for filter state management)
  - Header (for mobile menu and auth state)
  - CityCard (for like/dislike buttons)
  - HeroSection (receives filter props)
  - CityListSection (receives filter props, uses useMemo for performance)
  - CTASection (for email input)
  - Login/Signup pages (for form handling)
- **Server Components** (default): Layout, Footer

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
- **Strict mode**: `tsconfig.json` has `strict: true` enabled; always fix type errors before committing

## Common Development Tasks

### Adding a New City

1. Update `lib/data/cities.ts`:
   - Add new City object to array
   - Include all required fields: id, name, nameEn, region, image, totalScore, environment[], bestSeason[], likes, dislikes, tags[], budget
   - Use region name exactly matching Region type ('수도권' | '경상도' | '전라도' | '강원도' | '제주도' | '충청도')
   - budget must be 'under100' | 'range100to200' | 'over200'
   - environment array can include: '자연친화', '도심선호', '카페작업', '코워킹 필수'
   - bestSeason array can include: '봄', '여름', '가을', '겨울'

2. New region or budget category:
   - Update Region or BudgetRange type in `types/city.ts`
   - Update corresponding constant array in `lib/data/constants.ts`

3. Image keyword:
   - Use descriptive, comma-separated keywords in the `image` field
   - Example: 'jeju,beach,city' or 'seoul,skyline,korea'

### Modifying Section Content

- **Filter configuration**: Edit `lib/data/constants.ts` (REGIONS, BUDGETS, ENVIRONMENTS, SEASONS)
- **Section layout**: Modify component JSX (grid cols, spacing, colors)
- **Mock data**: Update `lib/data/cities.ts`
- **Styling**: Update Tailwind classes directly in component (no separate CSS files)

### Adding Interactivity

1. Identify which components need state (currently: app/page.tsx, Header, CityCard, HeroSection, CityListSection, CTASection)
2. Add `'use client'` directive at top of file
3. Import `useState` and `useMemo` from React as needed
4. Use state for: filter selections, toggle buttons (like/dislike), form inputs, menu visibility
5. Use useMemo for: expensive filtering/sorting operations to optimize re-renders

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
- `images.unsplash.com` - Direct Unsplash image URLs (fallback)
- `source.unsplash.com` - Unsplash Source API for city images
- `i.pravatar.cc` - User avatar placeholders

This enables Next.js Image optimization for external domains.

## Notes and Constraints

### Current Scope

✅ **Completed Features:**
- 3 core sections: HeroSection (filters), CityListSection (grid), CTASection
- 10 cities with diversified mock data (varied environment, seasons, likes/dislikes)
- 4-category real-time filtering system (Budget, Region, Environment, Season)
- Interactive like/dislike buttons with mutual exclusivity
- Unsplash Source API integration for dynamic images
- Supabase authentication (login/signup pages)
- TypeScript strict mode with zero errors
- Performance-optimized with useMemo hooks
- Responsive design (mobile, tablet, desktop)
- Production build verified

✅ **Authentication:**
- Supabase integration with email/password auth
- Login and signup pages functional
- Middleware for route protection
- User session management

❌ **Not Implemented:**
- Search functionality (search bar is UI-only)
- Form submissions (CTASection email input is UI-only)
- City detail pages
- Review submission functionality
- Like/dislike data persistence (client-side only)
- Database storage for cities (using mock data)

### Future Enhancements

To extend this project:
- Persist like/dislike data to Supabase database
- Implement search functionality with keyword matching
- Add city detail pages (`app/cities/[id]`) with full information
- Store cities in Supabase database instead of mock data
- Connect CTASection to email service (SendGrid, Mailchimp)
- Add user profiles and personalized city recommendations
- Integrate Supabase for reviews and user data
- Add authentication (NextAuth.js or similar)
- Implement actual review submission

## Performance Considerations

- **Build time**: ~2.6 seconds for production build (measured)
- **Image optimization**: Next.js handles srcset generation and format conversion automatically
- **Code splitting**: Sections are separate components, enabling granular code splitting
- **Lighthouse**: Target score > 90 (unoptimized baseline meets this)
- **Bundle size**: Minimal due to Shadcn tree-shaking and Tailwind v4 JIT compilation

## Custom Command Architecture

Custom commands are defined in `.claude/commands/` as markdown files. These provide persona-driven, multi-agent workflows:

- **File structure**: `.claude/commands/<command-name>.md`
- **Format**: Markdown with Persona and 작업 sections
- **Execution**: Currently requires manual invocation through task agents (Claude Code doesn't auto-register markdown commands)
- **Multi-agent pattern**: Commands can spawn parallel sub-agents using git worktrees for concurrent work

**Extending commands**: Add new `.md` files to `.claude/commands/` and invoke manually via task agents or as documented instructions.

## Known Limitations and Design Decisions

1. **Hard-coded city count in RegionsSection** - Dynamically counts cities per region from mock data (avoids mismatch with constants)
2. **Unsplash rate limits** - Free tier allows ~50 requests/hour per IP; suitable for development/demo
3. **No dark mode currently** - CSS color system supports dark mode (in globals.css), but toggle not implemented
4. **Mobile menu overlay** - Header hamburger menu uses absolute positioning; blocks interaction behind menu when open (intentional UX)
5. **Like button is cosmetic** - Saves to component state only, not persisted to backend
6. **Custom commands not auto-registered** - Markdown files in `.claude/commands/` must be invoked manually as they're not part of Claude Code's skill system
