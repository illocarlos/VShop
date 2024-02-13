<script setup>
import { storeToRefs } from 'pinia'
import { useSunglassesStore } from '@/stores/sunglasses'
import ProductCardVue from '@/components/ProductCard.vue'
import ModalFiltrerSunglasses from '@/components/Filtrer/ModalFiltrerSunglasses.vue'
const useSunglasses = useSunglassesStore()
const{ filterSunglasses,noResult }= storeToRefs(useSunglasses)

</script>

<template>
     <main class="gap-5">
        <div class="lg:w-full  lg:overflow-y-scroll px-20 relative pb-28 ">
                <div class=" mt-20 top-0 pb-12  ">

          <ModalFiltrerSunglasses class="z-5" />
        </div>
    <p v-if="noResult" class="text-center text-4xl font-bold text-green-500"> We don't have results with those filters</p>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-5 mt-20">

<ProductCardVue
v-for="product in filterSunglasses"
:key="product.id"
:product="product"/>
</div>
</div>
</main>
</template>