export function getUnsplashImage(keyword: string, size: string = '800x600'): string {
  const encodedKeyword = encodeURIComponent(keyword)
  return `https://source.unsplash.com/${size}/?${encodedKeyword},korea,city`
}

export const cityImageMap: Record<string, string> = {
  'jeju,beach,city': getUnsplashImage('jeju,beach,korea'),
  'seogwipo,coast,korea': getUnsplashImage('seogwipo,coast,korea'),
  'busan,haeundae,beach': getUnsplashImage('busan,haeundae'),
  'gangneung,beach,korea': getUnsplashImage('gangneung,beach,korea'),
  'jeonju,hanok,korea': getUnsplashImage('jeonju,hanok'),
  'gyeongju,bulguksa,temples': getUnsplashImage('gyeongju,temple'),
  'sokcho,seoraksan,beach': getUnsplashImage('sokcho,seoraksan'),
  'yeosu,night,korea': getUnsplashImage('yeosu,night,korea'),
  'seoul,skyline,korea': getUnsplashImage('seoul,skyline'),
  'incheon,airport,korea': getUnsplashImage('incheon,korea'),
}
