import { HomeClient } from '@/components/HomeClient'
import { getCities, getCityCount } from '@/lib/supabase/queries'

export default async function Home() {
  const [cities, cityCount] = await Promise.all([getCities(), getCityCount()])

  return <HomeClient cities={cities} cityCount={cityCount} />
}
