<script setup>
</script>

<template>
    <div class="svg-container">
     <a href="https://www.facebook.com" target="_blank" class="flex items-center space-x-3 hover:text-sky-400 transition">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="w-5" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                  </svg>
                                  <span class="hidden md:block " >Facebook</span>
                              </a>
                                </div>
    </template>
<style scoped>
/* Estilo por defecto */
.svg-container svg path {
  fill: white;

  /* Color por defecto */
  transition: fill 0.3s;
  /* Transición suave */
}

.svg-container span {
  color: white;

  /* Color por defecto */
  transition: color 0.3s;
  /* Transición suave */
}

/* Estilo al hacer hover */
.svg-container:hover span {

  color: rgb(109, 104, 252);
  /* Color al hacer hover */
}

.svg-container:hover svg path {
  fill: rgb(109, 104, 252);

  /* Color al hacer hover */
}
</style>