<script setup>
import { RouterLink } from 'vue-router';
import Link from './Link.vue';
import Logo from './Logo.vue';
</script>

<template>
  <header class="px-10 py-5 bg-black flex justify-between fixed top-0 w-full z-10">
<Logo/>
<nav>
  <RouterLink
  class="rounded text-white font-bold p-2"
  :to="{name:'products'}">
    Products
  </RouterLink>
    <RouterLink
    class="rounded text-white font-bold p-2"
    :to="{ name: 'sales' }">
      Sales
    </RouterLink>
      <RouterLink
      class="rounded text-white font-bold p-2"
      :to="{ name: 'new-product' }">
        new product
      </RouterLink>
      <!-- este componente crea un boton al que le pasas como prop el name de la ruta es una buena forma de  reciclar codigo -->
  <Link
to="shop">
go to shop
</Link>
</nav>
  </header>
</template>