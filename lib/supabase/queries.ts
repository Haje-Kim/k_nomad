import { createClient } from '@/lib/supabase/server'
import type { City } from '@/types'
import type { Tables } from '@/types/supabase'

type CityRow = Tables<'cities'>

function mapCity(row: CityRow, likes?: number, dislikes?: number): City {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    region: row.region as City['region'],
    image: row.image,
    totalScore: Number(row.total_score),
    environment: row.environment as City['environment'],
    bestSeason: row.best_season as City['bestSeason'],
    likes: likes ?? row.likes,
    dislikes: dislikes ?? row.dislikes,
    tags: row.tags,
    budget: row.budget as City['budget'],
  }
}

export async function getCities(): Promise<City[]> {
  const supabase = await createClient()

  const [{ data: citiesData, error }, { data: reactionsData }] = await Promise.all([
    supabase.from('cities').select('*'),
    supabase.from('user_city_reactions').select('city_id, reaction'),
  ])

  if (error) throw error

  const likesMap: Record<string, number> = {}
  const dislikesMap: Record<string, number> = {}
  for (const r of reactionsData ?? []) {
    if (r.reaction === 'like') {
      likesMap[r.city_id] = (likesMap[r.city_id] ?? 0) + 1
    } else if (r.reaction === 'dislike') {
      dislikesMap[r.city_id] = (dislikesMap[r.city_id] ?? 0) + 1
    }
  }

  return (citiesData ?? []).map(row => mapCity(row, likesMap[row.id] ?? 0, dislikesMap[row.id] ?? 0))
}

export async function getCityCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from('cities')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
}

export async function getCityById(id: string): Promise<City | null> {
  const supabase = await createClient()

  const [{ data, error }, { data: reactionsData }] = await Promise.all([
    supabase.from('cities').select('*, city_details(*), coworking_spots(*)').eq('id', id).single(),
    supabase.from('user_city_reactions').select('reaction').eq('city_id', id),
  ])

  if (error) return null

  const likes = (reactionsData ?? []).filter(r => r.reaction === 'like').length
  const dislikes = (reactionsData ?? []).filter(r => r.reaction === 'dislike').length
  const city = mapCity(data, likes, dislikes)

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
