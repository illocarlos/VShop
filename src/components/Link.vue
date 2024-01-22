
<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    to: {
        type: String
    }

})
</script>
<!-- componente que le pasamos la ruta por prop en relacion si queremos ir a la tienda o a admin hacemos un to reactivo pasandole el name 
y el slot se usa para indicar que hay en ese componente un texto al que le pasamos digamos que es una prop de html -->
<template>
  <RouterLink
  :to="{name:to}"
  class="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10">
<slot/>
  </RouterLink>
</template>