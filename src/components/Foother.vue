<script setup>
import InstagramButtom from './InstagramButtom.vue';
import FacebookButtom from './FacebookButtom.vue';
import TwitterButtom from'./TwitterButtom.vue'
import Logo from './Logo.vue';

</script>

<template>
    <div class="flex flex-row justify-around items-center w-screen h-20 bg-black ">
        <div>
<article class="flex flex-row text-white text-center">
 <span class=" text-xl md:text-3xl font-black" >2024-</span><Logo />
</article>

        </div>
        <div class="  flex flex-row justify-between">
           <InstagramButtom/>
             <FacebookButtom class="ml-6" />
             <TwitterButtom class="ml-6"/>
        </div>
    </div>
</template>