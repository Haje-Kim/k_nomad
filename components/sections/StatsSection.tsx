import { Card } from '@/components/ui/card'
import { stats } from '@/lib/data/reviews'

export function StatsSection() {
  return (
    <section className="py-12 lg:py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-nature-lg transition-all hover:scale-105 rounded-3xl border-2 border-sand bg-gradient-to-br from-cream to-sage/20">
              <div className="text-4xl lg:text-5xl font-bold text-forest mb-2">
                {stat.icon && <span className="mr-2">{stat.icon}</span>}
                {stat.value}
              </div>
              <p className="text-earth/80 font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
