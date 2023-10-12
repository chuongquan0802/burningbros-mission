import { formatURL } from '../utils/url'
import { URL_API } from '../assets/constaints/common'

export async function usePublicApiFetch<T>(endpoint: string, opts?: RequestInit) {
  const url = formatURL(URL_API, endpoint)

  try {
    const res = await fetch(url, opts)
    const data = await res.json()
    return data as T
  } catch (error) {
    console.log({ usePublicApiFetch: error })
  }
}
