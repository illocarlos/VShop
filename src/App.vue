<script setup>
import { RouterView } from 'vue-router'
import MainNav from '@/components/MainNav.vue';
import Foother from './components/Foother.vue';
</script>

<template>
  <!-- usamos en el la parte mas superior el main y dentro introducimos routerview que con su ayuda abrimos el componente 
  que tenemos dentro en este caso es o admin IndexShopView lo usamos como componente principal -->
  <MainNav/>
  <main>
    <RouterView/>
    <Foother  class="  bottom-0 mt-40  md:mt-0 md:bottom-0" />
  </main>
</template>
