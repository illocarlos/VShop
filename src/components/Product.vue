<script setup>
import ButtomDeleted from './ButtomComponents/ButtomDeleted.vue';
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
    <article class="space-y-2 flex-auto">
          <p>{{ product.category}}</p>
        <h3>{{ product.name }}</h3>
<p class="font-extrabold">Price: {{ formatCurrency (product.price) }}</p>
    <p> Aviable: {{ product.aviable }}</p>
    </article>

       <RouterLink
         :to="{
             name:`edit-${product.category}`,
             params:{id:product.id} }">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
        </RouterLink>  
<ButtomDeleted
:id="product.id"
:category="product.category"
type="button"/>
</li>
</template>