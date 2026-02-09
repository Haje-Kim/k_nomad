'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-nature-gradient px-4 py-12">
      <Card className="w-full max-w-md shadow-nature-lg rounded-3xl border-sand">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-forest">로그인</CardTitle>
          <CardDescription className="text-earth">
            K.NOMAD에 오신 것을 환영합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-earth font-medium">
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl border-sand focus:border-forest focus:ring-forest"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-earth font-medium">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl border-sand focus:border-forest focus:ring-forest"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-2xl">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-forest-gradient text-white rounded-2xl py-6 hover:opacity-90 transition-opacity shadow-nature"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-earth text-center">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="font-medium text-forest hover:text-moss transition-colors">
              회원가입
            </Link>
          </p>
          <Link href="/" className="text-sm text-earth hover:text-forest transition-colors text-center">
            홈으로 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
