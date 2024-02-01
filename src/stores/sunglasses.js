import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useSunglassesStore = defineStore('products', () => {

    const db = useFirestore()

    const categories = [
        { id: 1, name: 'sniker' },
        { id: 2, name: 'sunglasses' },
        { id: 3, name: 'sweatshirt' }
    ]



    // llamamos a firebase para recoger la collection de productos
    const allProducts = query(
        collection(db, 'sunglasses')
    )
    const getAllProductSunglasses = useCollection(allProducts)

    // creacion de productos
    async function createProduct(product) {
        await addDoc(collection(db, 'sunglasses'), product)
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

    return {
        createProduct,
        categoryOption,
        getAllProductSunglasses,
        updateProduct
    }
})