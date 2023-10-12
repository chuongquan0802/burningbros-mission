import type { BaseListModel, BaseSearchModel } from '@/models/common'
import { BMessage } from 'bigin-ui'
import { cloneDeep } from 'lodash-unified'
import { computed, reactive, type UnwrapRef } from 'vue'

// Using in page
// init searchParams & fetchData

export const useFilter = <O, S extends BaseSearchModel>(key: string) => {
  // S type of Search Param
  // O type of Object
  const state = reactive({
    loadingSearch: false as boolean,
    loadingScroll: false as boolean,

    searchParams: {} as S,
    searchParamsCurrent: {} as S,
    currentPage: 1,
    fetchData: null as Function | null,
    noMore: false,
    searchResult: {
      entities: [],
      total: 0,
      skip: 0,
      limit: 0
    } as BaseListModel<O>
  })

  const disabled = computed(() => {
    const checkAvailable =
      state.searchParamsCurrent.skip + state.searchParamsCurrent.limit > state.searchResult.total
    console.log(state.searchResult.total)
    return state.loadingScroll || noMore.value || checkAvailable
  })

  const noMore = computed(() => {
    return (
      state.searchResult.total === state.searchResult[key].length &&
      state.searchParamsCurrent.skip !== 0
    )
  })

  const initSearchParams = (data: UnwrapRef<S>) => {
    state.searchParams = cloneDeep(data)
    state.searchParamsCurrent = cloneDeep(data)
  }

  const resetSearchParams = (data: UnwrapRef<S>) => {
    state.searchParams = cloneDeep(data)
    reloadData()
  }

  const initFetchData = (data: Function) => {
    state.fetchData = data
  }

  const reloadData = async (page = 1) => {
    try {
      state.loadingSearch = true
      state.searchParams.skip = state.searchParams.limit! * (page - 1)
      state.currentPage = page

      if (state.fetchData) state.searchResult = await state.fetchData(state.searchParams)
      state.searchParamsCurrent = cloneDeep(state.searchParams)
    } catch (error) {
      console.log({ reloadData: error })
      BMessage.error('Something went wrong!!!')
    } finally {
      state.loadingSearch = false
    }
  }

  // search
  const handleSearch = async () => {
    state.searchParams.q = state.searchParams.q?.trim() || ''

    if (state.searchParamsCurrent.q !== state.searchParams.q) await reloadData()
  }

  // paging
  const handleCurrentPageChange = (page: number) => {
    reloadData(page)
  }
  const handleSizeChange = (pageSize: number) => {
    state.searchParams.limit = pageSize
    reloadData()
  }

  const handleInfiniteScroll = async (e: any) => {
    if (disabled.value) return
    const { clientHeight, scrollHeight, scrollTop } = e.target
    try {
      if (Math.round(scrollTop) + clientHeight >= scrollHeight - 160) {
        state.loadingScroll = true
        state.searchParams.skip += state.searchParams.limit

        if (state.fetchData) {
          const res = await state.fetchData(state.searchParams)
          console.log(res)
          if (state.searchResult)
            state.searchResult[key] = [...state.searchResult[key], ...res[key]]
          state.searchParamsCurrent = cloneDeep(state.searchParams)
        }
      }
    } catch (error) {
      console.log({ handleInfiniteScroll: error })
      BMessage.error('Something went wrong!!!')
    } finally {
      state.loadingScroll = false
    }
  }

  return {
    stateFilter: state,
    noMore,
    initFetchData,
    initSearchParams,
    resetSearchParams,
    reloadData,
    handleSearch,
    handleCurrentPageChange,
    handleSizeChange,
    handleInfiniteScroll
  }
}
