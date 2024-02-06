<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
import Buy from'@/components/Buy.vue'
</script>

<template>
  <header class="px-10 py-7 bg-black flex justify-between absolute top-0 w-full z-10">
  <Logo/>
  <nav class="flex flex-row justify-center items-center">
  <Buy class="mr-4"/>
  <!-- igual que en admi le pasamos una propr como to NO dinamico por que el dinamico esta en ese mismo componente  -->
<Link
to="admin">
    admin
</Link>
</nav>
  </header>
</template>