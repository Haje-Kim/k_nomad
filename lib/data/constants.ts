import { Region, BudgetRange } from '@/types'

export const REGIONS: { name: Region; label: string; emoji: string; count: number }[] = [
  { name: '수도권', label: '🏙️ 수도권', emoji: '🏙️', count: 2 },
  { name: '충청', label: '🌾 충청', emoji: '🌾', count: 1 },
  { name: '전라', label: '🌊 전라', emoji: '🌊', count: 2 },
  { name: '경상', label: '⛰️ 경상', emoji: '⛰️', count: 2 },
  { name: '강원', label: '🏔️ 강원', emoji: '🏔️', count: 2 },
  { name: '제주', label: '🏝️ 제주', emoji: '🏝️', count: 2 },
]

export const BUDGETS: {
  value: BudgetRange
  label: string
  emoji: string
  description: string
  color: string
}[] = [
  {
    value: 'economic',
    label: '💚 경제적',
    emoji: '💚',
    description: '100-150만원/월',
    color: 'bg-green-100 text-green-700',
  },
  {
    value: 'moderate',
    label: '💙 적정',
    emoji: '💙',
    description: '150-200만원/월',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    value: 'premium',
    label: '💜 프리미엄',
    emoji: '💜',
    description: '200만원+/월',
    color: 'bg-purple-100 text-purple-700',
  },
]

export const BUDGET_RANGE_MAP = {
  economic: { min: 100, max: 150, count: 4 },
  moderate: { min: 150, max: 200, count: 4 },
  premium: { min: 200, max: 300, count: 2 },
}

export const QUICK_FILTERS = [
  { id: 'cost', label: '💰 생활비', icon: '💰' },
  { id: 'internet', label: '📡 인터넷', icon: '📡' },
  { id: 'cafe', label: '☕ 카페', icon: '☕' },
  { id: 'weather', label: '🌤️ 날씨', icon: '🌤️' },
]
