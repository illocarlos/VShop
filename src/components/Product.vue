<script setup>
import {formatCurrency} from '@/helpers/formartPrice'
defineProps({
    product: {
        type:Object
    }
})
</script>

<template>
<li class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow">
    <img
    :src= "product.images[0]"
    :alt="product.name"
    class="h-24 w-24 ">
    <article>
          <p>{{ product.category}}</p>
        <h3>{{ product.name }}</h3>
<p>Price: {{ formatCurrency (product.price) }}</p>
    <p> Aviable: {{ product.aviable }}</p>
    </article>
</li>
</template>