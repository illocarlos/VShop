<script setup>
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { formatCurrency } from '@/helpers/formartPrice'
import { useFirestore, useDocument } from 'vuefire'
import Spiners from '@/components/Spiners.vue'
import { useStore } from '@/stores/store'
import { computed, ref } from 'vue';

const Store = useStore()


const numPhoto = ref(false);
const selectedImage = ref(null);

const router = useRouter()
const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'sunglasses', route.params.id)
const sunglasses = useDocument(docRef)

const selectImage = (index) => {
  selectedImage.value = sunglasses.value.images[index];
  numPhoto.value = true;
};

const handleBuy = (product) => {
  Store.addItem(product)
      router.push({ name: 'Sunglasses' })
}

</script>

<template>
  <div class="h-5/5 mt-40 lg:mb-40 lg:my-46   lg:flex lg:gap-20 ">

    <div class="flex flex-col-reverse h-6/6 lg:flex-row lg:ml-28 lg:w-5/6 ">
   
      
      <div  class="w-full flex overflow-x-scroll lg:flex-col lg:w-1/5 ">
        <div  v-for="(image, index) in sunglasses?.images" :key="index">
          <img class="h-14 cursor-pointer lg:h-20" @click="selectImage(index)" :src="image" :alt="`photo num ${index}`">
        </div>
      </div>

      <div class="lg:flex ">
        <img class="h-96 w-full bg-cover lg:h-30 lg:w-4/5  containerImg " v-if="numPhoto" :src="selectedImage" />
        <img class="h-96 w-full bg-cover lg:h-30 lg:w-4/5  containerImg" v-else :src="sunglasses?.images[0]" />
      </div>
    </div>
    <article class="mt-10 flex flex-col justify-center items-center w-3/4 md:w-4/4 lg:w-3/6  ">
      <div class="md:flex md:flex-row md:justify-around md:w-full lg:flex lg:flex-col">
        <div>
          <p class="lg:text-2xl">{{ sunglasses?.category }}</p>
          <h1 class="text-xl uppercase md:text-4x lg:text-4xl">{{ sunglasses?.name }}</h1>
        </div>
        <div class="md:flex md:flex-col-reverse">
          <p class="my-2 text-xl text-green-500 font-extrabold md:text-4xl md:my-0 lg:text-7xl">{{ formatCurrency(sunglasses?.price) }}</p>
          <p class="mt-6 text-sm md:mt-0 lg:text-2xl">available {{ sunglasses?. aviable }} units</p>
        </div>
        <div class="hidden lg:block  ">
          <button  :disabled="Store.aviable" @click="handleBuy(sunglasses)" class="mt-8 h-12 w-3/6   "><span class="uppercase">buy</span></button>
        </div>
      </div>
    </article>
    <div>
      
    </div>
    <div class=" lg:hidden">
      <button  :disabled="Store.aviable" @click="handleBuy(sunglasses)" class="mt-8 w-screen h-8  "><span class="uppercase">buy</span></button>
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
            height: 30rem;
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