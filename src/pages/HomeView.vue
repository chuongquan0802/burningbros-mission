<template>
  <b-container class="h-[100vh]">
    <b-main>
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between">
          <h1 class="mx-4 text-2xl">Search product</h1>
          <b-input
            v-model="state.search"
            small
            clearable
            placeholder="Please input"
            suffix-class="is-button"
            input-class="fw-600 w-[300px]"
            class="!w-[300px]"
          >
            <template #suffix>
              <b-button primary :icon="Search" small />
            </template>
          </b-input>
        </div>
        <div
          ref="scrollNavigation"
          class="overflow-y-auto grow min-h-0 min-w-0 pr-1 scroll-custom mt-4"
          @scroll="handleInfiniteScroll"
        >
          <div class="mx-4">
            <b-row gutter="4">
              <b-col
                v-for="(item, idx) in stateFilter.searchResult.products"
                :key="idx"
                span="3"
                class="mt-4"
              >
                <b-card header-class="p-0 flex border-b-0 h-full">
                  <template #header>
                    <img class="h-[200px] w-full object-cover" :src="item.thumbnail" />
                  </template>

                  <div class="flex items-center justify-between h-full px-2">
                    <div>
                      <h4 class="font-600 text-xl truncate">{{ item.title }}</h4>
                      <p class="text-md c-neutral-6 h-[120px] overflow-hidden">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </b-card>
              </b-col>
            </b-row>
            <b-button
              v-if="stateFilter.loadingScroll"
              :loading="stateFilter.loadingScroll"
              large
              ghost
              class="w-full flex justify-center"
            ></b-button>
          </div>
        </div>
      </div>
    </b-main>
  </b-container>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { Search } from '@bigin/icons-vue'

import { useProductService } from '@/composables/services'
import { useFilter } from '@/composables/custom'
import type { ProductObject, SearchParamProductObject } from '@/models/products'

const defineSearchParams = {
  q: '',
  skip: 0,
  limit: 8
} as SearchParamProductObject

const productService = useProductService()
const state = reactive({
  search: null as any
})

const { stateFilter, initSearchParams, initFetchData, reloadData, handleInfiniteScroll } =
  useFilter<ProductObject, SearchParamProductObject>('products')

// state.t = await productService.getProducts({})

initSearchParams(defineSearchParams)
initFetchData(productService.getProducts)

onMounted(async () => {
  await reloadData()
})
</script>
