import { LocationType } from "./location-type"
import { PeriodType } from "./period-type"

export type PackageType = {
  id: string
  name: string
  price: number
  duration_id: string
  credit: number
  location_id: string
  created_at: string
  updated_at: string
  location: LocationType|null
  duration: PeriodType
}

