// helpers.js
import { computed } from 'vue';

export function generateDisabledHelper(formData, size) {
    return computed(() => {
        const selectedSize = formData[`size${size}`];
        const otherSizes = Object.keys(formData)
            .filter(key => key !== `size${size}`)
            .map(key => formData[key]);

        return otherSizes.some(size => size > 0);
    });
}