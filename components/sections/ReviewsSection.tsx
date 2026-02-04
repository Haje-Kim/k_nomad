import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { reviews } from '@/lib/data/reviews'
import { MessageCircle, Heart } from 'lucide-react'

export function ReviewsSection() {
  const displayReviews = reviews.slice(0, 3)

  return (
    <section className="py-12 lg:py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-earth">
            최신 리뷰
          </h2>
          <p className="text-earth/70 mt-2">실제 노마드들의 경험을 공유받아보세요</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-nature-lg transition-all hover:scale-105 rounded-3xl border-2 border-sand bg-gradient-to-br from-cream to-sage/10">
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-sand">
                    <AvatarImage src={review.userAvatar} alt={review.userName} />
                    <AvatarFallback className="bg-sage text-earth">{review.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-earth">{review.userName}</p>
                    <p className="text-xs text-moss">{review.duration}</p>
                  </div>
                </div>

                {/* City & Rating */}
                <div>
                  <p className="font-semibold text-lg text-earth">{review.cityName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-lg">⭐</span>
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <span key={`empty-${i}`} className="text-lg text-sand">★</span>
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-earth/80 line-clamp-3">
                  {review.content}
                </p>

                {/* Interaction Stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-sand text-sm text-moss">
                  <button className="flex items-center gap-1 hover:text-terracotta transition-colors">
                    <Heart size={16} />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-forest transition-colors">
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
