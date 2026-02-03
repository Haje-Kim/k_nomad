export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  cityId: string
  cityName: string
  rating: number
  content: string
  duration: string // e.g., "6개월"
  likes: number
  comments: number
  createdAt: Date
}
