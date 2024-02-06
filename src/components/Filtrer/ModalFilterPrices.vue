<script setup>
import { useSnikerStore } from '@/stores/snikers';
import { ref } from 'vue';

const useProduct = useSnikerStore();
const faqs = ref([]); // Initialize faqs as a ref array
const pricesMax = ref(0)
 
const toggleAccordion = (index) => {
    if (faqs.value[index]) {
        faqs.value[index].open = !faqs.value[index].open;
    }
};
const submitHanler = data => {
    useProduct.filterPricesSneakers(data)
}
</script>

<template>
    <div
        class=" w-40 md:w-68 lg:w-48 border-2 border-black font-extrabold px-5">
    
                <details class="w-full group flex flex-row justify-between">
                    <summary @click="toggleAccordion(index)"
                        class=" w-full flex flex-row justify-between items-center font-medium cursor-pointer list-none py-2   text-center md:text-left">
                        <span >Prices Max</span>
                        <span class="md:transition md:group-open:rotate-180">
                            <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"
                                width="24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
    <FormKit type="form"  submit-label="Save"  @submit="submitHanler" >

        <FormKit type="range" name="prices" min="0" max="500"
        v-model.trim="pricesMax" class="w-full mt-4" />
        <p class="text-center">{{ pricesMax }}</p>
    </FormKit>
                </details>
            </div>
     

</template>


