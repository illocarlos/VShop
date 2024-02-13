import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useSneakerStore = defineStore('sneaker', () => {
    const filterArraySneakers = ref([])
    const db = useFirestore()
    const categories = [
        { id: 1, name: 'sneaker' },
        { id: 2, name: 'sunglasse' },
        { id: 3, name: 'sweatshirt' }
    ]
    // llamamos a firebase para recoger la collection de productos
    const allProducts = query(
        collection(db, 'sneaker')
    )

    const getAllProductSneakers = useCollection(allProducts)
    filterArraySneakers.value = getAllProductSneakers

    // creacion de productos
    async function createProduct(product) {
        await addDoc(collection(db, 'sneaker'), product)
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

    const filterPricesSneakers = (data) => {

        const { prices } = data
        const filterSneakers = getAllProductSneakers.value.filter((sneakers) => sneakers.price <= prices);

        filterArraySneakers.value = filterSneakers

    }


    const noResult = computed(() => filterArraySneakers.value.length === 0)

    const filterSneakers = computed(() => {

        return filterArraySneakers.value.length > 0 ?
            filterArraySneakers.value :
            getAllProductSneakers.value
    })
    return {
        createProduct,
        categoryOption,
        getAllProductSneakers,
        updateProduct,
        filterSneakers,
        filterPricesSneakers,
        noResult
    }
})