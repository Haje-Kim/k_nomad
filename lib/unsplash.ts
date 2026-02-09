// City image mapping with reliable Unsplash photo IDs
const cityImages: Record<string, string> = {
  'jeju,beach,city': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
  'seogwipo,coast,korea': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'busan,haeundae,beach': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
  'gangneung,beach,korea': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
  'jeonju,hanok,korea': 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=800&h=600&fit=crop',
  'gyeongju,bulguksa,temples': 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
  'sokcho,seoraksan,beach': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'yeosu,night,korea': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
  'seoul,skyline,korea': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
  'incheon,airport,korea': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
}

// Get city image URL with fallback
export function getUnsplashImage(imageKey: string): string {
  return cityImages[imageKey] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
}
