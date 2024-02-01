<script setup>
import { reactive, computed,ref } from 'vue';
import Link from '@/components/Link.vue';
import { useRouter } from 'vue-router';
import useImages from '@/composable/useImageSnikers';
import { useSnikerStore } from '@/stores/snikers';

const { onFileChange, url, isImageUploader } = useImages();
const useProduct = useSnikerStore();
const router = useRouter();
const formData = reactive({
  name: '',
  images: [''],
  price: '',
  size: {},
    aviable: '', // Use ref for total property
  category: useProduct.categoryOption[0].label,
});

const submitHandler = async (data) => {

  const { images, ...values } = data;

  try {
    await useProduct.createProduct({
      ...values,
      images: url.value,
      aviable: aviable.value
    });
    router.push({ name: 'products' });
  } catch (error) {
    console.log(error);
  }
};

const availableSizes = Array.from({ length: 15 }, (_, index) => index + 36);
const aviable = computed(() => {
  return Object.values(formData.size).reduce((acc, curr) => acc + curr, 0);
});
formData.aviable = aviable;
</script>

<template>
  <div>
    <Link to="new-product">back</Link>
    <div class="flex justify-center shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="add Product" @submit="submitHandler">
          <FormKit
            type="text"
            label="name"
            name="name"
            placeholder="name of product"
            validation="required"
            :validation-messages="{ required: 'the name is required' }"
            v-model.trim="formData.name"
          />
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
          <FormKit
            type="number"
            label="price"
            name="price"
            placeholder="price of product"
            validation="required"
            :validation-messages="{ required: 'the price is required' }"
            min="1"
            v-model.number="formData.price"
          />

          <h1>Size</h1>
          <div class="flex flex-wrap">
            <div v-for="size in availableSizes" :key="size" class="w-1/5 p-2">
              <FormKit
              :name="`size${size}`"
                class="w-full h-full"
                :key="size"
                type="number"
                :placeholder="'size ' + size"
                min="0"
                validation="required"
                :validation-messages="{ required: 'the number is required' }"
                v-model.number="formData.size[size]"
              />
            </div>
          </div>
          <p>Total Size: {{ formData.aviable }}</p>
        </FormKit>
      </div>
    </div>
  </div>
</template>

