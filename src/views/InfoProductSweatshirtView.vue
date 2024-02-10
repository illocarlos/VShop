<script setup>
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { formatCurrency } from '@/helpers/formartPrice'
import { useFirestore, useDocument } from 'vuefire'
import { useStore } from '@/stores/store'
import { ref, reactive, computed, watch } from 'vue';

const Store = useStore()

const numPhoto = ref(false);
const selectedImage = ref(null);

const router = useRouter()
const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'sweatshirt', route.params.id)
const sweatshirt  = useDocument(docRef)

const selectImage = (index) => {
  selectedImage.value = sweatshirt.value.images[index];
  numPhoto.value = true;
};

const formData = reactive({
  id: '',
  name: "",
  price: '',
  category: '',
images:'',
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  total: 0,
})
function $reset() {
  formData.id = '';
  formData.name = '';
  formData.price = '';
  formData.category = '';
  formData.images = '';
  formData.S = 0;
  formData.M = 0;
  formData.L = 0;
  formData.XL = 0;

}


const sweatshirtBuy = computed(() => {
    formData.id = sweatshirt.value?.id;
  formData.name = sweatshirt.value?.name;
  formData.price = sweatshirt.value?.price;
  formData.category = sweatshirt.value?.category;
    formData.images = sweatshirt.value?.images;
  formData.total = formData.S + formData.M + formData.L + formData.XL;
  return formData;
})

const handleBuy = () => {

  // Validar que al menos uno de los valores sea superior a 0
  if (sweatshirtBuy.value.total===0) {
    return Store.errorSendMessage = 'You must enter at least an amount greater than 0';
   
  } else {
    Store.errorSendMessage = "";
    const product = { ...sweatshirtBuy.value };
    Store.addItem(product);
    $reset()
    router.push({name:'SweatShirt'})
  }

}

