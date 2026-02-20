'use client'

import { CityCard } from '@/components/city/CityCard'
import { useMemo } from 'react'
import type { BudgetRange, Region, Environment, Season, City } from '@/types'

interface CityListSectionProps {
  cities: City[]
  selectedBudget: BudgetRange | ''
  selectedRegion: Region | '전체' | ''
  selectedEnvironment: Environment | ''
  selectedSeason: Season | ''
}

export function CityListSection({
  cities,
  selectedBudget,
  selectedRegion,
  selectedEnvironment,
  selectedSeason,
}: CityListSectionProps) {
  // 필터링 로직
  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      if (selectedBudget && city.budget !== selectedBudget) return false
      if (selectedRegion && selectedRegion !== '전체' && city.region !== selectedRegion) return false
      if (selectedEnvironment && !city.environment.includes(selectedEnvironment)) return false
      if (selectedSeason && !city.bestSeason.includes(selectedSeason)) return false
      return true
    })
  }, [cities, selectedBudget, selectedRegion, selectedEnvironment, selectedSeason])

  // 좋아요 순으로 정렬
  const sortedCities = useMemo(() => {
    return [...filteredCities].sort((a, b) => b.likes - a.likes)
  }, [filteredCities])

  return (
    <section className="py-12 lg:py-16 bg-sand">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-3xl font-bold text-earth">
              도시 리스트
            </h2>
            <div className="text-sm text-moss">
              총 {sortedCities.length}개 도시
            </div>
          </div>

          {/* City Grid or Empty State */}
          {sortedCities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCities.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-earth mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-moss">
                필터 조건을 변경하거나 초기화해 보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
