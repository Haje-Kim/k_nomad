// 새로운 타입 정의
export type Environment = '자연친화' | '도심선호' | '카페작업' | '코워킹 필수'
export type Season = '봄' | '여름' | '가을' | '겨울'

export type Region = '수도권' | '경상도' | '전라도' | '강원도' | '제주도' | '충청도'

export type BudgetRange = 'under100' | 'range100to200' | 'over200'

export interface City {
  id: string
  name: string
  nameEn: string
  region: Region
  image: string // Unsplash keyword
  totalScore: number
  environment: Environment[]
  bestSeason: Season[]
  likes: number
  dislikes: number
  tags: string[]
  budget: BudgetRange
}
