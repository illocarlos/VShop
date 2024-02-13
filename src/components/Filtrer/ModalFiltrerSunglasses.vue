<script setup>
import { useSunglassesStore } from '@/stores/sunglasses';
import { ref } from 'vue';

const useProduct = useSunglassesStore();
const faqs = ref([]); // Initialize faqs as a ref array
const pricesMax = ref(0)

const toggleAccordion = (index) => {
    if (faqs.value[index]) {
        faqs.value[index].open = !faqs.value[index].open;
    }
};
const submitHandler = data => {
  useProduct.filterPricesSunglasses(data)
}
</script>

<template>
    <div class="relative">
           <div class="absolute top-0 px-1 left-0 text-xs w-32  lg:text-md md:w-68 lg:w-32  bg-white rounded-lg  border-black  ">
                <details class="group flex flex-row justify-between">
                <summary @click="toggleAccordion(index)"
                    class="flex flex-row justify-between items-center cursor-pointer list-none py-1 text-center md:text-left">
                    <span >Prices Max</span>
                    <span class="hidden lg:block transition group-open:rotate-180">
                        <svg class="sm:hiden " fill="none" height="14" shape-rendering="geometricPrecision" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24"
                            width="14">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <FormKit type="form" submit-label="Save" @submit="submitHandler">
                    <FormKit type="range" name="prices" min="0" max="500" v-model.trim="pricesMax" class="w-full mt-4" />
                    <p class="text-center">{{ pricesMax }}</p>
                </FormKit>
            </details>
        </div>
    </div>
</template>



<style scoped>
.relative {
    height: 20px;
    position: relative;
}

.absolute {

    border: solid  1px;
    position: absolute;
}

</style>
