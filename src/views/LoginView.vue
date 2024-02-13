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

    console.log('----', email,'-----', password)
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
        <h4 class="text-2xl font-bold text-center">
      Log In
        </h4>
        <div v-if="useAuth.hasError" class="text-red-500 mt-4">{{ useAuth.errroMssg }}</div>
        <form @submit.prevent="submit" class="mt-8">
            <div class="mb-6">
                <label for="email" class="block text-sm font-bold mb-2">Email</label>
                <input id="email" type="email" v-model="email" class="w-full py-2 px-3 rounded border bg-brown-lighten-4">
                <div v-if="!isValidEmail(email)" class="text-red-500 text-sm mt-1">Ingrese un correo electrónico válido.
                </div>
            </div>
            <div class="mb-6">
                <label for="password" class="block text-sm font-bold mb-2">
                    Password </label>
                <input id="password" type="password" v-model="password"
                    class="w-full py-2 px-3 rounded border bg-brown-lighten-4">
                <div v-if="!password" class="text-red-500 text-sm mt-1">Ingrese una contraseña.</div>
            </div>
            <button type="submit" class="w-full py-3 bg-blue-grey-lighten-3 text-blue-800 font-bold rounded mt-6">
              Log in
            </button>
        </form>
    </div>
</template>


