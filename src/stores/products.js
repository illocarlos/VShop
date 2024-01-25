import NewSweatshirtsViewVue from "@/views/admin/NewSweatshirtsView.vue";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useProductStore = defineStore('products', () => {
    const categories = [
        { id: 1, name: 'snikers' },
        { id: 2, name: 'sunglases' },
        { id: 3, name: 'sweatshirt' }


    ]


    async function createProduct(product) {

    }

    const categoryOption = computed(() => {
        const options = [
            // { label: 'select category', value: "", attrs: { disabled: true } },
            ...categories.map(category => (
                { label: category.name, value: category.id }
            ))
        ]
        return options
    })

    return {
        createProduct,
        categoryOption
    }
})