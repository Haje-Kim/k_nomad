import { Region, BudgetRange, Environment, Season } from '@/types'

export const REGIONS: { name: Region | '전체'; label: string; emoji: string }[] = [
  { name: '전체', label: '🌏 전체', emoji: '🌏' },
  { name: '수도권', label: '🏙️ 수도권', emoji: '🏙️' },
  { name: '경상도', label: '⛰️ 경상도', emoji: '⛰️' },
  { name: '전라도', label: '🌊 전라도', emoji: '🌊' },
  { name: '강원도', label: '🏔️ 강원도', emoji: '🏔️' },
  { name: '제주도', label: '🏝️ 제주도', emoji: '🏝️' },
  { name: '충청도', label: '🌾 충청도', emoji: '🌾' },
]

export const BUDGETS: {
  value: BudgetRange
  label: string
  emoji: string
  description: string
}[] = [
  {
    value: 'under100',
    label: '💚 100만원 미만',
    emoji: '💚',
    description: '100만원 미만',
  },
  {
    value: 'range100to200',
    label: '💙 100만원~200만원',
    emoji: '💙',
    description: '100~200만원',
  },
  {
    value: 'over200',
    label: '💜 200만원 이상',
    emoji: '💜',
    description: '200만원 이상',
  },
]

export const ENVIRONMENTS: {
  value: Environment
  label: string
  emoji: string
  description: string
}[] = [
  {
    value: '자연친화',
    label: '🌿 자연친화',
    emoji: '🌿',
    description: '자연과 함께하는 여유로운 환경',
  },
  {
    value: '도심선호',
    label: '🏢 도심선호',
    emoji: '🏢',
    description: '편의시설이 가까운 도심',
  },
  {
    value: '카페작업',
    label: '☕ 카페작업',
    emoji: '☕',
    description: '작업하기 좋은 카페가 많은 곳',
  },
  {
    value: '코워킹 필수',
    label: '💼 코워킹 필수',
    emoji: '💼',
    description: '코워킹 스페이스가 잘 갖춰진 곳',
  },
]

export const SEASONS: {
  value: Season
  label: string
  emoji: string
  description: string
}[] = [
  { value: '봄', label: '🌸 봄', emoji: '🌸', description: '3~5월' },
  { value: '여름', label: '☀️ 여름', emoji: '☀️', description: '6~8월' },
  { value: '가을', label: '🍂 가을', emoji: '🍂', description: '9~11월' },
  { value: '겨울', label: '❄️ 겨울', emoji: '❄️', description: '12~2월' },
]
