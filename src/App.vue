<script setup>
import { RouterView } from 'vue-router'
import MainNav from '@/components/MainNav.vue';
import Foother from './components/Foother.vue';
import { onMounted, ref } from 'vue';

const isNavbarTransparent = ref(false);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const handleScroll = () => {
  isNavbarTransparent.value = window.scrollY > 50;
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

</script>

<template>
  <!-- usamos en el la parte mas superior el main y dentro introducimos routerview que con su ayuda abrimos el componente 
  que tenemos dentro en este caso es o admin IndexShopView lo usamos como componente principal -->
  <main>
    <MainNav    :class="!isNavbarTransparent ? 'navBar0' : 'navBaropac'"/>
    <RouterView/>
  </main>
  <Foother  class="   bottom-0 mt-40  md:mt-0 md:bottom-0" />
</template>
<style scoped>
.navBar0 {
  transition: background-color 0.3s ease-in-out;
  background-color: black;
}

.navBaropac {
  transition: background-color 0.3s ease-in-out;
  background-color: rgba(56, 54, 54, 0.736);
}
</style>
