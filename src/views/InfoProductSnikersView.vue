
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { formatCurrency } from '@/helpers/formartPrice'
import { generateDisabledHelper } from '@/helpers/formatSize';
import { useFirestore, useDocument } from 'vuefire'
import { useStore } from '@/stores/store'
import { ref, computed, reactive } from 'vue';

const Store = useStore()

const numPhoto = ref(false);
const selectedImage = ref(null);

const router = useRouter()
const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'snikers', route.params.id)
const sniker = useDocument(docRef)

const selectImage = (index) => {
  selectedImage.value = sniker.value.images[index];
  numPhoto.value = true;
};
const formData = reactive({
  id: '',
  name: '',
  price: '',
  category: '',
    images: '',
  size36: 0,
  size37: 0,
  size38: 0,
  size39: 0,
  size40: 0,
  size41: 0,
  size42: 0,
  size43: 0,
  size44: 0,
  size45: 0,
  size46: 0,
  size47: 0,
  size48: 0,
  size49: 0,
  size50: 0,
  total: 0,
    totalsize36: 0,
   totalsize37: 0,
   totalsize38: 0,
   totalsize39: 0,
   totalsize40: 0,
   totalsize41: 0,
   totalsize42: 0,
   totalsize43: 0,
   totalsize44: 0,
   totalsize45: 0,
   totalsize46: 0,
   totalsize47: 0,
   totalsize48: 0,
   totalsize49: 0,
   totalsize50: 0,
})

function $reset() {
  formData.id = '';
  formData.name = '';
  formData.price = '';
  formData.category = '';
  formData.images = '';
  formData.size36 = 0;
  formData.size37 = 0;
  formData.size38 = 0;
  formData.size39 = 0;
  formData.size40 = 0;
  formData.size41 = 0;
  formData.size42 = 0;
  formData.size43 = 0;
  formData.size44 = 0;
  formData.size45 = 0;
  formData.size46 = 0;
  formData.size47 = 0;
  formData.size48 = 0;
  formData.size49 = 0;
  formData.size50 = 0;
    formData.totalsize36 = 0;
  formData.totalsize37 = 0;
  formData.totalsize38 = 0;
  formData.totalsize39 = 0;
  formData.totalsize40 = 0;
  formData.totalsize41 = 0;
  formData.totalsize42 = 0;
  formData.totalsize43 = 0;
  formData.totalsize44 = 0;
  formData.totalsize45 = 0;
  formData.totalsize46 = 0;
  formData.totalsize47 = 0;
  formData.totalsize48 = 0;
  formData.totalsize49 = 0;
  formData.totalsize50 = 0;
  
}


const snikerBuy = computed(() => {
    formData.id = sniker.value?.id;
  formData.name = sniker.value?.name;
  formData.price = sniker.value?.price;
  formData.category = sniker.value?.category;
  formData.images = sniker.value?.images;
    formData.totalsize36 = sniker.value?.size36;
  formData.totalsize37 = sniker.value?.size37;
  formData.totalsize38 = sniker.value?.size38;
  formData.totalsize39 = sniker.value?.size39;
  formData.totalsize40 = sniker.value?.size40;
  formData.totalsize41 = sniker.value?.size41;
  formData.totalsize42 = sniker.value?.size42;
  formData.totalsize43 = sniker.value?.size43;
  formData.totalsize44 = sniker.value?.size44;
  formData.totalsize45 = sniker.value?.size45;
  formData.totalsize46 = sniker.value?.size46;
  formData.totalsize47 = sniker.value?.size47;
  formData.totalsize48 = sniker.value?.size48;
  formData.totalsize49 = sniker.value?.size49;
  formData.totalsize50 = sniker.value?.size50;
  formData.total =  formData.size36 +
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
  return formData;
})

const handleBuy = () => {
  
  // Validar que al menos uno de los valores sea superior a 0
  if (snikerBuy.value.total === 0) {
    
    return Store.errorSendMessage = 'You must enter at least an amount greater than 0';

  } else {
    Store.errorSendMessage = "";
    const product = { ...snikerBuy.value };
    Store.addItem(product);
    $reset()
      router.push({ name: 'Skiners' })
  }

}

