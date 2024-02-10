<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const isNavbarTransparent1 = ref(false);
const isNavbarTransparent2 = ref(false);
const isNavbarTransparent3 = ref(false);

const handleScroll1 = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    isNavbarTransparent1.value = scrollPercentage >= 0 && scrollPercentage < 20; // Cambia los valores de acuerdo a tus necesidades
};

const handleScroll2 = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    isNavbarTransparent2.value = scrollPercentage >= 25 && scrollPercentage < 50; // Cambia los valores de acuerdo a tus necesidades
};

const handleScroll3 = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    isNavbarTransparent3.value = scrollPercentage >= 55 && scrollPercentage < 100 // Cambia los valores de acuerdo a tus necesidades
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll1);
    window.addEventListener('scroll', handleScroll2);
      window.addEventListener('scroll', handleScroll3);
});
</script>

<template>
    <div class="flex flex-col justify-center items-center mt-40 lg:items-start   containerIndexShop">
        <RouterLink :to="{ name: 'Skiners' }" :class="{ 'card-scrolled': isNavbarTransparent1 }">
            <div class="card">
                <div class="bgOpacity">
                <div class="cardAll card1">
      <h1 class="cardName text-2xl font-extrabold text-stroke-1">Snikers</h1>
    </div>
                </div>
            </div>
        </RouterLink>

        <RouterLink :to="{ name: 'Sunglasses' }" :class="{ 'card-scrolled': isNavbarTransparent2 }" >
            <div class="card">
                     <div class="bgOpacity">
                <div class="cardAll card2">
                         <h1 class="cardName text-2xl font-extrabold">Sunglasses</h1>
                </div>
                </div>
            </div>
        </RouterLink>

        <RouterLink :to="{ name: 'SweatShirt' }" :class="{ 'card-scrolled': isNavbarTransparent3 } ">
            <div class="card">
                    <div class="bgOpacity">
                <div class="cardAll card3">
                                             <h1 class="cardName text-2xl  font-extrabold">SweatShirts</h1>

                </div>
                </div>
            </div>
        </RouterLink>

    </div>
</template>

<style  scoped>
.card {
    position: relative;
    width: 65vw;
    height: 35vh;
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    z-index: 3;
    border-radius: 20px;
    transition: all 0.3s;
}

.cardAll {
    position: relative;
    margin-top: 3rem;
    width: 65vw;
    height: 35vh;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 1;
    transition: all 0.3s;
}
.cardName {
text-transform: uppercase;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 1s;

}
.cardAll::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Cambiado a rgba con opacidad 0.5 */
    transition: opacity 0.3s;
    z-index: 2;
}
.card:hover .cardName {
    opacity: 1;
   color: #16e265;
      -webkit-text-stroke: 1.5px #16e265;


}
.cardAll:hover::before {
    opacity: 0;
}

.card1 {
    background-image: url(../assets/skeaners.webp);
}

.card2 {
    background-image: url(../assets/sunglasses.webp);
}

.card3 {
    background-image: url(../assets/sweatshirt.webp);
}

.bgOpacity {
    background-color: black;
}

.cardAll:hover {
    transform: scale(0.93);
    border-radius: 20px;
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
}

@media (max-width: 760px) {
    
 .card-scrolled .cardName {
    opacity: 1;
    color: #16e265;
    -webkit-text-stroke: 1.5px #16e265;
}

.card-scrolled .cardAll::before {
    opacity: 0;
}

.card-scrolled .cardAll:hover::before {
    opacity: 0;
    
}
}



@media (min-width: 766px)and (max-width: 930px) {
    
 .card-scrolled .cardName {
    opacity: 1;
     color: #16e265;
       -webkit-text-stroke: 1.5px #16e265;
}

.card-scrolled .cardAll::before {
    opacity: 0;
}

.card-scrolled .cardAll:hover::before {
    opacity: 0;
    
}
.containerIndexShop{
    margin-top: 1rem;
}
   .card {
        width: 50vw;
        height: 35vh;
    }

    .cardAll {
         width: 50vw;
        height: 35vh;
    }
}




@media (min-width: 950px) {
    .containerIndexShop{
        height: 60vh;
    }
    .cardName{
        font-size: 3rem;
    }
    .containerIndexShop{
       
       flex-flow: row nowrap;
      

    }
    .card {
        margin-left: 1rem;
        width: 32vw;
        height: 60vh;
    }

    .cardAll {
        width: 32vw;
        height: 60vh;
    }
}
</style>
