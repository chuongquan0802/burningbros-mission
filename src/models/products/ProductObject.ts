import type { BaseModel } from '../common'

export interface ProductObject extends BaseModel {
  brand?: string
  category?: string | number | null
  description?: string
  discountPercentage?: number
  images?: string[]
  price?: number
  rating?: number
  stock?: number
  thumbnail?: string
  title?: string
}

export interface SearchParamProductObject {
  q?: string
  skip: number
  limit: number
}
