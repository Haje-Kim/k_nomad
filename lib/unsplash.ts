// Generate Unsplash image URL using search API
export function getUnsplashImage(imageKey: string): string {
  // Use Unsplash Source API for dynamic image loading
  const size = '800x600'
  return `https://source.unsplash.com/${size}/?${imageKey}`
}
