import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useSweatStore = defineStore('sweatshirt', () => {
    const filterArraySweatshirt = ref([])
    const db = useFirestore()

    const categories = [
        { id: 1, name: 'snikers' },
        { id: 2, name: 'sunglase' },
        { id: 3, name: 'sweatshirt' }
    ]

    // llamamos a firebase para recoger la collection de productos
    const allProducts = query(
        collection(db, 'sweatshirt')
    )

    const getAllProductSweatshirt = useCollection(allProducts)
    filterArraySweatshirt.value = getAllProductSweatshirt

    // creacion de productos
    async function createProduct(product) {
        await addDoc(collection(db, 'sweatshirt'), product)
    }

    async function updateProduct(docRef, product) {
        const { images, url, ...values } = product

        if (images.length) {
            await updateDoc(docRef, {
                ...values,
                images: url.value
            })
        } else {
            await updateDoc(docRef, values)
        }
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
    const filterPricesSweatshirt = (data) => {

        const { prices } = data
        const filterSweatshirt = getAllProductSweatshirt.value.filter((sweatshirt) => sweatshirt.price <= prices);

        filterArraySweatshirt.value = filterSweatshirt

    }


    const noResult = computed(() => filterArraySweatshirt.value.length === 0)

    const filterSweatshirt = computed(() => {

        return filterArraySweatshirt.value.length > 0 ?
            filterArraySweatshirt.value :
            getAllProductSweatshirt.value
    })

    return {
        createProduct,
        categoryOption,
        getAllProductSweatshirt,
        updateProduct,
        filterSweatshirt,
        filterPricesSweatshirt,
        noResult
    }
})