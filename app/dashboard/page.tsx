import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, Heart, MessageSquare, MapPin } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-nature-gradient py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-forest mb-2">대시보드</h1>
          <p className="text-earth">
            안녕하세요, <span className="font-semibold text-forest">{user.email?.split('@')[0]}</span>님!
          </p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 shadow-nature-lg rounded-3xl border-sand">
          <CardHeader>
            <CardTitle className="text-forest flex items-center gap-2">
              <LayoutDashboard size={24} />
              내 정보
            </CardTitle>
            <CardDescription className="text-earth">계정 정보 및 설정</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-sage/30 rounded-2xl border border-sand">
                <p className="text-sm text-moss font-medium mb-1">이메일</p>
                <p className="text-earth font-semibold">{user.email}</p>
              </div>
              <div className="p-4 bg-sage/30 rounded-2xl border border-sand">
                <p className="text-sm text-moss font-medium mb-1">계정 생성일</p>
                <p className="text-earth font-semibold">
                  {new Date(user.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-nature rounded-3xl border-sand hover:shadow-nature-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-forest flex items-center gap-2 text-lg">
                <Heart size={20} />
                저장한 도시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-earth">0</p>
              <p className="text-sm text-moss mt-1">아직 저장한 도시가 없습니다</p>
            </CardContent>
          </Card>

          <Card className="shadow-nature rounded-3xl border-sand hover:shadow-nature-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-forest flex items-center gap-2 text-lg">
                <MessageSquare size={20} />
                내 리뷰
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-earth">0</p>
              <p className="text-sm text-moss mt-1">첫 리뷰를 작성해보세요</p>
            </CardContent>
          </Card>

          <Card className="shadow-nature rounded-3xl border-sand hover:shadow-nature-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-forest flex items-center gap-2 text-lg">
                <MapPin size={20} />
                방문한 도시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-earth">0</p>
              <p className="text-sm text-moss mt-1">방문 기록을 추가해보세요</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-nature-lg rounded-3xl border-sand">
          <CardHeader>
            <CardTitle className="text-forest">빠른 시작</CardTitle>
            <CardDescription className="text-earth">K.NOMAD에서 할 수 있는 일들</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/#top-cities">
                <Button className="w-full justify-start rounded-2xl bg-sage hover:bg-sage/80 text-earth shadow-nature" variant="outline">
                  <MapPin size={20} className="mr-2" />
                  인기 도시 둘러보기
                </Button>
              </Link>
              <Link href="/#regions">
                <Button className="w-full justify-start rounded-2xl bg-sage hover:bg-sage/80 text-earth shadow-nature" variant="outline">
                  <LayoutDashboard size={20} className="mr-2" />
                  지역별 도시 탐색
                </Button>
              </Link>
            </div>
            <div className="p-4 bg-sage/20 rounded-2xl border border-sand">
              <p className="text-sm text-earth">
                💡 <strong className="text-forest">팁:</strong> 마음에 드는 도시를 발견하면 하트 버튼을 눌러 저장하세요!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
