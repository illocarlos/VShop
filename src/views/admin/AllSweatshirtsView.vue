<script setup>
import Product from '@/components/Product.vue'
import { useSweatStore } from '@/stores/sweatshirt'
const useProduct = useSweatStore()
</script>

<template>
  <ul role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
    <Product v-for="product in useProduct.getAllProductSweatshirt " :key="product.id" :product="product" />
  </ul>
</template>