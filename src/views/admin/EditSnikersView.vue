<script setup>
import { watch, reactive,ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import Link from '@/components/Link.vue';
import { useSnikerStore } from '@/stores/snikers';
import useImage from '@/composable/useImageSnikers'

const { onFileChange, url, isImageUploaded } = useImage()
const products = useSnikerStore()

const router = useRouter()
const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'snikers', route.params.id)
const sniker = useDocument(docRef)

const formData = reactive({
  name: '',
  price: '',
  images: '',
  size36:'',

});
watch(sniker, (sniker) => {
  if (!sniker) {
    router.push({name:'products'})
  }
  Object.assign((formData), sniker)
})

const submitHandler = async data => {
  try {
    console.log('--------> dataaa', data)
    await products.updateProduct(docRef, {...data,url})
    router.push({ name: 'products' })
  } catch(error) {
    console.log(error)
  }
}
console.log(formData)
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

          
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre de Producto" validation="required"
            v-model.trim="formData.name" :validation-messages="{ required: 'El Nombre del Producto es Obligatorio' }" />

          <FormKit type="number" label="Precio" name="price" placeholder="Precio de Producto" step="1" min="1"
            v-model.number="formData.price" />

          <div v-if="isImageUploaded">
            <p class="font-black">Imagen Nueva:</p>
            <img :src="url" alt="Nueva imagen Producto" class="w-52" />
          </div>

          <div v-else>
            <p class="font-black">Imagen Actual:</p>
            <img :src="formData.images" :alt="'Imagen de' + formData.images" class="w-52" />
          </div>
          <FormKit type="file" label="Cambiar Imagen" name="images" multiple="true" accept=".jpg"
            @change="onFileChange" />

  <h1>Size</h1>
   <FormKit type="number" label="Precio" name="size36" placeholder="Precio de Producto" step="1" min="1"
              v-model.number="formData.size36" />

  

          <FormKit type="submit">Guardar Cambios</FormKit>

        </FormKit>
      </div>
    </div>
  </div>
</template>