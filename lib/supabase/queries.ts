import { createClient } from '@/lib/supabase/server'
import type { City } from '@/types'
import type { Tables } from '@/types/supabase'

type CityRow = Tables<'cities'>

function mapCity(row: CityRow): City {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    region: row.region as City['region'],
    image: row.image,
    totalScore: Number(row.total_score),
    environment: row.environment as City['environment'],
    bestSeason: row.best_season as City['bestSeason'],
    likes: row.likes,
    dislikes: row.dislikes,
    tags: row.tags,
    budget: row.budget as City['budget'],
  }
}

export async function getCities(): Promise<City[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('likes', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapCity)
}

export async function getCityById(id: string): Promise<City | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*, city_details(*), coworking_spots(*)')
    .eq('id', id)
    .single()

  if (error) return null

  const city = mapCity(data)

  if (data.city_details) {
    const detail = Array.isArray(data.city_details)
      ? data.city_details[0]
      : data.city_details

    if (detail) {
      city.detail = {
        description: detail.description ?? '',
        monthlyRent: detail.monthly_rent ?? '',
        internetSpeed: detail.internet_speed ?? '',
        transportation: detail.transportation ?? '',
        coworkingSpots: (data.coworking_spots ?? []).map(
          (spot: Tables<'coworking_spots'>) => ({
            name: spot.name,
            type: spot.type as '카페' | '코워킹',
            wifi: spot.wifi as '빠름' | '보통' | '느림',
            hasPlug: spot.has_plug,
            pricePerDay: spot.price_per_day,
            description: spot.description ?? '',
          })
        ),
      }
    }
  }

  return city
}
