<script setup>
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import { useSnikerStore } from '@/stores/snikers'
import ProductCardVue from '@/components/ProductCard.vue'
import ModalFilterPrices from '@/components/Filtrer/ModalFilterPrices.vue'
const useSneaker = useSnikerStore()
const { filterSneakers, noResult } = storeToRefs(useSneaker)

</script>

<template>
  <main class=" lg:flex lg:h-screen lg:overflow-y-hidden">
    
    <div class=" lg:w-full lg:h-screen lg:overflow-y-scroll  pb-32 px-20">
        <div class=" mt-20 pt-10 w-full overflow-x-scroll" >
          <ModalFilterPrices class="mb-20" />
        </div>
      <p v-if="noResult" class="mt-40 text-center text-4xl">We don't have results with those filters</p>
      <div v-else class="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-3 gap-5">
        <ProductCardVue v-for="product in filterSneakers" :key="product.id" :product="product" />
        </div>
      </div>
    
       

  </main>
</template>