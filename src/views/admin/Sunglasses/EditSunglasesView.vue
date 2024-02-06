<script setup>
import { watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import Link from '@/components/LogoComponents/Link.vue';
import { useSunglassesStore } from '@/stores/sunglasses';
import useImage from '@/composable/useImageSunglasses'

const { onFileChange, url, isImageUploader } = useImage()
const products = useSunglassesStore()

const router = useRouter()
const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'sunglasses', route.params.id)
const sunglasse = useDocument(docRef)

const formData = reactive({
    name: '',
    category: products.categoryOption[1].label,
    price: '',
    images: '',
    aviable: '',
  
})
const submitHandler = async data => {
    try {
        await products.updateProduct(docRef, {
            ...data,
            url,

        })
        router.push({ name: 'all-sunglasses' })
    } catch (error) {
        console.log(error)
    }
}
watch(sunglasse, (sunglasse) => {
    if (!sunglasse) {
        router.push({ name: 'all-sunglasses' });
    }
    // Actualiza la suma total cada vez que cambian los tamaños
    Object.assign((formData), sunglasse)
});
</script>

<template>
    <div class="mt-10">
        <Link to="products">
        Volver
        </Link>
        <h1 class="text-4xl my-10 font-extrabold">Editar Producto</h1>

        <div class="flex justify-center bg-white shadow">
            <div class="mx-auto mt-10 p-10 w-full  2xl:w-2/4">

                <FormKit type="form" :value="formData" submit-label="Guardar Cambios"
                    incomplete-message="No se pudo enviar, revisa los mensajes" @submit="submitHandler" :actions="false">
                    <FormKit type="text" label="Name" name="name" placeholder="Nombre de Producto" validation="required"
                        v-model.trim="formData.name"
                        :validation-messages="{ required: 'El Nombre del Producto es Obligatorio' }" />

                    <FormKit type="number" label="price" name="price" placeholder="Price of product" step="1" min="1"
                        v-model.number="formData.price" />

                    <FormKit type="number" label="aviable" name="aviable" placeholder="aviable"
                        v-model.number="formData.aviable" step="1" min="0" />

                   <div v-if="isImageUploader">
              <div v-for="(image, index) in url" :key="index" class="w-1/4 p-2">
                    <img class="w-full h-full" :src="image" alt="">
                  </div>
              </div>
              <div class="flex flex-wrap"  v-else>
                  <div  v-for="(image, index) in formData.images" :key="index" class="w-1/4 p-2">
                    <img class=" w-full h-full" :src="image" alt="">
                  </div>
              </div>
              <FormKit type="file" label="change images" name="images" multiple="true" accept=".jpg"
                @change="onFileChange" />
                    <FormKit type="submit">Save</FormKit>

                </FormKit>
            </div>
        </div>
    </div>
</template>