<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores/store';
import { formatCurrency } from '@/helpers/formartPrice';

const isOpen = ref(false);
const store = useStore();

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>
<template>
  <div class="relative">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" viewBox="0 0 24 24" stroke-width="1.5"
      class="carrito-icon " @click="toggleDropdown">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
    <transition  name="slide-down">
      <div  class="carrito-dropdown" :class="{ 'open': isOpen }">
        <!-- Contenido del dropdown -->
        <p class="text-green-500 text-center" v-if="store.isEmpty">The cart is empty</p>
        <div v-else>
          <table class="w-100 table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Unit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in store.itemShowCart" :key="product.id">
                <td>
                  <img class="product-image" :src='product.images[0]' :alt="product.name" />
                </td>
                <td class="text-xs">{{ product.name }}({{ product.size }})</td>
                <td class="text-xs">{{ formatCurrency(product.price) }}</td>
                <td class="flex align-items-start gap-4">
                  <button type="button" class="btn btn-dark" @click="$emit('decrement', product.id)">-</button>
                  {{ product.total }}
                  <button type="button" class="btn btn-dark" @click="$emit('increment', product.id)">+</button>
                </td>
                <td>
                  <button class="btn btn-danger" type="button" @click="$emit('deleted', product.id)">X</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="text-end m-0">Total cost: <span class="fw-bold">${{  }}</span></p>
          <button class="w-100">Clean cart</button>
          <button class="w-100 ">Buy</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
p {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: var(--bs-link-color);
  text-decoration: none;
}

a:hover {
  color: var(--bs-link-hover-color);
}

a:not([href]):not([class]),
a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}

.carrito-icon {
  cursor: pointer;
  width: 2.5rem;
}

.table {
  width: 100%;
  margin-bottom: 3rem;
  vertical-align: top;
}

.table> :not(caption)>*>* {
  padding: 0.5rem 0.5rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}

.table>tbody {
  vertical-align: inherit;
}

.table>thead {
  vertical-align: bottom;
}

.table {
  caption-side: bottom;
  border-collapse: collapse;
}

.table th {
  text-align: inherit;
  text-align: -webkit-match-parent;
}

.table thead,
tbody,
tr,
td,
th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

button {
  border-radius: 0;
}

.carrito-dropdown {
  position: absolute;
  top:-10rem;
  right: -3.2rem;
  background-color: white;
  padding: 10px;
  min-width: 350px;
  width: fit-content;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.7s ease;
  transform: translateY(-100%);
  z-index: 1000 !important;
}

.carrito-dropdown.open {
  transform: translateY(14rem);
}

.product-image {
  width: 100%;
}

.btn-danger {
  font-size: 10px;
  border-radius: 50%;
  padding: 5px 9px;
}

.btn-dark {
  padding: 0 5px;
  margin: 0 3px;
}
</style>
