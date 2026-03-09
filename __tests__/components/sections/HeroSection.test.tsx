import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroSection } from '@/components/sections/HeroSection'
import type { BudgetRange, Region, Environment, Season } from '@/types'

const defaultProps = {
  selectedBudget: '' as BudgetRange | '',
  selectedRegion: '전체' as Region | '전체' | '',
  selectedEnvironment: '' as Environment | '',
  selectedSeason: '' as Season | '',
  onBudgetChange: vi.fn(),
  onRegionChange: vi.fn(),
  onEnvironmentChange: vi.fn(),
  onSeasonChange: vi.fn(),
  cityCount: 10,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('HeroSection - hasActiveFilters 로직', () => {
  it('모든 필터 기본값 → 초기화 버튼 미표시', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.queryByText('필터 초기화')).not.toBeInTheDocument()
  })

  it('budget 선택 시 초기화 버튼 표시', () => {
    render(<HeroSection {...defaultProps} selectedBudget="under100" />)
    expect(screen.getByText('필터 초기화')).toBeInTheDocument()
  })

  it('region이 "전체"가 아닌 값 → 초기화 버튼 표시', () => {
    render(<HeroSection {...defaultProps} selectedRegion="제주도" />)
    expect(screen.getByText('필터 초기화')).toBeInTheDocument()
  })

  it('environment 선택 시 초기화 버튼 표시', () => {
    render(<HeroSection {...defaultProps} selectedEnvironment="자연친화" />)
    expect(screen.getByText('필터 초기화')).toBeInTheDocument()
  })

  it('season 선택 시 초기화 버튼 표시', () => {
    render(<HeroSection {...defaultProps} selectedSeason="봄" />)
    expect(screen.getByText('필터 초기화')).toBeInTheDocument()
  })
})

describe('HeroSection - handleReset', () => {
  it('초기화 버튼 클릭 → onBudgetChange("") 호출', async () => {
    const onBudgetChange = vi.fn()
    render(<HeroSection {...defaultProps} selectedBudget="under100" onBudgetChange={onBudgetChange} />)
    await userEvent.click(screen.getByText('필터 초기화'))
    expect(onBudgetChange).toHaveBeenCalledWith('')
  })

  it('초기화 버튼 클릭 → onRegionChange("전체") 호출', async () => {
    const onRegionChange = vi.fn()
    render(<HeroSection {...defaultProps} selectedRegion="제주도" onRegionChange={onRegionChange} />)
    await userEvent.click(screen.getByText('필터 초기화'))
    expect(onRegionChange).toHaveBeenCalledWith('전체')
  })

  it('초기화 버튼 클릭 → onEnvironmentChange("") 호출', async () => {
    const onEnvironmentChange = vi.fn()
    render(<HeroSection {...defaultProps} selectedEnvironment="자연친화" onEnvironmentChange={onEnvironmentChange} />)
    await userEvent.click(screen.getByText('필터 초기화'))
    expect(onEnvironmentChange).toHaveBeenCalledWith('')
  })

  it('초기화 버튼 클릭 → onSeasonChange("") 호출', async () => {
    const onSeasonChange = vi.fn()
    render(<HeroSection {...defaultProps} selectedSeason="봄" onSeasonChange={onSeasonChange} />)
    await userEvent.click(screen.getByText('필터 초기화'))
    expect(onSeasonChange).toHaveBeenCalledWith('')
  })
})

describe('HeroSection - 필터 select onChange', () => {
  // HeroSection의 select 순서: 예산(0), 지역(1), 환경(2), 계절(3)
  it('예산 select 변경 → onBudgetChange가 선택된 값으로 호출', async () => {
    const onBudgetChange = vi.fn()
    render(<HeroSection {...defaultProps} onBudgetChange={onBudgetChange} />)
    const selects = screen.getAllByRole('combobox')
    await userEvent.selectOptions(selects[0], 'under100')
    expect(onBudgetChange).toHaveBeenCalledWith('under100')
  })

  it('지역 select 변경 → onRegionChange가 선택된 값으로 호출', async () => {
    const onRegionChange = vi.fn()
    render(<HeroSection {...defaultProps} onRegionChange={onRegionChange} />)
    const selects = screen.getAllByRole('combobox')
    await userEvent.selectOptions(selects[1], '제주도')
    expect(onRegionChange).toHaveBeenCalledWith('제주도')
  })

  it('환경 select 변경 → onEnvironmentChange가 선택된 값으로 호출', async () => {
    const onEnvironmentChange = vi.fn()
    render(<HeroSection {...defaultProps} onEnvironmentChange={onEnvironmentChange} />)
    const selects = screen.getAllByRole('combobox')
    await userEvent.selectOptions(selects[2], '자연친화')
    expect(onEnvironmentChange).toHaveBeenCalledWith('자연친화')
  })

  it('계절 select 변경 → onSeasonChange가 선택된 값으로 호출', async () => {
    const onSeasonChange = vi.fn()
    render(<HeroSection {...defaultProps} onSeasonChange={onSeasonChange} />)
    const selects = screen.getAllByRole('combobox')
    await userEvent.selectOptions(selects[3], '봄')
    expect(onSeasonChange).toHaveBeenCalledWith('봄')
  })
})