const handleEmptyInputS = computed(() => {
    if (formData.S === '') {
    formData.S = 0;
    }  
})
const handleEmptyInputM = computed(() => {
  if (formData.M === '') {
    formData.M = 0;
  }
})
const handleEmptyInputL = computed(() => {
  if (formData.L === '') {
    formData.L = 0;
  }
})
const handleEmptyInputXL = computed(() => {
  if (formData.XL === '') {
    formData.XL = 0;
  }
})
</script>
<template>
  <div class="h-5/5 mt-40  lg:my-46 lg:mb-40 lg:flex containerAipad ">

    <div class="flex flex-col-reverse h-6/6 lg:flex-row lg:ml-28 lg:w-4/6">

      <div class="w-full flex overflow-x-scroll lg:flex-col lg:w-1/5 ">
        <div v-for="(image, index) in sweatshirt?.images" :key="index">
          <img class="h-14 cursor-pointer lg:h-20" @click="selectImage(index)" :src="image" :alt="`photo num ${index}`">
        </div>
      </div>

      <div class="lg:flex ">
        <img class="h-96  bg-cover w-full lg:h-30 lg:w-5/5 lg:h-5/5 containerImg" v-if="numPhoto" :src="selectedImage" />
        <img class="h-96  bg-cover w-full lg:h-30 lg:w-5/5 lg:h-5/5 containerImg" v-else :src="sweatshirt?.images[0]" />
      </div>
    </div>
    <article class="mt-10 flex flex-col justify-center items-center w-3/4 md:w-4/4 lg:w-2/6  ">
      <div class="md:flex md:flex-row md:justify-around md:w-full lg:flex lg:flex-col">
        <div>
          <p class="lg:text-2xl">{{ sweatshirt?.category }}</p>
          <h1 class="text-xl uppercase md:text-4x lg:text-4xl">{{ sweatshirt?.name }}</h1>
        </div>
        <div class="md:flex md:flex-col-reverse">
          <p class="my-2 text-xl text-green-500 font-extrabold md:text-4xl md:my-0 lg:text-7xl">{{
            formatCurrency(sweatshirt?.price) }}</p>
          <p class="mt-6 text-sm md:mt-0 lg:text-2xl">available {{ sweatshirt?.aviable }} units</p>
        </div>
        <div class="hidden lg:block ">

      <FormKit type="form" @submit="handleBuy" :value="formData" submit-label="save"
      incomplete-message="Could not send, check messages" :actions="false">
      <div class="flex flex-row w-3/5 text-center gap-2">

          <FormKit type="number" label="S" name="S" placeholder="0" step="1" min="0"
             v-model.number="formData.S"
             @input="handleEmptyInputS"
             :disabled="formData.M > 0 || formData.L > 0 || formData.XL > 0"
             :style="{
               backgroundColor: formData.M > 0 || formData.L > 0 || formData.XL > 0  ? '#f4f4f4' : 'inherit',
               color: formData.M > 0 || formData.L > 0 || formData.XL > 0 ? '#ccc' : 'inherit'
             }"/>

          <FormKit type="number" label="M" name="M" placeholder="0" step="0" min="0"
              v-model.number="formData.M"
                 @input="handleEmptyInputM"
              :disabled="formData.S !== 0 || formData.L !== 0 || formData.XL !== 0"
              :style="{
                backgroundColor: formData.S !== 0 || formData.L !== 0 || formData.XL !== 0 ? '#f4f4f4' : 'inherit',
                color: formData.S !== 0 || formData.L !== 0 || formData.XL !== 0 ? '#ccc' : 'inherit'
              }" />
          <FormKit type="number" label="L" name="L" placeholder="0" step="0" min="0"
              v-model.number="formData.L"
                 @input="handleEmptyInputL"
              :disabled="formData.S !== 0 || formData.M !== 0 || formData.XL !== 0"
              :style="{
                backgroundColor: formData.S !== 0 || formData.M !== 0 || formData.XL !== 0 ? '#f4f4f4' : 'inherit',
                color: formData.S !== 0 || formData.M !== 0 || formData.XL !== 0 ? '#ccc' : 'inherit'
              }" />
          <FormKit type="number" label="XL" name="XL" placeholder="0" step="0" min="0"
              v-model.number="formData.XL"
                 @input="handleEmptyInputXL"
              :disabled="formData.S !== 0 || formData.M !== 0 || formData.L !== 0"
              :style="{
  backgroundColor: formData.S !== 0 || formData.M !== 0 || formData.L !== 0 ? '#f4f4f4' : 'inherit',
  color: formData.S !== 0 || formData.M !== 0 || formData.L !== 0 ? '#ccc' : 'inherit'}" />

      </div>



      <button type="submit" class="mt-8 h-12 w-3/6"><span class="uppercase">buy</span></button>
      <div v-if="Store.errorSendMessage" class="mt-3 text-xs text-red-500">{{ Store.errorSendMessage }}</div>
  </FormKit>

        </div>
      </div>
    </article>
    <div>

    </div>
    <div class=" lg:hidden ">
      
        <FormKit type="form" @submit="handleBuy" :value="formData" submit-label="save"
        incomplete-message="Could not send, check messages" :actions="false">
      <div class="flex flex-row justify-center text-center gap-5">

        
          <FormKit type="number" label="S" name="S" placeholder="0" step="1" min="0"
               v-model.number="formData.S"
               @input="handleEmptyInputS"
               :disabled="formData.M > 0 || formData.L > 0 || formData.XL > 0"
               :style="{
                 backgroundColor: formData.M > 0 || formData.L > 0 || formData.XL > 0 ? '#f4f4f4' : 'inherit',
                 color: formData.M > 0 || formData.L > 0 || formData.XL > 0 ? '#ccc' : 'inherit'
               }"/>

            <FormKit type="number" label="M" name="M" placeholder="0" step="0" min="0"
                v-model.number="formData.M"
                   @input="handleEmptyInputM"
                :disabled="formData.S !== 0 || formData.L !== 0 || formData.XL !== 0"
                :style="{
                  backgroundColor: formData.S !== 0 || formData.L !== 0 || formData.XL !== 0 ? '#f4f4f4' : 'inherit',
                  color: formData.S !== 0 || formData.L !== 0 || formData.XL !== 0 ? '#ccc' : 'inherit'
                }" />
            <FormKit type="number" label="L" name="L" placeholder="0" step="0" min="0"
                v-model.number="formData.L"
                   @input="handleEmptyInputL"
                :disabled="formData.S !== 0 || formData.M !== 0 || formData.XL !== 0"
                :style="{
                  backgroundColor: formData.S !== 0 || formData.M !== 0 || formData.XL !== 0 ? '#f4f4f4' : 'inherit',
                  color: formData.S !== 0 || formData.M !== 0 || formData.XL !== 0 ? '#ccc' : 'inherit'
                }" />
            <FormKit type="number" label="XL" name="XL" placeholder="0" step="0" min="0"
                v-model.number="formData.XL"
                   @input="handleEmptyInputXL"
                :disabled="formData.S !== 0 || formData.M !== 0 || formData.L !== 0"
                :style="{
                  backgroundColor: formData.S !== 0 || formData.M !== 0 || formData.L !== 0 ? '#f4f4f4' : 'inherit',
                  color: formData.S !== 0 || formData.M !== 0 || formData.L !== 0 ? '#ccc' : 'inherit'
}" />

      </div>



      <button type="submit" class="mt-8 w-screen h-8 mb-10"><span class="uppercase">buy</span></button>
      <div v-if="Store.errorSendMessage" class="mt-3 text-xs text-red-500">{{ Store.errorSendMessage }}</div>
  </FormKit>

    </div>
  </div>
</template>
<style scoped>
.containerImg{
  height: 20rem;
}
.overflow-x-scroll {
  overflow-x: auto;
  white-space: nowrap;
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








