import type { ListQueryObject } from '@/models/common'
import { omitBy } from 'lodash-unified'
import { joinURL, withQuery } from 'ufo'

export const wQuery = (url: string, query: ListQueryObject) => {
  Object.keys(query).forEach((key) => {
    if (typeof query[key]?.toISOString === 'function') query[key] = query[key].toISOString()
  })

  return withQuery(
    url,
    omitBy(query, (v) => v === '')
  )
}

export const formatURL = (base: string, endpoint: string) => {
  const _base = base.endsWith('/') ? base.replace(/.$/, '') : base
  const _endpoint = !endpoint.startsWith('/') ? `/${endpoint}` : endpoint

  return joinURL(_base, _endpoint)
}
