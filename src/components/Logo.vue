<script setup>

</script>
<!-- componente que usaremos en varios lugares por eso lo reciclamos -->
<template>
  <div>
    <RouterLink
       :to="{name: 'shop'}">
    <h1 class="text-xl md:text-3xl font-black text-white">

        <span class="text-green-400">V</span>
        Shop
    </h1>
  </RouterLink>
    </div>
</template>