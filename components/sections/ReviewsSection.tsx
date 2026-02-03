import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { reviews } from '@/lib/data/reviews'
import { MessageCircle, Heart } from 'lucide-react'

export function ReviewsSection() {
  const displayReviews = reviews.slice(0, 3)

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            최신 리뷰
          </h2>
          <p className="text-gray-600 mt-2">실제 노마드들의 경험을 공유받아보세요</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.userAvatar} alt={review.userName} />
                    <AvatarFallback>{review.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{review.userName}</p>
                    <p className="text-xs text-gray-600">{review.duration}</p>
                  </div>
                </div>

                {/* City & Rating */}
                <div>
                  <p className="font-semibold text-lg text-gray-900">{review.cityName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-lg">⭐</span>
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <span key={`empty-${i}`} className="text-lg text-gray-300">★</span>
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 line-clamp-3">
                  {review.content}
                </p>

                {/* Interaction Stats */}
                <div className="flex items-center gap-4 pt-3 border-t text-sm text-gray-600">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart size={16} />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <MessageCircle size={16} />
                    <span>{review.comments}</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
