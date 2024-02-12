
<script setup>
import {UseCouponStore} from '@/stores/coupon'
const store = UseCouponStore()


</script>

<template>
  <p class="mt-5 font-bold border-t border-gray-300"> have you a cupon?</p>
  <div class="flex py-5 px-5">

    <input type="text"
    placeholder="add coupon"
    class="p-1 bg-white w-full border-gray-300"
    v-model="store.couponInput"
    />

    <button
    :disabled="store.isValidCoupon"
    @click="store.applayCoupon"
    class="p-3 bg-green-300 font-bold ml-4 disabled:bg-gray-400 disabled:opacity-30"
    type="button">
add
    </button>
  </div>
        <p class=" mb-5 text-center font-bold text-sm text-green-500 ">{{ store.couponValidationMessage }}</p>

</template>