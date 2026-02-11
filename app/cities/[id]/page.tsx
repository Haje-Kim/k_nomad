import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCityById, getAllCityIds } from '@/lib/data/cities'
import { getUnsplashImage } from '@/lib/unsplash'
import { Badge } from '@/components/ui/badge'
import { LikeDislikeButtons } from '@/components/city/LikeDislikeButtons'
import { BUDGETS, REGIONS } from '@/lib/data/constants'
import { ArrowLeft, Wifi, MapPin, Home, Zap, Train, Coffee, Monitor } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getAllCityIds().map(id => ({ id }))
}

export default async function CityDetailPage({ params }: PageProps) {
  const { id } = await params
  const city = getCityById(id)

  if (!city) {
    notFound()
  }

  const imageUrl = getUnsplashImage(city.image)

  const getBudgetLabel = (value: string) =>
    BUDGETS.find(b => b.value === value)?.label || value

  const getRegionLabel = (value: string) =>
    REGIONS.find(r => r.name === value)?.label || value

  const wifiColorMap = {
    '빠름': 'text-green-600 bg-green-50 border-green-200',
    '보통': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    '느림': 'text-red-600 bg-red-50 border-red-200',
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Image */}
      <div className="relative w-full h-[40vh] bg-sand">
        <Image
          src={imageUrl}
          alt={city.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-bark/40" />
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream/90 text-earth font-medium hover:bg-cream transition-all text-sm"
          >
            <ArrowLeft size={16} />
            목록으로
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Title & Score */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-earth">
              {city.name}
              <span className="ml-3 text-lg font-normal text-moss">{city.nameEn}</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <MapPin size={14} className="text-moss" />
              <span className="text-moss text-sm">{getRegionLabel(city.region)}</span>
            </div>
          </div>
          <div className="flex flex-col items-center bg-forest/10 border-2 border-forest/20 rounded-2xl px-5 py-3">
            <span className="text-xs text-moss">종합점수</span>
            <span className="text-3xl font-bold text-forest">{city.totalScore}</span>
            <span className="text-xs text-moss">/ 100</span>
          </div>
        </div>

        {/* Tags & Badges */}
        <div className="flex flex-wrap gap-2">
          {city.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-sm bg-sand/60 text-earth border border-sand rounded-full px-3 py-1">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Info Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white border-2 border-sand rounded-2xl p-3 text-center">
            <div className="text-xs text-moss font-medium mb-1">예산</div>
            <div className="text-sm font-semibold text-earth">{getBudgetLabel(city.budget)}</div>
          </div>
          <div className="bg-white border-2 border-sand rounded-2xl p-3 text-center">
            <div className="text-xs text-moss font-medium mb-1">최고 계절</div>
            <div className="text-sm font-semibold text-earth">{city.bestSeason.join(' · ')}</div>
          </div>
          <div className="bg-white border-2 border-sand rounded-2xl p-3 text-center col-span-2 md:col-span-2">
            <div className="text-xs text-moss font-medium mb-1">작업 환경</div>
            <div className="text-sm font-semibold text-earth">{city.environment.join(' · ')}</div>
          </div>
        </div>

        {/* Description */}
        {city.detail && (
          <>
            <div className="bg-white border-2 border-sand rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-earth mb-3">도시 소개</h2>
              <p className="text-earth/80 leading-relaxed">{city.detail.description}</p>
            </div>

            {/* Practical Info */}
            <div className="bg-white border-2 border-sand rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-earth mb-4">실용 정보</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sage/20 rounded-xl">
                    <Home size={18} className="text-forest" />
                  </div>
                  <div>
                    <div className="text-xs text-moss font-medium">월세 (원룸 기준)</div>
                    <div className="text-sm font-semibold text-earth mt-0.5">{city.detail.monthlyRent}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sage/20 rounded-xl">
                    <Zap size={18} className="text-forest" />
                  </div>
                  <div>
                    <div className="text-xs text-moss font-medium">인터넷 속도</div>
                    <div className="text-sm font-semibold text-earth mt-0.5">{city.detail.internetSpeed}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sage/20 rounded-xl">
                    <Train size={18} className="text-forest" />
                  </div>
                  <div>
                    <div className="text-xs text-moss font-medium">교통</div>
                    <div className="text-sm font-semibold text-earth mt-0.5">{city.detail.transportation}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coworking Spots */}
            <div>
              <h2 className="text-lg font-semibold text-earth mb-4">추천 작업 공간</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {city.detail.coworkingSpots.map((spot, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-sand rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {spot.type === '카페' ? (
                          <Coffee size={16} className="text-terracotta flex-shrink-0" />
                        ) : (
                          <Monitor size={16} className="text-forest flex-shrink-0" />
                        )}
                        <h3 className="font-semibold text-earth text-sm">{spot.name}</h3>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs rounded-full border flex-shrink-0 ${
                          spot.type === '카페'
                            ? 'text-terracotta border-terracotta/30 bg-terracotta/10'
                            : 'text-forest border-forest/30 bg-forest/10'
                        }`}
                      >
                        {spot.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-earth/70">{spot.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-lg border font-medium ${wifiColorMap[spot.wifi]}`}>
                        <Wifi size={11} />
                        WiFi {spot.wifi}
                      </span>
                      {spot.hasPlug && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-lg border text-blue-600 bg-blue-50 border-blue-200 font-medium">
                          <Zap size={11} />
                          콘센트
                        </span>
                      )}
                      {spot.pricePerDay !== null ? (
                        <span className="text-moss font-medium">
                          {spot.pricePerDay.toLocaleString()}원/일
                        </span>
                      ) : (
                        <span className="text-moss font-medium">음료 주문</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Like/Dislike */}
        <div className="flex items-center gap-4 py-4 border-t-2 border-sand">
          <span className="text-sm text-moss font-medium">이 도시가 마음에 드셨나요?</span>
          <LikeDislikeButtons initialLikes={city.likes} initialDislikes={city.dislikes} />
        </div>
      </div>
    </main>
  )
}
