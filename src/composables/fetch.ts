import { ref } from 'vue'
import { formatURL } from '../utils/url'

export async function usePublicApiFetch<T>(endpoint: string, opts?: RequestInit) {
  const api_url = import.meta.env.VITE_URL_API
  const url = formatURL(api_url, endpoint)

  const result = ref<T | null>(null)
  const reload = async () => {
    const res = await fetch(url, opts)
    const data = await res.json()
    result.value = data
  }

  reload()
  return {
    result,
    reload
  }
}