const disabled36 = generateDisabledHelper(formData, '36');
const disabled37 = generateDisabledHelper(formData, '37');
const disabled38 = generateDisabledHelper(formData, '38');
const disabled39 = generateDisabledHelper(formData, '39');
const disabled40 = generateDisabledHelper(formData, '40');
const disabled41 = generateDisabledHelper(formData, '41');
const disabled42 = generateDisabledHelper(formData, '42');
const disabled43 = generateDisabledHelper(formData, '43');
const disabled44 = generateDisabledHelper(formData, '44');
const disabled45 = generateDisabledHelper(formData, '45');
const disabled46 = generateDisabledHelper(formData, '46');
const disabled47 = generateDisabledHelper(formData, '47');
const disabled48 = generateDisabledHelper(formData, '48');
const disabled49 = generateDisabledHelper(formData, '49');
const disabled50 = generateDisabledHelper(formData, '50');
</script>

<template>
  <div class="h-5/5 mt-40 lg:mb-40 lg:my-46   lg:flex ">

    <div class="flex flex-col-reverse h-6/6 lg:flex-row lg:ml-28 lg:w-4/6   ">

      <div class="w-full flex overflow-x-scroll lg:flex-col lg:w-1/5  ">
        <div  v-for="(image, index) in sniker?.images" :key="index">
          <img class="h-14 cursor-pointer lg:h-20" @click="selectImage(index)" :src="image" :alt="`photo num ${index}`">
        </div>
      </div>
      <div class="lg:flex  ">
        <img class="h-96 w-full bg-cover lg:h-30 lg:w-5/5 lg:h-5/5 containerImg " v-if="numPhoto" :src="selectedImage" />
        <img class="h-96 w-full bg-cover lg:h-30 lg:w-5/5 lg:h-5/5 containerImg" v-else :src="sniker?.images[0]" />
      </div>
    </div>
    <div class="lg:w-5/12 lg:ml-4">
    <article class="mt-10 flex flex-col justify-center items-center w-3/4 md:w-4/4 lg:w-6/6 lg:mt-0  ">
      <div class="md:flex md:flex-row md:justify-around md:w-full lg:flex lg:flex-col">
        <div>
          <p class="lg:text-2xl">{{ sniker?.category }}</p>
          <h1 class="text-xl uppercase md:text-4x lg:text-4xl">{{ sniker?.name }}</h1>
        </div>
        <div class="md:flex md:flex-col-reverse">
          <p class="my-2 text-xl text-green-500 font-extrabold md:text-4xl md:my-0 lg:text-7xl">{{ formatCurrency(sniker?.price) }}</p>
          <p class="mt-6 text-sm md:mt-0 lg:text-2xl">available {{ sniker?. aviable }} units</p>
        </div>
        
      </div>
    </article>
   
         <FormKit type="form"  @submit="handleBuy"   :value="formData" submit-label="Guardar Cambios"
          incomplete-message="Could not send, check messages"  :actions="false">
<div class="flex flex-nowrap flex-col mt-3 lg:w-8/12 text-center text-green-600 ">
<div class="flex flex-row gap-1">



  <FormKit type="number" label="36" name="size36" placeholder="0" step="0" min="0"
  v-model.number="formData.size36" 
  :disabled="disabled36"
  :style="{backgroundColor: disabled36 ? '#f4f4f4' : 'inherit',
  color: disabled36 ? '#ccc' : 'black'}"
  validation="required" />

  <FormKit type="number" label="37" name="size37" placeholder="0" step="0" min="0"
  v-model.number="formData.size37" 
    :disabled="disabled37"
          :style="{
            backgroundColor: disabled37 ? '#f4f4f4' : 'inherit',
            color: disabled37 ? '#ccc' : 'black'}"
  validation="required"/>   

  <FormKit type="number" label="38" name="size38" placeholder="0" step="0" min="0"
  v-model.number="formData.size38"
     :disabled="disabled38"
            :style="{
              backgroundColor: disabled38 ? '#f4f4f4' : 'inherit',
              color: disabled38 ? '#ccc' : 'black'}"
  validation="required" />

  <FormKit type="number" label="39" name="size39" placeholder="0" step="0" min="0"
  v-model.number="formData.size39"
      :disabled="disabled39"
            :style="{
              backgroundColor: disabled39 ? '#f4f4f4' : 'inherit',
              color: disabled39 ? '#ccc' : 'black'}"
  validation="required" />

  <FormKit type="number" label="40" name="size40" placeholder="0" step="0" min="0"
  v-model.number="formData.size40"
      :disabled="disabled40"
            :style="{
              backgroundColor: disabled40 ? '#f4f4f4' : 'inherit',
              color: disabled40 ? '#ccc' : 'black'  }"
  validation="required"/>
