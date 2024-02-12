
<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores/store';
import { formatCurrency } from '@/helpers/formartPrice';
import Amount from './Amount.vue';
import CouponForm from './CouponForm.vue';
import { UseCouponStore } from '@/stores/coupon';

const coupon = UseCouponStore();
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
    <transition name="slide-down">
      <div class="carrito-dropdown lg:min-w-80" :class="{ 'open': isOpen }">
        <!-- Contenido del dropdown -->
        <div class="flex flex-row justify-center " v-if="store.isEmpty">
          <p class="text-green-500 text-center mr-3"> The cart is empty</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
        <div v-else>


          <div class="h-96 overflow-y-auto">
            <div v-for="product in store.itemsFilterCart" :key="product.id">
              <div class="flex flex-row py-5">
                <div class="w-4/12 ">
                  <img class="product-image" :src="product.images[0]" :alt="product.name" />
                </div>
                <div class="flex flex-row items-center justify-between px-3  w-6/12">
                  <p class="text-xs gap-2">{{ product.name }} <span v-if="product.size">({{ product.size }})</span></p>
                  <p class="text-xs gap-2 font-extrabold">{{ formatCurrency(product.price) }}</p>
                </div>

                <div class="flex flex-row justify-around items-center   w-3/12">
                  
                  <button type="button"  @click="store.decrement(product.id, product.size)">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>


                  </button>
                 
                    <p class="text-xl"> {{ product.total }}</p>

                  <button type="button" 
                  @click="store.increment(product.id, product.size, product.totalSizeInStore)">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>


                </button>
                <button type="button" @click="store.deleted(product.id, product.size)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                  class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
                </div>
            </div>
          </div>
          </div>


          <dl class="space-y-3 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
              <template #label>Subtotal: </template>
              {{ formatCurrency(store.totalCart) }}
            </Amount>
            <Amount>
              <template #label>taxes: </template>
              {{ formatCurrency(store.totalTaxes) }}
            </Amount>
            <Amount v-if="coupon.isValidCoupon">
              <template #label>discount: </template>
              {{ formatCurrency(coupon.discount) }}
            </Amount>
            <Amount>
              <template #label>total: </template>
              {{ formatCurrency(store.totalPay) }}
            </Amount>
          </dl>
          <CouponForm />
          <div class="w-full">
            <button
              class="w-3/12 py-1 bg-red-400 text-black rounded-md text-xs hover:bg-red-800 hover:text-white hover:transition-all"
              @click="store.deletedAll()">Clean cart</button>
            <button
              class="w-8/12 ml-2 font-extrabold bg-green-500 rounded-md hover:bg-green-800 hover:text-white hover:transition-all hover:duration-300"
              @click="store.checkout">Buy</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>

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

.carrito-dropdown {
  position: absolute;
  top: -10.5rem;
  right: -3.2rem;
  background-color: white;
  padding: 10px;
  min-width: 23rem;
   min-height: 47.5rem;
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


</style>
