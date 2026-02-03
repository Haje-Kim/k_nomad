'use client'

import { City } from '@/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { getUnsplashImage } from '@/lib/unsplash'
import Image from 'next/image'
import { useState } from 'react'

interface CityCardProps {
  city: City
  variant?: 'default' | 'compact'
}

export function CityCard({ city, variant = 'default' }: CityCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const imageUrl = getUnsplashImage(city.image)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
        <Image
          src={imageUrl}
          alt={city.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Tags overlay */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {city.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-white/90">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">
            {city.name} <span className="text-sm text-gray-500 font-normal">/ {city.nameEn}</span>
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-gray-600">
              <span>💵</span>
              <span>{city.stats.livingCost}만원</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span>📡</span>
              <span>{city.stats.internetSpeed}Mbps</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-gray-600">
              <span>☕</span>
              <span>{city.stats.cafeCount}개</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span>{city.stats.weather}</span>
              <span>{city.stats.temperature}°C</span>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold">⭐</span>
            <span className="font-semibold">{city.rating}</span>
            <span className="text-xs text-gray-500">({city.reviewCount})</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">종합점수</div>
            <div className="font-semibold text-base text-blue-600">{city.totalScore}점</div>
          </div>
        </div>

        {/* Action Button */}
        {variant === 'default' && (
          <Button className="w-full mt-2" variant="outline">
            상세보기
          </Button>
        )}
      </div>
    </Card>
  )
}
