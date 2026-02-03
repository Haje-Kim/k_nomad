'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { QUICK_FILTERS } from '@/lib/data/constants'
import { Search } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-transparent py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
            대한민국에서 노마드로 살기 좋은 도시
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            30개 도시 | 500+ 리뷰 | 실시간 데이터
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="도시명, 지역 검색..."
              className="w-full pl-4 pr-12 py-3 text-base rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Search size={20} />
            </button>
          </div>
          <Button className="px-6 lg:px-8 py-3 h-auto text-base font-semibold">
            검색
          </Button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter.id}
              className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
