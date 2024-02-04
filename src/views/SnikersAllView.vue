<script setup>
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import { useSnikerStore } from '@/stores/snikers'
import ProductCardVue from '@/components/ProductCard.vue'
const useSneaker = useSnikerStore()
const { filterSneakers, noResult } = storeToRefs(useSneaker)

</script>

<template>
  <main class="mt-40 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="lg:w-4/5 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">
      <p v-if="noResult" class="text-center text-4xl"></p>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <ProductCardVue v-for="product in filterSneakers" :key="product.id" :product="product" />
      </div>
    </div>
    <aside class="lg:w-1/5 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">
      <p>carritooooo aqui</p>
    </aside>
  </main>
</template>