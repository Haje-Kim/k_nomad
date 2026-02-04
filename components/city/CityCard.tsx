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
    <Card className="overflow-hidden hover:shadow-nature-lg transition-all duration-300 hover:scale-[1.02] h-full rounded-3xl border-2 border-sand bg-cream">
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-sand overflow-hidden rounded-t-3xl">
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
            <Badge key={tag} variant="secondary" className="text-xs bg-cream/95 text-earth rounded-full border-sand">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 bg-cream/95 hover:bg-cream rounded-full p-2 transition-colors shadow-nature"
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            className={isLiked ? 'fill-terracotta text-terracotta' : 'text-earth'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-earth">
            {city.name} <span className="text-sm text-moss font-normal">/ {city.nameEn}</span>
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-earth/80">
              <span>💵</span>
              <span>{city.stats.livingCost}만원</span>
            </div>
            <div className="flex items-center gap-1 text-earth/80">
              <span>📡</span>
              <span>{city.stats.internetSpeed}Mbps</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-earth/80">
              <span>☕</span>
              <span>{city.stats.cafeCount}개</span>
            </div>
            <div className="flex items-center gap-1 text-earth/80">
              <span>{city.stats.weather}</span>
              <span>{city.stats.temperature}°C</span>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center justify-between pt-2 border-t border-sand">
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold">⭐</span>
            <span className="font-semibold text-earth">{city.rating}</span>
            <span className="text-xs text-moss">({city.reviewCount})</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-moss">종합점수</div>
            <div className="font-semibold text-base text-forest">{city.totalScore}점</div>
          </div>
        </div>

        {/* Action Button */}
        {variant === 'default' && (
          <Button className="w-full mt-2 rounded-2xl bg-sage hover:bg-moss text-earth border-2 border-sage" variant="outline">
            상세보기
          </Button>
        )}
      </div>
    </Card>
  )
}
