'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, RotateCcw } from 'lucide-react'
import { BUDGETS, REGIONS, ENVIRONMENTS, SEASONS } from '@/lib/data/constants'
import type { BudgetRange, Region, Environment, Season } from '@/types'

interface HeroSectionProps {
  selectedBudget: BudgetRange | ''
  selectedRegion: Region | '전체' | ''
  selectedEnvironment: Environment | ''
  selectedSeason: Season | ''
  onBudgetChange: (value: BudgetRange | '') => void
  onRegionChange: (value: Region | '전체') => void
  onEnvironmentChange: (value: Environment | '') => void
  onSeasonChange: (value: Season | '') => void
}

export function HeroSection({
  selectedBudget,
  selectedRegion,
  selectedEnvironment,
  selectedSeason,
  onBudgetChange,
  onRegionChange,
  onEnvironmentChange,
  onSeasonChange,
}: HeroSectionProps) {
  const handleReset = () => {
    onBudgetChange('')
    onRegionChange('전체')
    onEnvironmentChange('')
    onSeasonChange('')
  }

  const hasActiveFilters =
    selectedBudget !== '' ||
    selectedRegion !== '전체' ||
    selectedEnvironment !== '' ||
    selectedSeason !== ''

  return (
    <section className="bg-nature-gradient py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-earth">
            대한민국에서 노마드로 살기 좋은 도시
          </h1>
          <p className="text-lg lg:text-xl text-earth/70">
            10개 도시 | 실시간 데이터
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="도시명, 지역 검색..."
              className="w-full pl-4 pr-12 py-3 text-base rounded-3xl border-2 border-sand bg-cream/50 focus:border-forest focus:outline-none shadow-nature"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-moss hover:text-forest transition-colors">
              <Search size={20} />
            </button>
          </div>
          <Button className="px-6 lg:px-8 py-3 h-auto text-base font-semibold rounded-3xl bg-forest hover:bg-forest-gradient shadow-nature">
            검색
          </Button>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Budget Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-earth/80">예산</label>
              <select
                value={selectedBudget}
                onChange={(e) => onBudgetChange(e.target.value as BudgetRange | '')}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-sand bg-cream text-earth focus:border-forest focus:outline-none shadow-sm transition-colors"
              >
                <option value="">전체</option>
                {BUDGETS.map((budget) => (
                  <option key={budget.value} value={budget.value}>
                    {budget.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-earth/80">지역</label>
              <select
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value as Region | '전체')}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-sand bg-cream text-earth focus:border-forest focus:outline-none shadow-sm transition-colors"
              >
                {REGIONS.map((region) => (
                  <option key={region.name} value={region.name}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Environment Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-earth/80">환경</label>
              <select
                value={selectedEnvironment}
                onChange={(e) => onEnvironmentChange(e.target.value as Environment | '')}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-sand bg-cream text-earth focus:border-forest focus:outline-none shadow-sm transition-colors"
              >
                <option value="">전체</option>
                {ENVIRONMENTS.map((env) => (
                  <option key={env.value} value={env.value}>
                    {env.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Season Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-earth/80">계절</label>
              <select
                value={selectedSeason}
                onChange={(e) => onSeasonChange(e.target.value as Season | '')}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-sand bg-cream text-earth focus:border-forest focus:outline-none shadow-sm transition-colors"
              >
                <option value="">전체</option>
                {SEASONS.map((season) => (
                  <option key={season.value} value={season.value}>
                    {season.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-6 py-2 rounded-2xl border-2 border-sand bg-cream hover:bg-sage/30 text-earth transition-colors"
              >
                <RotateCcw size={16} className="mr-2" />
                필터 초기화
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
