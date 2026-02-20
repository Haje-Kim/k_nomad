import { HomeClient } from '@/components/HomeClient'
import { getCities } from '@/lib/supabase/queries'

export default async function Home() {
  const cities = await getCities()

  return <HomeClient cities={cities} />
}
