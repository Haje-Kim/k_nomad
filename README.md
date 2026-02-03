# K.NOMAD - Korean Digital Nomad City Guide

A modern Next.js 14+ web application for discovering the best Korean cities for digital nomads. Features a responsive design, 10+ mock cities with real-time data, Unsplash integration for beautiful city images, and a complete UI implementation.

## 🌟 Features

- **10 Korean Cities**: Complete mock data for 10 cities across 6 regions
- **Responsive Design**: Optimized for mobile (< 768px) and desktop (> 1024px)
- **Modern Stack**: Next.js 14+, React Server Components, TypeScript, Tailwind CSS
- **Shadcn UI Components**: Pre-built, customizable UI components
- **Unsplash Integration**: Beautiful, high-quality city images

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (v20 recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser - http://localhost:3000
```

## 📊 Cities Included

1. **제주시** (Jeju) - Score: 92/100
2. **서귀포** (Seogwipo) - Score: 88/100
3. **부산** (Busan) - Score: 85/100
4. **강릉** (Gangneung) - Score: 82/100
5. **전주** (Jeonju) - Score: 80/100
6. **경주** (Gyeongju) - Score: 78/100
7. **속초** (Sokcho) - Score: 81/100
8. **여수** (Yeosu) - Score: 83/100
9. **서울** (Seoul) - Score: 86/100
10. **인천** (Incheon) - Score: 79/100

## 🏗️ Sections

- **HeroSection** - Search bar and quick filters
- **StatsSection** - Key statistics
- **TopCitiesSection** - Carousel of top 6 cities
- **RegionsSection** - 6-region grid
- **BudgetSection** - Budget categories (Economic, Moderate, Premium)
- **ReviewsSection** - Recent reviews showcase
- **CTASection** - Signup call-to-action

## 🛠️ Tech Stack

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS 4
- Shadcn UI Components
- Lucide React Icons
- Unsplash API for images

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 💾 Project Structure

```
components/
  ├── layout/
  │   ├── Header.tsx
  │   └── Footer.tsx
  ├── sections/
  │   ├── HeroSection.tsx
  │   ├── StatsSection.tsx
  │   ├── TopCitiesSection.tsx
  │   ├── RegionsSection.tsx
  │   ├── BudgetSection.tsx
  │   ├── ReviewsSection.tsx
  │   └── CTASection.tsx
  └── city/
      └── CityCard.tsx

lib/
  ├── data/
  │   ├── cities.ts
  │   ├── reviews.ts
  │   └── constants.ts
  ├── unsplash.ts
  └── utils.ts

types/
  ├── city.ts
  ├── review.ts
  └── index.ts
```

## 🎨 Features by Section

### CityCard Component
- Image with 16:9 aspect ratio
- Living cost, internet speed, cafe count, temperature
- Rating with review count
- Like/favorite button
- Responsive layout

### Hero Section
- Search bar
- Quick filter chips (Cost, Internet, Cafe, Weather)
- Responsive headline

### Carousel
- Horizontal scroll on mobile
- Navigation arrows on desktop
- Smooth scrolling
- Auto-responsive sizing

### Regions
- 6 regions with emoji icons
- City count per region
- Hover effects

### Budget
- 3 budget categories
- Sample cities per budget
- Color-coded (Green, Blue, Purple)

### Reviews
- User avatars
- Star ratings
- Engagement metrics
- City names

## ✨ Build Status

✅ All sections implemented
✅ 10 cities with mock data
✅ Responsive layout (mobile + desktop)
✅ Unsplash images integrated
✅ TypeScript type safety
✅ Shadcn UI components
✅ Production build successful

## 📝 Notes

- UI-only implementation (no backend)
- All data is mock/static
- Search and filters are UI elements only
- Images from Unsplash
- Fully responsive design
- Fast page loads with Next.js optimization

## 📄 License

MIT License - Open source

---

Status: ✅ Complete Implementation
Date: February 3, 2025
