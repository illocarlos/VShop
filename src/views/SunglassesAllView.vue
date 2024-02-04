<script setup>
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import { useSunglassesStore } from '@/stores/sunglasses'
import ProductCardVue from '@/components/ProductCard.vue'
const useSunglasses = useSunglassesStore()
const{ filterSunglasses,noResult }= storeToRefs(useSunglasses)

</script>

<template>
<main class="mt-40 lg:flex lg:h-screen lg:overflow-y-hidden">
  <div class="lg:w-4/5 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">
<p v-if="noResult" class="text-center text-4xl"></p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">

<ProductCardVue
v-for="product in filterSunglasses"
:key="product.id"
:product="product"/>
</div>
</div>
<aside class="lg:w-1/5 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">
<p>carritooooo aqui</p>
</aside >
</main>
</template>