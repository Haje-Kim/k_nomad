import { Review } from '@/types'

export const reviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: '김노마드',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    cityId: 'jeju-city',
    cityName: '제주시',
    rating: 5,
    content:
      '해변 카페에서 일하기 정말 좋습니다. 인터넷도 빠르고 물가도 합리적입니다. 추천합니다!',
    duration: '6개월',
    likes: 234,
    comments: 12,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'review-2',
    userId: 'user-2',
    userName: '박여행자',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    cityId: 'busan',
    cityName: '부산',
    rating: 4,
    content:
      '대도시 편의성과 해변의 조용함을 동시에 누릴 수 있습니다. 카페도 많고 좋습니다.',
    duration: '3개월',
    likes: 189,
    comments: 8,
    createdAt: new Date('2024-01-12'),
  },
  {
    id: 'review-3',
    userId: 'user-3',
    userName: '이프리랜서',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    cityId: 'jeonju',
    cityName: '전주',
    rating: 5,
    content:
      '한옥마을의 분위기가 정말 독특합니다. 비용도 저렴하고 문화가 풍부합니다. 강력 추천!',
    duration: '4개월',
    likes: 267,
    comments: 15,
    createdAt: new Date('2024-01-10'),
  },
]

export const stats = [
  { label: '30+ 도시', value: '30+' },
  { label: '500+ 리뷰', value: '500+' },
  { label: '평균 평점', value: '4.5', icon: '⭐' },
  { label: '방문자', value: '50K' },
]
