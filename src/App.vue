<script setup>
import {  RouterView } from 'vue-router'
</script>

<template>
  <!-- usamos en el la parte mas superior el main y dentro introducimos routerview que con su ayuda abrimos el componente 
  que tenemos dentro en este caso es o admin IndexShopView lo usamos como componente principal -->
  <main>
  <RouterView/>
  </main>
</template>
