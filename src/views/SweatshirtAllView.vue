<script setup>
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import { useSweatStore } from '@/stores/sweatshirt'
import ProductCardSweatShirt from '@/components/ProductCardSweatShirt.vue';
const useSweatshirt = useSweatStore()
const { filterSweatshirt, noResult } = storeToRefs(useSweatshirt)

</script>

<template>
  <main class=" lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="mt-20 lg:w-4/5 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">
      <p v-if="noResult" class="text-center text-4xl"></p>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <ProductCardSweatShirt v-for="product in filterSweatshirt" :key="product.id" :product="product" />
      </div>
    </div>
    <aside class="mt-20 bg-white text-white lg:w-1/5 lg:screen lg:overflow-y-scroll ">
      <p class="mt-10">carritooooo aqui</p>
    </aside>
  </main>
</template>