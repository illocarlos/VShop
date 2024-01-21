<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
<Logo/>
<nav>
<Link
to="shop">
go to shop
</Link>
</nav>
  </header>
</template>