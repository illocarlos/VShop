import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useSweatStore = defineStore('sweatshirt', () => {

    const db = useFirestore()

    const categories = [
        { id: 1, name: 'sniker' },
        { id: 2, name: 'sunglase' },
        { id: 3, name: 'sweatshirt' }
    ]

    // llamamos a firebase para recoger la collection de productos
    const allProducts = query(
        collection(db, 'sweatshirt')
    )
    const getAllProductSweatshirt = useCollection(allProducts)

    // creacion de productos
    async function createProduct(product) {
        await addDoc(collection(db, 'sweatshirt'), product)
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
        getAllProductSweatshirt
    }
})