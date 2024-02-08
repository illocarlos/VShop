import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useSnikerStore = defineStore('snikers', () => {
    const filterArraySneaker = ref([])
    const db = useFirestore()
    const categories = [
        { id: 1, name: 'snikers' },
        { id: 2, name: 'sunglasse' },
        { id: 3, name: 'sweatshirt' }
    ]
    // llamamos a firebase para recoger la collection de productos
    const allProducts = query(
        collection(db, 'snikers')
    )

    const getAllProductSnikers = useCollection(allProducts)
    filterArraySneaker.value = getAllProductSnikers

    // creacion de productos
    async function createProduct(product) {
        await addDoc(collection(db, 'snikers'), product)
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
        const filterSneakers = getAllProductSnikers.value.filter((skeaner) => skeaner.price <= prices);

        filterArraySneaker.value = filterSneakers

    }


    const noResult = computed(() => filterArraySneaker.value.length === 0)

    const filterSneakers = computed(() => {

        return filterArraySneaker.value.length > 0 ?
            filterArraySneaker.value :
            getAllProductSnikers.value
    })
    return {
        createProduct,
        categoryOption,
        getAllProductSnikers,
        updateProduct,
        filterSneakers,
        filterPricesSneakers,
        noResult
    }
})