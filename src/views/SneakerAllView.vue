
<script setup>
import { storeToRefs } from 'pinia'
import { useSneakerStore } from '@/stores/sneaker'
import ProductCardVue from '@/components/ProductCard.vue'
import ModalFilterPrices from '@/components/Filtrer/ModalFilterPrices.vue'

const useSneaker = useSneakerStore()
const { filterSneakers, noResult } = storeToRefs(useSneaker)
</script>

<template>
    <main class="lg:flex lg:h-screen lg:overflow-y-hidden">

        
        <div class="lg:w-full lg:h-screen lg:overflow-y-scroll px-20 relative pb-28 ">
            <div class=" mt-20 top-0 pb-7  ">
                <!-- ModalFilterPrices -->
                <ModalFilterPrices class="z-5" />
            </div>
         

            <p v-if="noResult" class="mt-40 text-center text-4xl font-bold text-green-500">We don't have results with those
                filters</p>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-5 mt-20">
                <!-- Product Cards -->
                <ProductCardVue v-for="product in filterSneakers" :key="product.id" :product="product" />
            </div>
        </div>
    </main>
</template>
