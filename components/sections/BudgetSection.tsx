import { Card } from '@/components/ui/card'
import { BUDGETS } from '@/lib/data/constants'
import { cities } from '@/lib/data/cities'
import { Button } from '@/components/ui/button'

export function BudgetSection() {
  const getCitiesByBudget = (budget: string) => {
    return cities.filter((city) => city.budget === budget)
  }

  return (
    <section className="py-12 lg:py-16 bg-sand">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-earth">
            예산별 도시
          </h2>
          <p className="text-earth/70 mt-2">당신의 예산에 맞는 도시를 선택하세요</p>
        </div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BUDGETS.map((budget) => {
            const budgetCities = getCitiesByBudget(budget.value)
            return (
              <Card
                key={budget.value}
                className="p-8 hover:shadow-nature-lg transition-all hover:scale-105 rounded-3xl border-2 border-sand bg-gradient-to-br from-cream to-sage/10"
              >
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div>
                    <div className="text-5xl mb-3">{budget.emoji}</div>
                    <h3 className="text-2xl font-bold text-earth">
                      {budget.label}
                    </h3>
                    <p className="text-lg text-earth/70 mt-2">
                      {budget.description}
                    </p>
                  </div>

                  {/* City Count */}
                  <div>
                    <div className="text-3xl font-bold text-forest">
                      {budgetCities.length}
                    </div>
                    <p className="text-sm text-moss">개의 도시</p>
                  </div>

                  {/* Sample Cities */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-earth">예시 도시</p>
                    <ul className="space-y-1">
                      {budgetCities.slice(0, 3).map((city) => (
                        <li key={city.id} className="text-sm text-earth/70">
                          • {city.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full rounded-2xl bg-sage hover:bg-moss text-earth border-2 border-sage" variant="outline">
                    도시 보기
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
