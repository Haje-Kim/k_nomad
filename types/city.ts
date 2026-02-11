// 새로운 타입 정의
export type Environment = '자연친화' | '도심선호' | '카페작업' | '코워킹 필수'
export type Season = '봄' | '여름' | '가을' | '겨울'

export type Region = '수도권' | '경상도' | '전라도' | '강원도' | '제주도' | '충청도'

export type BudgetRange = 'under100' | 'range100to200' | 'over200'

export interface CoworkingSpot {
  name: string
  type: '카페' | '코워킹'
  wifi: '빠름' | '보통' | '느림'
  hasPlug: boolean
  pricePerDay: number | null // null = 카페 (별도 요금 없음)
  description: string
}

export interface CityDetail {
  description: string
  monthlyRent: string       // 예: "50~80만원"
  internetSpeed: string     // 예: "100Mbps 이상"
  transportation: string    // 예: "버스 중심, 렌터카 권장"
  coworkingSpots: CoworkingSpot[]
}

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
  detail?: CityDetail
}
