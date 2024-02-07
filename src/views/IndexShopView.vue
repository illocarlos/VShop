<script setup>
import IndexShopRouter from '@/components/IndexShopRouter.vue';

</script>
<!-- este es el view principal que abrira de forma predeterminada en la web por que asi lo decidimos
y junto a el la mainnav de forma secundaria tenemos el de amdin que se abrira de forma principal cuando se llame pero ya tendra una ruta  -->
<template>
      <IndexShopRouter class=" elementIndex"/>
</template>
<style scoped>

.elementIndex{
      height: 100vh;
}
@media (min-width: 767px) {
      .elementIndex{
            height: 140vh;
      }
}

@media (min-width: 1020px) {
      .elementIndex{
            height: 100vh;
      }
}
</style>
