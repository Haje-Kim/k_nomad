'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Menu, X } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: '홈', href: '#' },
    { label: '도시', href: '#' },
    { label: '커뮤니티', href: '#' },
    { label: '통계', href: '#' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-cream border-b-2 border-sand shadow-nature">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-earth hover:text-forest transition-colors">
            <span className="text-2xl">🇰🇷</span>
            <span className="hidden sm:inline">K.NOMAD</span>
            <span className="sm:hidden">K.N</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-earth hover:text-forest font-medium transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-moss hover:text-forest transition-colors p-2">
              <Search size={20} />
            </button>
            <Link href="/login">
              <Button variant="default" size="sm" className="rounded-2xl bg-forest hover:bg-forest-gradient shadow-nature">
                로그인
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button className="text-moss hover:text-forest transition-colors p-2">
              <Search size={20} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-moss hover:text-forest transition-colors p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-4 border-t-2 border-sand pt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-earth hover:text-forest font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link href="/login" className="block">
              <Button className="w-full rounded-2xl bg-forest hover:bg-forest-gradient shadow-nature" variant="default">
                로그인
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
