'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, User, LogOut } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-2xl border-sand hover:bg-sage hover:border-forest transition-colors"
                  >
                    <User size={16} className="mr-2" />
                    {user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl border-sand bg-cream">
                  <DropdownMenuLabel className="text-earth">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.email?.split('@')[0]}</p>
                      <p className="text-xs text-moss">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-sand" />
                  <DropdownMenuItem
                    onClick={async () => {
                      await fetch('/auth/signout', { method: 'POST' })
                      router.push('/login')
                      router.refresh()
                    }}
                    className="rounded-xl cursor-pointer hover:bg-sage text-destructive"
                  >
                    <LogOut size={16} className="mr-2" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="rounded-2xl text-earth hover:text-forest hover:bg-sage">
                    로그인
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default" size="sm" className="rounded-2xl bg-forest hover:bg-forest-gradient shadow-nature">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
            {user ? (
              <>
                <div className="py-2 px-3 bg-sage/30 rounded-2xl border border-sand">
                  <p className="text-sm font-medium text-earth">{user.email?.split('@')[0]}</p>
                  <p className="text-xs text-moss">{user.email}</p>
                </div>
                <Button
                  onClick={async () => {
                    await fetch('/auth/signout', { method: 'POST' })
                    router.push('/login')
                    router.refresh()
                  }}
                  className="w-full rounded-2xl bg-destructive hover:bg-destructive/90 text-white shadow-nature"
                >
                  <LogOut size={16} className="mr-2" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button className="w-full rounded-2xl border-sand hover:bg-sage text-earth shadow-nature" variant="outline">
                    로그인
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button className="w-full rounded-2xl bg-forest hover:bg-forest-gradient shadow-nature" variant="default">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
