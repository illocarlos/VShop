import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useStore = defineStore('store', () => {
    const items = ref([])

    function addItem(product) {
        items.value.push(product)
        console.log('---->', items.value)
    }

    return {
        addItem
    }

})