import type { ListQueryObject } from '@/models/common'
import type { ProductObject } from '@/models/products'
import { wQuery } from '../../utils/url'
import { usePublicApiFetch } from '../fetch'

export const useProductService = () => ({
  getProducts: (params: ListQueryObject) =>
    usePublicApiFetch<ProductObject>(wQuery('/products', params))
})
