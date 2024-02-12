<script setup>
import { watch, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import Link from '@/components/LogoComponents/Link.vue';
import { useSweatStore } from '@/stores/sweatshirt';
import useImage from '@/composable/useImageSweatshirt'


const { onFileChange, url, isImageUploaded } = useImage()
const products = useSweatStore()

const router = useRouter()
const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'sweatshirt', route.params.id)
const sweatshirt = useDocument(docRef)

const formData = reactive({
  name: '',
     category: products.categoryOption[2].label,
  price: '',
  images: '',
  S: '',
  M: '',
  L: '',
  XL: '',
  aviable: '',
})
const submitHandler = async data => {
  console.log('--------> dataaa', data)
  try {
    await products.updateProduct(docRef, {
      ...data,
      url,
      aviable: aviable.value  // Corregir aquí, eliminar '.value'
    })
    router.push({ name: 'all-sweatshirts' })
  } catch (error) {
    console.log(error)
  }
}
const aviable = computed(() => {
  return (
    formData.S +
    formData.M +
    formData.L +
    formData.XL 
  );
});
const sizeSweatshirts = ["S", "M", "L", "XL"];

watch(sweatshirt, (sweatshirt) => {
  if (!sweatshirt) {
    router.push({ name: 'all-sweatshirts' });
  }
   for (let i = 0; i <= sizeSweatshirts.length; i++) {
    const fieldName = sizeSweatshirts;
    formData[fieldName] = sweatshirt[fieldName] || 0;
  }
  // Actualiza la suma total cada vez que cambian los tamaños
  Object.assign((formData), sweatshirt)
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
            <img :src="formData.image" :alt="'Imagen de' + formData.image" class="w-52" />
          </div>
               <FormKit type="file" label="Cambiar Imagen" name="image" multiple="false" accept=".jpg"
              @change="onFileChange" />


                       <FormKit type="number" label="S" name="S" placeholder="S" step="1" min="1"
                  v-model.number="formData.S"
                  validation="required"
                  :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                     <FormKit type="number" label="M" name="M" placeholder="M" step="1" min="0"
                  v-model.number="formData.M"
                      validation="required"
     :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                     <FormKit type="number" label="L" name="L" placeholder="L" step="1" min="0"
                  v-model.number="formData.L"
                      validation="required"
     :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                      <FormKit type="number" label="XL" name="XL" placeholder="XL" step="1" min="0"
                    v-model.number="formData.XL"
                        validation="required"
       :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />

          <FormKit type="submit">Save</FormKit>

        </FormKit>
      </div>
    </div>
  </div>
</template>