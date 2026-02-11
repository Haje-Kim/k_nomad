'use client'

import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'

interface LikeDislikeButtonsProps {
  initialLikes: number
  initialDislikes: number
}

export function LikeDislikeButtons({ initialLikes, initialDislikes }: LikeDislikeButtonsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(initialLikes)
  const [currentDislikes, setCurrentDislikes] = useState(initialDislikes)

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
      setCurrentLikes(currentLikes - 1)
    } else {
      setIsLiked(true)
      setCurrentLikes(currentLikes + 1)
      if (isDisliked) {
        setIsDisliked(false)
        setCurrentDislikes(currentDislikes - 1)
      }
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false)
      setCurrentDislikes(currentDislikes - 1)
    } else {
      setIsDisliked(true)
      setCurrentDislikes(currentDislikes + 1)
      if (isLiked) {
        setIsLiked(false)
        setCurrentLikes(currentLikes - 1)
      }
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
          isLiked
            ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
            : 'bg-sage/30 text-earth hover:bg-sage/50 border-2 border-sand'
        }`}
        aria-label="좋아요"
      >
        <ThumbsUp size={18} className={isLiked ? 'fill-blue-600' : ''} />
        <span>{currentLikes}</span>
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
          isDisliked
            ? 'bg-red-100 text-red-600 border-2 border-red-300'
            : 'bg-sage/30 text-earth hover:bg-sage/50 border-2 border-sand'
        }`}
        aria-label="싫어요"
      >
        <ThumbsDown size={18} className={isDisliked ? 'fill-red-600' : ''} />
        <span>{currentDislikes}</span>
      </button>
    </div>
  )
}
