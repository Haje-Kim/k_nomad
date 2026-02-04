'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function CTASection() {
  const [email, setEmail] = useState('')

  return (
    <section className="py-16 lg:py-20 bg-terracotta-gradient text-cream">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold">
            🚀 지금 가입하고 나만의 도시를 찾아보세요
          </h2>
          <p className="text-lg text-cream/90">
            무료 가입으로 모든 도시의 정보와 리뷰에 접근할 수 있습니다
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-3xl">✓</div>
            <p className="font-semibold">무제한 정보</p>
            <p className="text-sm text-cream/80">모든 도시의 상세 정보 접근</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">✓</div>
            <p className="font-semibold">리뷰 작성</p>
            <p className="text-sm text-cream/80">당신의 경험을 공유하세요</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">✓</div>
            <p className="font-semibold">찜 목록</p>
            <p className="text-sm text-cream/80">관심 도시를 저장하세요</p>
          </div>
        </div>

        {/* Email Signup */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-cream/20 border-cream/40 text-cream placeholder:text-cream/60 h-12 rounded-3xl shadow-nature"
          />
          <Button className="bg-cream text-earth hover:bg-sand px-8 h-12 font-semibold rounded-3xl shadow-nature">
            가입
          </Button>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <p className="text-sm text-cream/80">또는 소셜 계정으로 가입</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="border-2 border-cream text-cream hover:bg-cream/10 rounded-2xl">
              🔗 카카오 가입
            </Button>
            <Button variant="outline" className="border-2 border-cream text-cream hover:bg-cream/10 rounded-2xl">
              🔗 네이버 가입
            </Button>
            <Button variant="outline" className="border-2 border-cream text-cream hover:bg-cream/10 rounded-2xl">
              🔗 구글 가입
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
