// Using specific Unsplash photo IDs for better image quality and consistency
export function getUnsplashImage(photoId: string, size: string = '800x600'): string {
  return `https://images.unsplash.com/photo-${photoId}?w=800&h=600&fit=crop`
}

export const cityImageMap: Record<string, string> = {
  // Jeju - Beautiful beach and nature scenes
  'jeju,beach,city': 'https://images.unsplash.com/photo-1599489505725-e9b1c9ca38eb?w=800&h=600&fit=crop',
  // Seogwipo - Coastal views
  'seogwipo,coast,korea': 'https://images.unsplash.com/photo-1598804192405-f26672e03aeb?w=800&h=600&fit=crop',
  // Busan - Haeundae Beach
  'busan,haeundae,beach': 'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?w=800&h=600&fit=crop',
  // Gangneung - Beach city
  'gangneung,beach,korea': 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop',
  // Jeonju - Traditional hanok village
  'jeonju,hanok,korea': 'https://images.unsplash.com/photo-1555217851-5ae6d3919cd8?w=800&h=600&fit=crop',
  // Gyeongju - Historic temples
  'gyeongju,bulguksa,temples': 'https://images.unsplash.com/photo-1626015077164-d0bcacabf7e7?w=800&h=600&fit=crop',
  // Sokcho - Mountain and beach
  'sokcho,seoraksan,beach': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
  // Yeosu - Night city views
  'yeosu,night,korea': 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800&h=600&fit=crop',
  // Seoul - Modern skyline
  'seoul,skyline,korea': 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800&h=600&fit=crop',
  // Incheon - Modern city
  'incheon,airport,korea': 'https://images.unsplash.com/photo-1537458671529-0d99b2d6f0e1?w=800&h=600&fit=crop',
}
