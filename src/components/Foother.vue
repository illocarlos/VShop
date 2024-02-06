<script setup>
import InstagramButtom from './ButtomComponents/InstagramButtom.vue';
import FacebookButtom from './ButtomComponents/FacebookButtom.vue';
import TwitterButtom from'./ButtomComponents/TwitterButtom.vue'
import Logo from './LogoComponents/Logo.vue';

</script>

<template>
    <div class="flex flex-row justify-around items-center w-screen h-24 lg:h-14  bg-black ">
        <div>
<article class="flex flex-row text-white text-center">
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