<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import Link from '@/components/LogoComponents/Link.vue';
import useImages from '@/composable/useImageSunglasses'
import { useSunglassesStore } from '@/stores/sunglasses'

const { onFileChange, url, isImageUploader } = useImages()
const useProduct = useSunglassesStore()
const router = useRouter()
const formData = reactive({
  name: '',
  images: [""],
  price: "",
  aviable:"",
  category: useProduct.categoryOption[1].label
})

const submitHanler = async data => {
  console.log(data)
  const { images, ...values } = data;

  try {
    
    await useProduct.createProduct({
      ...values,
      images: url.value
    });
    router.push({ name: 'products' })
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <Link to="new-product">
    back
    </Link>
    <div class="flex justify-center shadow">

      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="add Product" @submit="submitHanler">
          <FormKit type="text" label="name" name="name" placeholder="name of product" validation="required"
            :validation-messages="{ required: 'the name is required' }" v-model.trim="formData.name" />

               <FormKit
              type="text"
              label="category"
              name="category"
              v-model.trim="formData.category"
              :readonly="true"
              :disabled="true"
            />
        <FormKit
              type="file"
              label="Documents"
              name="images"
              placeholder="name of product"
              validation="required"
              :validation-messages="{ required: 'the photo is required' }"
              accept=".pdf, .jpg"
              multiple="true"
              @change="onFileChange"
              v-model.trim="formData.images"
            />
            <div class="flex flex-wrap" v-if="isImageUploader">
              <div v-for="(image, index) in url" :key="index" class="w-1/4 p-2">
                <img class="w-full h-full" :src="image" alt="">
              </div>
            </div>

          <FormKit type="number" label="price" name="price" placeholder="price of product" validation="required"
            :validation-messages="{ required: 'the price is required' }" min="1" v-model.number="formData.price" />

               <FormKit type="number" label="aviable" name="aviable" placeholder="aviable of product" validation="required"
              :validation-messages="{ required: 'the aviable is required' }" min="1" v-model.number="formData.aviable" />
        </FormKit>

      </div>
    </div>
  </div>
</template>