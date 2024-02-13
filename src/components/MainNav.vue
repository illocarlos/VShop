<script setup>
import { onMounted, ref } from 'vue';
import Link from './LogoComponents/Link.vue';
import Logo from './LogoComponents/Logo.vue';
import Buy from '@/components/shopingComponent/Buy.vue'

</script>

<template>
  <header
  class="fixed px-10 py-4 flex justify-between  top-0 w-full z-10 ">
  <Logo/>
  <nav class="flex flex-row justify-center items-center">
  <Buy class="mr-4"/>
  <!-- igual que en admi le pasamos una propr como to NO dinamico por que el dinamico esta en ese mismo componente  -->

</nav>
  </header>
</template>

