<script setup>

import{ formatCurrency }from '@/helpers/formartPrice'
import ButtonShop from './ButtomComponents/ButtomShop.vue'
import { ref } from 'vue';

defineProps({
    product: {
        type:Object
    }
})
const isDropdownCrad = ref(false);

const toggleisDropdownCrad = () => {
  console.log('entrooooo')
  if (window.innerWidth <= 767) { // Verifica si el ancho de la ventana es menor o igual a 767px (dispositivo móvil)
    isDropdownCrad.value = !isDropdownCrad.value; // Cambia el estado del desplegable solo en dispositivos móviles
  }
}

</script>

<template>

    <div class="relative group duration-500 cursor-pointer group overflow-hidden  text-gray-50 h-4/4 w-5/5 rounded-2xl hover:duration-700 md:w-11/12 ">
      <div class=" w-5/5  h-4/4  bg-black text-gray-800 md:w-11/12">
        <div class="flex flex-row-reverse justify-between"> 


          <button @click="toggleisDropdownCrad" >
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" stroke-current  w-9 h-7">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  </button>
    </div>

    <div class="w-6/6 h-4/4 aspect-w-4 aspect-h-3 overflow-hidden bg-cover" :style="{ backgroundImage: 'url(' + product.images[0] + ')' }">
      
      <div class="flex">
         <RouterLink
         :to="{
           name: `info-sweatshirt`,
           params: { id: product.id }
          }">
    <ButtonShop class="absolute top-12"/>
  </RouterLink> 
</div>
  </div>
      </div>
      <div class="absolute bg-gray-50 -bottom-8 w-full flex flex-col gap-2 group-hover:-bottom-0 group-hover:duration-600 duration-500   md:w-11/12 ">
             <h3 class="mb-0 text-sm font-black text-gray-500 text-center lg:text-xl">{{ product.name }}</h3>
             <div class="flex flex-row justify-around">
               <p class=" text-sm font-extrabold text-gray-900 md:text-xl lg:text-xl ">{{ product.aviable}} units</p>
               <p class=" font-extrabold text-gray-900 md:text-xl lg:text-xl ">{{ formatCurrency(product.price) }}</p>
              </div>
              
       
      </div>
    </div>
</template>
<style scoped>
.bg-cover {
    width:100%;
    height: 23rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
@media (min-width: 900px) {
      .bg-cover{
            height: 29rem;
      }
}

@media (min-width: 1500px) {
      .bg-cover{
            height: 45rem;
      }
}
@media (max-width: 767px) {
    .group:hover .group-hover\\:-bottom-0, .group:hover .group-hover\\:duration-600 {
        bottom: 0;
        transition-duration: 0.6s;
    }

    .group:hover .group-hover\\:-bottom-0.group-hover\\:duration-600 {
        transition-duration: 0.6s;
    }
}

</style>
