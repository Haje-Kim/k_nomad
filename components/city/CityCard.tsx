'use client'

import { City } from '@/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { getUnsplashImage } from '@/lib/unsplash'
import Image from 'next/image'
import { useState } from 'react'
import { BUDGETS, REGIONS, ENVIRONMENTS, SEASONS } from '@/lib/data/constants'

interface CityCardProps {
  city: City
}

export function CityCard({ city }: CityCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(city.likes)
  const [currentDislikes, setCurrentDislikes] = useState(city.dislikes)

  const imageUrl = getUnsplashImage(city.image)

  const handleLike = () => {
    if (isLiked) {
      // 좋아요 취소
      setIsLiked(false)
      setCurrentLikes(currentLikes - 1)
    } else {
      // 좋아요 추가
      setIsLiked(true)
      setCurrentLikes(currentLikes + 1)
      // 싫어요가 활성화되어 있다면 취소
      if (isDisliked) {
        setIsDisliked(false)
        setCurrentDislikes(currentDislikes - 1)
      }
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      // 싫어요 취소
      setIsDisliked(false)
      setCurrentDislikes(currentDislikes - 1)
    } else {
      // 싫어요 추가
      setIsDisliked(true)
      setCurrentDislikes(currentDislikes + 1)
      // 좋아요가 활성화되어 있다면 취소
      if (isLiked) {
        setIsLiked(false)
        setCurrentLikes(currentLikes - 1)
      }
    }
  }

  // Helper 함수: 상수 배열에서 label 찾기
  const getBudgetLabel = (value: string) =>
    BUDGETS.find(b => b.value === value)?.label || value

  const getRegionLabel = (value: string) =>
    REGIONS.find(r => r.name === value)?.label || value

  const getEnvironmentLabel = (value: string) =>
    ENVIRONMENTS.find(e => e.value === value)?.label || value

  const getSeasonLabel = (value: string) =>
    SEASONS.find(s => s.value === value)?.label || value

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
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-earth">
            {city.name} <span className="text-sm text-moss font-normal">/ {city.nameEn}</span>
          </h3>
        </div>

        {/* Filter Info - Key-Value */}
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-moss font-medium min-w-[80px]">예산:</span>
            <span className="text-earth">{getBudgetLabel(city.budget)}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-moss font-medium min-w-[80px]">지역:</span>
            <span className="text-earth">{getRegionLabel(city.region)}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-moss font-medium min-w-[80px]">환경:</span>
            <span className="text-earth">{city.environment.map(e => getEnvironmentLabel(e)).join(', ')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-moss font-medium min-w-[80px]">최고 계절:</span>
            <span className="text-earth">{city.bestSeason.map(s => getSeasonLabel(s)).join(', ')}</span>
          </div>
        </div>

        {/* Like/Dislike Buttons */}
        <div className="flex items-center gap-3 pt-2 border-t border-sand">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              isLiked
                ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                : 'bg-sage/30 text-earth hover:bg-sage/50 border-2 border-sand'
            }`}
            aria-label="좋아요"
          >
            <ThumbsUp size={16} className={isLiked ? 'fill-blue-600' : ''} />
            <span className="font-semibold">{currentLikes}</span>
          </button>

          <button
            onClick={handleDislike}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              isDisliked
                ? 'bg-red-100 text-red-600 border-2 border-red-300'
                : 'bg-sage/30 text-earth hover:bg-sage/50 border-2 border-sand'
            }`}
            aria-label="싫어요"
          >
            <ThumbsDown size={16} className={isDisliked ? 'fill-red-600' : ''} />
            <span className="font-semibold">{currentDislikes}</span>
          </button>

          <div className="ml-auto text-right">
            <div className="text-xs text-moss">종합점수</div>
            <div className="font-semibold text-base text-forest">{city.totalScore}점</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
