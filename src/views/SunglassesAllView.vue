<script setup>
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import { useSunglassesStore } from '@/stores/sunglasses'
import ProductCardVue from '@/components/ProductCard.vue'
import ModalFiltrerSunglasses from '@/components/Filtrer/ModalFiltrerSunglasses.vue'
const useSunglasses = useSunglassesStore()
const{ filterSunglasses,noResult }= storeToRefs(useSunglasses)

</script>

<template>
<main class=" lg:flex lg:h-screen lg:overflow-y-hidden">
  <div class=" lg:w-full lg:screen lg:overflow-y-scroll  pb-32 px-20">
            <div class=" mt-20 pt-10 overflow-x-scroll" >
              <ModalFiltrerSunglasses class="mb-20" />
            </div>
<p v-if="noResult" class="text-center text-4xl">We don't have results with those filters</p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">
<ProductCardVue
v-for="product in filterSunglasses"
:key="product.id"
:product="product"/>
</div>
</div>
</main>
</template>