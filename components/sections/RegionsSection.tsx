import { Card } from '@/components/ui/card'
import { REGIONS } from '@/lib/data/constants'
import { cities } from '@/lib/data/cities'
import { ChevronRight } from 'lucide-react'

export function RegionsSection() {
  const getCityCountByRegion = (region: string) => {
    return cities.filter((city) => city.region === region).length
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            지역별 도시
          </h2>
          <p className="text-gray-600 mt-2">전국 6개 지역에서 노마드 도시를 찾아보세요</p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {REGIONS.map((region) => {
            const cityCount = getCityCountByRegion(region.name)
            return (
              <Card
                key={region.name}
                className="p-6 hover:shadow-lg hover:scale-105 transition-all cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="text-4xl">{region.emoji}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {region.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {cityCount}개 도시
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">더 보기</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
