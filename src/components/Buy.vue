<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <div class="relative">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" viewBox="0 0 24 24" stroke-width="1.5" class="carrito-icon " @click="toggleDropdown" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
        <div class="carrito-dropdown" v-if="isOpen">
            <!-- If there are no products -->
          
            <div>
                <table class="w-100 table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>price</th>
                            <th>unit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in buy" :key="product.id">
                            <td>
                                <img class="product-image" :src="'/img/' + product.images[0] + '.jpg'" :alt="product.name" />
                            </td>
                            <td>{{ product.name }}</td>
                            <td class="fw-bold">{{ product.prices }}</td>
                            <td class="flex align-items-start gap-4">
                                <button type="button" class="btn btn-dark" @click="$emit('decrement', product.id)">
                                    -
                                </button>
                                {{ product.count }}
                                <button type="button" class="btn btn-dark" @click="$emit('increment', product.id)">
                                    +
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger" type="button" @click="$emit('deleted', product.id)">
                                    X
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p class="text-end m-0">Total a pagar: <span class="fw-bold">${{ total }}</span></p>
                <button class="btn btn-dark w-100 mt-3 p-2" >
                    Vaciar Carrito
                </button>
                  <button class="btn btn-dark w-100 mt-3 p-2" >
                       Buy
                    </button>
            </div>
        </div>
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

a:not([href]):not([class]), a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}

.carrito-icon {
    cursor: pointer;
    width: 2.5rem;
}
.table {
  --bs-table-color: var(--bs-body-color);
  --bs-table-bg: transparent;
  --bs-table-border-color: var(--bs-border-color);
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: var(--bs-body-color);
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: var(--bs-body-color);
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: var(--bs-body-color);
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  margin-bottom: 1rem;
  color: var(--bs-table-color);
  vertical-align: top;
  border-color: var(--bs-table-border-color);
}
.table > :not(caption) > * > * {
  padding: 0.5rem 0.5rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
.table > tbody {
  vertical-align: inherit;
}
.table > thead {
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
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    padding: 10px;
    min-width: 350px;
    width: fit-content;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

 .carrito-dropdown {
    display: block;
}

.product-image {
    width: 30px;
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