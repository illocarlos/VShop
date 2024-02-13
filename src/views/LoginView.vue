<script setup>
import { useAuthStore } from '@/stores/auth'

const useAuth = useAuthStore()

let email = ''
let password = ''

const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const submit = () => {

    if (!email || !password || !isValidEmail(email)) {
        // Manejar errores de validación aquí
        return
    }

    // Lógica para iniciar sesión
    useAuth.login({ email, password })
}
</script>
<template>
    <div class="max-w-xl h-screen mx-auto mt-40">
   
        <form @submit.prevent="submit" class="mt-8">
            <div class="mb-6">
                <label for="email" class="block text-sm text-center uppercase text-green-500 font-extrabold mb-2">Email</label>
                <input id="email" type="email" v-model="email" class="w-full py-2 px-3 rounded border bg-brown-lighten-4">
            </div>
            <div class="mb-6">
                <label for="password" class="block text-center uppercase text-green-500 text-sm font-extrabold mb-2">
                    Password </label>
                <input id="password" type="password" v-model="password"
                    class="w-full py-2 px-3 rounded border bg-brown-lighten-4">
            </div>
            <button type="submit" class="w-full py-3 font-extrabold uppercase bg-blue-grey-lighten-3 bg-black text-white  rounded mt-6
            hover:bg-white hover:text-green-500 transition-all">
              Log in
            </button>    
            <div v-if="useAuth.hasError" class="text-red-500 text-center mt-4">{{ useAuth.errroMssg }}</div>
        </form>
    </div>
</template>


