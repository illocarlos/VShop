// helpers.js
import { computed, ref } from 'vue';

const disabled = ref(false); // Variable reactiva para controlar el estado de deshabilitado

export function generateDisabledHelper(formData, size) {

    return computed(() => {
        const selectedSize = formData[`size${size}`];
        const otherSizes = Object.keys(formData)
            .filter(key => key !== `size${size}`)
            .map(key => formData[key]);

        // Si disabled es verdadero, no deshabilitar el FormKit independientemente del valor del tamaño
        if (disabled.value) {
            return false;
        }

        // Si alguno de los otros tamaños es mayor que 0, deshabilitar el FormKit
        return otherSizes.some(size => size > 0);
    });

}

export function generateDisabledHelperSweatShirt(formData, size) {
    return computed(() => {
        const selectedSize = formData[size];
        const otherSizes = Object.keys(formData)
            .filter(key => key !== size)
            .map(key => formData[key]);

        // Si disabled es verdadero, no deshabilitar el FormKit independientemente del valor del tamaño
        if (disabled.value) {
            return false;
        }

        // Si alguno de los otros tamaños es mayor que 0, deshabilitar el FormKit
        return otherSizes.some(size => size > 0);
    });



}