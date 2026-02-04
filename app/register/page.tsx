'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    if (!agreeTerms) {
      alert('이용약관에 동의해주세요.')
      return
    }
    // TODO: Implement registration logic
    console.log('Register:', { name, email, password })
  }

  const handleSocialRegister = (provider: string) => {
    // TODO: Implement social registration
    console.log('Social register:', provider)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-nature-gradient px-4 py-12">
      <Card className="w-full max-w-md shadow-nature-lg rounded-3xl border-sand">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-forest">회원가입</CardTitle>
          <CardDescription className="text-earth">
            K.NOMAD와 함께 새로운 여정을 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-earth font-medium">
                이름
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border-sand focus:border-forest focus:ring-forest"
                required
              />
            </div>
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
              />
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
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="rounded border-sand data-[state=checked]:bg-forest data-[state=checked]:border-forest"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-earth cursor-pointer"
              >
                <Link href="/terms" className="hover:text-forest transition-colors">
                  이용약관
                </Link>
                {' '}및{' '}
                <Link href="/privacy" className="hover:text-forest transition-colors">
                  개인정보처리방침
                </Link>
                에 동의합니다
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-forest-gradient text-white rounded-2xl py-6 hover:opacity-90 transition-opacity shadow-nature"
            >
              회원가입
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-sand" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-cream px-4 text-earth">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister('google')}
                className="rounded-2xl border-sand hover:bg-sage hover:border-forest transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister('kakao')}
                className="rounded-2xl border-sand hover:bg-sage hover:border-forest transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"
                  />
                </svg>
                Kakao
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-earth">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-medium text-forest hover:text-moss transition-colors">
              로그인
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