</div>
 <div class="flex flex-row gap-1">

   <FormKit type="number" label="41" name="size41" placeholder="0" step="0" min="0"
   v-model.number="formData.size41" 
       :disabled="disabled41"
            :style="{
              backgroundColor: disabled41 ? '#f4f4f4' : 'inherit',
              color: disabled41 ? '#ccc' : 'black'  }"
   validation="required"/>

   <FormKit type="number" label="42" name="size42" placeholder="0" step="0" min="0"
   v-model.number="formData.size42" 
        :disabled="disabled42"
            :style="{
              backgroundColor: disabled42 ? '#f4f4f4' : 'inherit',
              color: disabled42 ? '#ccc' : 'black' }"
   validation="required" />

   <FormKit type="number" label="43" name="size43" placeholder="0" step="0" min="0"
   v-model.number="formData.size43" 
       :disabled="disabled43"
            :style="{
              backgroundColor: disabled43 ? '#f4f4f4' : 'inherit',
              color: disabled43 ? '#ccc' : 'black'}"
   validation="required" />

   <FormKit type="number" label="44" name="size44" placeholder="0" step="0" min="0"
   v-model.number="formData.size44"
      :disabled="disabled44"
            :style="{
              backgroundColor: disabled44 ? '#f4f4f4' : 'inherit',
              color: disabled44 ? '#ccc' : 'black'
            }"
   validation="required" />

   <FormKit type="number" label="45" name="size45" placeholder="0" step="0" min="0"
   v-model.number="formData.size45" 
       :disabled="disabled45"
            :style="{
              backgroundColor: disabled45 ? '#f4f4f4' : 'inherit',
              color: disabled45 ? '#ccc' : 'black'}"
   validation="required" />
  </div>
    <div class="flex flex-row gap-1">

       <FormKit type="number" label="46" name="size46" placeholder="0" step="0" min="0"
      v-model.number="formData.size46"
        :disabled="disabled46"
            :style="{
              backgroundColor: disabled46 ? '#f4f4f4' : 'inherit',
              color: disabled46 ? '#ccc' : 'black'
            }"
      validation="required"
    />
      <FormKit type="number" label="47" name="size47" placeholder="0" step="0" min="0"
      v-model.number="formData.size47" 
         :disabled="disabled47"
            :style="{
              backgroundColor: disabled47 ? '#f4f4f4' : 'inherit',
              color: disabled47 ? '#ccc' : 'black'
            }"
      validation="required"/>     

      <FormKit type="number" label="48" name="size48" placeholder="0" step="0" min="0"
      v-model.number="formData.size48"
     :disabled="disabled48"
            :style="{
              backgroundColor: disabled48 ? '#f4f4f4' : 'inherit',
              color: disabled48 ? '#ccc' : 'black'
            }"
      validation="required" /> 

      <FormKit type="number" label="49" name="size49" placeholder="0" step="0" min="0"
      v-model.number="formData.size49"
     :disabled="disabled49"
            :style="{
              backgroundColor: disabled49 ? '#f4f4f4' : 'inherit',
              color: disabled49 ? '#ccc' : 'black'
            }"
      validation="required"  />

      <FormKit type="number" label="50" name="size50" placeholder="0" step="0" min="0"
      v-model.number="formData.size50"
          :disabled="disabled50"
            :style="{
              backgroundColor: disabled50 ? '#f4f4f4' : 'inherit',
              color: disabled50 ? '#ccc' : 'black'}"
      validation="required"/>
    </div>
  </div>
        <button type="submit" class="w-screen h-8 mt-8  lg:mt-8 lg:h-8  lg:w-8/12   "><span class="uppercase">buy</span></button>
               <div v-if="Store.errorSendMessage" class="mt-3 text-xs text-red-500">{{ Store.errorSendMessage }}</div>     
          </FormKit>
    
           </div>
    <div>
 
    </div>

  </div>
</template>
<style scoped>
.containerImg{
  height: 20rem;
}
.overflow-x-scroll {
  overflow-x: auto !important;
  white-space: nowrap !important;
  /* Evita que los elementos se desplacen a una nueva línea */
}

button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #183153;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
}

button:after {
  content: " ";
  width: 0%;
  height: 100%;
  background: #38c172;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

button:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

button span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  padding: 18px 25px;
  color: #fff;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.3em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}

button:hover span {
  color: #183153;
  animation: scaleUp 0.3s ease-in-out;
}

@media (min-width: 1300px) {
      .containerImg{
            height: 34rem;
      }
}
@media (min-width: 800px) and (max-width: 950px){
    .containerImg{
            height: 44rem !important;
      }
      button{
        height: 4rem;
        margin-bottom: 2rem;
      }
}

@keyframes scaleUp {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}
</style>








