import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-earth text-sage mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🇰🇷</span>
            <span className="text-xl font-bold text-cream">K.NOMAD</span>
          </div>
          <p className="text-sm text-sage/80">한국에서 노마드 생활하기 좋은 도시를 찾아보세요.</p>
        </div>

        <Separator className="bg-moss/30 my-8" />

        {/* Copyright */}
        <p className="text-sm text-sage/70">© {currentYear} K.NOMAD. All rights reserved.</p>
      </div>
    </footer>
  )
}
