export type Region = '수도권' | '충청' | '전라' | '경상' | '강원' | '제주'

export type BudgetRange = 'economic' | 'moderate' | 'premium'

export interface CityStats {
  livingCost: number // Monthly in 만원
  internetSpeed: number // Mbps
  cafeCount: number
  temperature: number // Celsius
  weather: string // Emoji
  safetyScore: number // 0-5
  aqi: number // Air Quality Index
}

export interface City {
  id: string
  name: string
  nameEn: string
  region: Region
  image: string // Unsplash keyword
  totalScore: number
  stats: CityStats
  rating: number
  reviewCount: number
  tags: string[]
  budget: BudgetRange
}
