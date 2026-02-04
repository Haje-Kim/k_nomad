import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: '서비스',
      links: [
        { label: '도시 검색', href: '#' },
        { label: '리뷰 보기', href: '#' },
        { label: '통계', href: '#' },
      ],
    },
    {
      title: '커뮤니티',
      links: [
        { label: '블로그', href: '#' },
        { label: '포럼', href: '#' },
        { label: '이벤트', href: '#' },
      ],
    },
    {
      title: '고객지원',
      links: [
        { label: '자주 묻는 질문', href: '#' },
        { label: '문의하기', href: '#' },
        { label: '개인정보처리방침', href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-earth text-sage mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🇰🇷</span>
              <span className="text-xl font-bold text-cream">K.NOMAD</span>
            </div>
            <p className="text-sm text-sage/80">한국에서 노마드 생활하기 좋은 도시를 찾아보세요.</p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-cream mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-cream transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-moss/30" />

        {/* Bottom Section */}
        <div className="mt-8 space-y-6">
          {/* Social Links */}
          <div className="flex gap-6">
            <a href="#" className="text-sage/80 hover:text-cream transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sage/80 hover:text-cream transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sage/80 hover:text-cream transition-colors">
              Facebook
            </a>
            <a href="#" className="text-sage/80 hover:text-cream transition-colors">
              YouTube
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-moss/30 text-sm text-sage/70">
            <p>© {currentYear} K.NOMAD. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
