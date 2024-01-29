<script setup>
import Link from '@/components/Link.vue';
import Product from'@/components/Product.vue'
import { useProductStore } from '@/stores/sunglasses'
const useProduct= useProductStore()
</script>

<template>
<Link 
to="new-product">
new product
</Link>
    <h1>productos</h1>
    <ul role="list"
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
    >
<Product
v-for="product in useProduct.getAllProduct "
:key="product.id"
:product="product"
/>
    </ul>
</template>@/stores/sunglasses