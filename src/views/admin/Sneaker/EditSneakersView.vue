<script setup>
import { watch, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import Link from '@/components/LogoComponents/Link.vue';
import { useSneakerStore } from '@/stores/sneaker';
import useImage from '@/composable/useImageSnikers'

const { onFileChange, url, isImageUploaded } = useImage()
const products = useSneakerStore()

const router = useRouter()
const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'sneaker', route.params.id)
const sneaker = useDocument(docRef)

const formData = reactive({
  name: '',
  category: products.categoryOption[0].label,
  price: '',
  images: '',
  size36: '',
  size37: '',
  size38: '',
  size39: '',
  size40: '',
  size41: '',
  size42: '',
  size43: '',
  size44: '',
  size45: '',
  size46: '',
  size47: '',
  size48: '',
  size49: '',
  size50: '',
  aviable:'',
  
});
const submitHandler = async data => {
   console.log('--------> dataaa', data)
  try {
  
    await products.updateProduct(docRef, {
      ...data,
      url,
      aviable:  aviable.value
    })

    router.push({ name: 'all-sneakers' })
  } catch (error) {
    console.log(error)
  }
}
const aviable = computed(() => {
  return (
    formData.size36 +
    formData.size37 +
    formData.size38 +
    formData.size39 +
    formData.size40 +
    formData.size41 +
    formData.size42 +
    formData.size43 +
    formData.size44 +
    formData.size45 +
    formData.size46 +
    formData.size47 +
    formData.size48 +
    formData.size49 +
    formData.size50
  );
});
watch(sneaker, (sneaker) => {
  if (!sneaker) {
    router.push({ name: 'all-sneakers' });
  }
  // Actualiza los campos size y establece 0 si están vacíos
  for (let i = 36; i <= 50; i++) {
    const fieldName = `size${i}`;
    formData[fieldName] = sneaker[fieldName] || 0;
  }

  // Actualiza la suma total cada vez que cambian los tamaños
    Object.assign((formData), sneaker)
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
            v-model.trim="formData.name" :validation-messages="{ required: 'El Nombre del Producto es Obligatorio' }" />

          <FormKit type="number" label="Price" name="price" placeholder="Precio de Producto" step="1" min="1"
            v-model.number="formData.price"/>

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
  <div class="flex flex-wrap">
   <FormKit type="number" label="size 36" name="size36" placeholder="size 36" step="1" min="0"
              v-model.number="formData.size36" 
                         validation="required"
     :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"
              />
              <FormKit type="number" label="size 37" name="size37" placeholder="size 37" step="1" min="0"
                v-model.number="formData.size37" 
                validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                  
                <FormKit type="number" label="size 38" name="size38" placeholder="size 38" step="1" min="0"
                v-model.number="formData.size38"
                validation="required"
                :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 39" name="size39" placeholder="size 39" step="1" min="0"
                v-model.number="formData.size39"
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 40" name="size40" placeholder="size 40" step="1" min="0"
                v-model.number="formData.size40"
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 41" name="size41" placeholder="size 41" step="1" min="0"
                v-model.number="formData.size41" 
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 42" name="size42" placeholder="size 42" step="1" min="0"
                v-model.number="formData.size42" 
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 43" name="size43" placeholder="size 43" step="1" min="0"
                v-model.number="formData.size43" 
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 44" name="size44" placeholder="size 44" step="1" min="0"
                v-model.number="formData.size44"
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 45" name="size45" placeholder="size 45" step="1" min="0"
                v-model.number="formData.size45" 
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                <FormKit type="number" label="size 46" name="size46" placeholder="size 46" step="1" min="0"
                v-model.number="formData.size46"
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />                  
                <FormKit type="number" label="size 47" name="size47" placeholder="size 47" step="1" min="0"
                v-model.number="formData.size47" 
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />                  
                <FormKit type="number" label="size 48" name="size48" placeholder="size 48" step="1" min="0"
                v-model.number="formData.size48"
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />                  
                <FormKit type="number" label="size 49" name="size49" placeholder="size 49" step="1" min="0"
                v-model.number="formData.size49"
                    validation="required"
   :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                   <FormKit type="number" label="size 50" name="size50" placeholder="size 50" step="1" min="0"
                v-model.number="formData.size50"
                    validation="required"
                  :validation-messages="{ required: 'If you do not have quantity, enter 0|' }"  />
                
              </div>
          <FormKit type="submit">Saved</FormKit>

        </FormKit>
      </div>
    </div>
  </div>
</template>@/stores/sneaker