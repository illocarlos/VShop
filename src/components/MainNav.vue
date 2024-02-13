<script setup>
import { onMounted, ref } from 'vue';
import Link from './LogoComponents/Link.vue';
import Logo from './LogoComponents/Logo.vue';
import Buy from '@/components/shopingComponent/Buy.vue'

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
  <header
   :class=" !isNavbarTransparent?'navBar0':'navBaropac' "
  class="fixed px-10 py-4 flex justify-between  top-0 w-full z-10 ">
  <Logo/>
  <nav class="flex flex-row justify-center items-center">
  <Buy class="mr-4"/>
  <!-- igual que en admi le pasamos una propr como to NO dinamico por que el dinamico esta en ese mismo componente  -->

</nav>
  </header>
</template>

<style scoped>
.navBar0{
    transition: background-color 0.3s ease-in-out;
background-color:black ;
}
.navBaropac{
    transition: background-color 0.3s ease-in-out;
background-color:rgba(56, 54, 54, 0.736) ;
}

</style>