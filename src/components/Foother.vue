<script setup>
import InstagramButtom from './ButtomComponents/InstagramButtom.vue';
import { storeToRefs } from 'pinia';
import FacebookButtom from './ButtomComponents/FacebookButtom.vue';
import TwitterButtom from'./ButtomComponents/TwitterButtom.vue'
import Logo from './LogoComponents/Logo.vue';
import { useAuthStore } from '@/stores/auth'

const useAuth = useAuthStore()
const { isAuth } = storeToRefs(useAuth)

</script>

<template>
    <div class="flex flex-row justify-around items-center w-screen h-24 lg:h-14  bg-black ">
        
        <div   class="flex justify-between w-44 lg:w-56">
              <RouterLink v-if="!isAuth"
              class="flex flex-col items-center"
        :to="{ name: 'login' }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
         <p class="text-green-700 text-xs hidden md:block">work space</p>
      </RouterLink>
<div v-else>
<button  @click="useAuth.logOut" class="text-white text-xs"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
    </button>
</div>


<article class="flex flex-row text-white text-center items-center justify-center">
 <span class=" text-xl md:text-xl font-black" >2024-</span><Logo />
</article>

        </div>
        <div class="  flex flex-row justify-between">
           <InstagramButtom/>
             <FacebookButtom class="ml-6" />
             <TwitterButtom class="ml-6"/>
        </div>
    </div>
</template>