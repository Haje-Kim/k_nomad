'use client'

import { CityCard } from '@/components/city/CityCard'
import { cities } from '@/lib/data/cities'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef } from 'react'

export function TopCitiesSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const topCities = cities
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 6)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 320 // Card width + gap
    const newPosition = direction === 'left'
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
    setScrollPosition(newPosition)
  }

  return (
    <section className="py-12 lg:py-16 bg-sand">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-3xl font-bold text-earth">
              인기 도시 TOP 6
            </h2>
            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full border-2 border-forest bg-cream hover:bg-sage/30 transition-all shadow-nature text-forest"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full border-2 border-forest bg-cream hover:bg-sage/30 transition-all shadow-nature text-forest"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            <div className="flex gap-6 pb-4">
              {topCities.map((city) => (
                <div
                  key={city.id}
                  className="flex-shrink-0 w-full sm:w-80 snap-start"
                >
                  <CityCard city={city} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
