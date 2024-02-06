<script setup>
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import { useSweatStore } from '@/stores/sweatshirt'
import ProductCardSweatShirt from '@/components/ProductCardSweatShirt.vue';
import ModalFilterSeatshirt from '@/components/Filtrer/ModalFiltrerSweetshirt.vue'

const useSweatshirt = useSweatStore()
const { filterSweatshirt, noResult } = storeToRefs(useSweatshirt)

</script>

<template>
  <main class=" lg:flex lg:h-screen lg:overflow-y-hidden">
      <div class=" lg:w-full lg:screen lg:overflow-y-scroll  pb-32 px-20">
          <div class=" mt-20 pt-10 overflow-x-scroll" >
            <ModalFilterSeatshirt class="mb-20" />
          </div>
      <p v-if="noResult" class="text-center text-4xl"> We don't have results with those filters</p>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <ProductCardSweatShirt v-for="product in filterSweatshirt" :key="product.id" :product="product" />
      </div>
    </div>
  </main>
</template>