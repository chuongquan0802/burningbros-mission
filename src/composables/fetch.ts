import { formatURL } from '../utils/url'

export async function usePublicApiFetch<T>(endpoint: string, opts?: RequestInit) {
  const api_url = import.meta.env.VITE_URL_API
  const url = formatURL(api_url, endpoint)

  try {
    const res = await fetch(url, opts)
    const data = await res.json()
    return data as T
  } catch (error) {
    console.log({ usePublicApiFetch: error })
  }
}
