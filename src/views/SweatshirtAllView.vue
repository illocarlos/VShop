<script setup>
import { storeToRefs } from 'pinia'
import { useSweatStore } from '@/stores/sweatshirt'
import ProductCardSweatShirt from '@/components/ProductCardSweatShirt.vue';
import ModalFilterSeatshirt from '@/components/Filtrer/ModalFiltrerSweetshirt.vue'

const useSweatshirt = useSweatStore()
const { filterSweatshirt, noResult } = storeToRefs(useSweatshirt)

</script>

<template>
      <main class="gap-5">
      <div class="lg:w-full lg:h-screen lg:overflow-y-scroll px-20 relative pb-28 ">
              <div class=" mt-20 top-0 pb-12  ">
           <ModalFilterSeatshirt class="z-5" />
          </div>
      <p v-if="noResult" class="text-center text-4xl font-bold text-green-500"> We don't have results with those filters</p>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-5 mt-20">
        
        <ProductCardSweatShirt v-for="product in filterSweatshirt" :key="product.id" :product="product" />
      </div>
    </div>
  </main>
</template>