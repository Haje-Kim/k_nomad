'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validate password match
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      setLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-gradient px-4 py-12">
        <Card className="w-full max-w-md shadow-nature-lg rounded-3xl border-sand">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold text-forest text-center">이메일을 확인하세요</CardTitle>
            <CardDescription className="text-earth text-center">
              회원가입이 거의 완료되었습니다!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-sage/30 rounded-2xl border border-sand">
              <p className="text-sm text-earth">
                <strong className="text-forest">{email}</strong>로 확인 이메일을 발송했습니다.
              </p>
              <p className="text-sm text-earth mt-2">
                이메일의 링크를 클릭하여 계정을 활성화해주세요.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-forest-gradient text-white rounded-2xl py-6 hover:opacity-90 transition-opacity shadow-nature"
            >
              로그인 페이지로 이동
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-nature-gradient px-4 py-12">
      <Card className="w-full max-w-md shadow-nature-lg rounded-3xl border-sand">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-forest">회원가입</CardTitle>
          <CardDescription className="text-earth">
            이메일로 가입하여 K.NOMAD를 시작하세요
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
              <p className="text-xs text-moss">
                최소 6자 이상 입력해주세요
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-earth font-medium">
                비밀번호 확인
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? '가입 중...' : '회원가입'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-earth text-center">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-medium text-forest hover:text-moss transition-colors">
              로그인
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
