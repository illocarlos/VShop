<script setup>
import { useFirestore,useFirebaseStorage } from "vuefire"
import {  doc, getDoc,deleteDoc } from 'firebase/firestore'
import { ref as storageRef,deleteObject } from "firebase/storage";
const db = useFirestore()
const storage = useFirebaseStorage()

defineProps({
    id: {
        type:String
    },
    category: {
        type:String
    }
})
async function deleted(id,category) {

    if (confirm('deleted product?')) {
        const docRef = doc(db, category, id)
        const docSnap = await getDoc(docRef)
        const {images} = docSnap.data()   
        const imagesRefArray = images.map(image => storageRef(storage, image))
      await Promise.all([
            deleteDoc(docRef),
            ...imagesRefArray.map(deleteObject)
        ])
    }

}
</script>

<template>
        <button @click="deleted(id, category)">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
        </svg>

            </button>
</template>