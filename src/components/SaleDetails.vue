<script setup>
    import { formatCurrency } from '@/helpers/formartPrice';
    import Amount from '@/components/shopingComponent/Amount.vue';

    defineProps({
        sale: {
            type: Object
        }
    })
</script>

<template>
    <div class="border-t border-gray-200 space-y-6 py-6">
        <h2 class="text-2xl font-black">Details sales:</h2>
        <p class="text-xl font-black text-gray-500">Products sales</p>

        <ul role="list" class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
            <li
                v-for="item in sale.itemsFilterCart"
                :key="item.id"
                class="flex space-x-6 py-6"
            >
                <img 
                    :src="item.images" 
                    :alt="'Imagen de ' + item.name"
                    class="h-24 w-24 flex-none rounded-lg"
                >

                <div class="flex-auto space-y-2">
                    <h3 class="text-gray-900"> {{ item.name }}</h3>
                    <p>{{ formatCurrency(item.price) }}</p>
                    <p>Count: {{ item.total }} </p>
                </div>
            </li>
        </ul>

        <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal:</template>
                {{ formatCurrency(sale.totalCart) }}
            </Amount>

            <Amount>
                <template #label>Impuestos:</template>
                {{ formatCurrency(sale.totalTaxes) }}
            </Amount>

            <Amount v-if="sale.discount" class="bg-green-200 p-2">
                <template #label>Descuento:</template>
                {{ formatCurrency(sale.discount) }}
            </Amount>
        
            <Amount>
                <template #label>Total Pagado:</template>
                {{ formatCurrency(sale.totalPay) }}
            </Amount>
        </dl>


    </div>
</template>

