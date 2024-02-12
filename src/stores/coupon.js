import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useStore } from '@/stores/store'
export const UseCouponStore = defineStore('coupon', () => {
    const cart = useStore()


    const couponInput = ref("")
    const couponValidationMessage = ref("")
    const discountPorcentage = ref(0)
    const discount = ref(0)
    const VALID_COUPON = [
        {
            name: '10DISCOUNT', discount: .10
        },
        {
            name: '20DISCOUNT', discount: .20
        },
        {
            name: 'ELYOONDASO', discount: 1.0
        },
        {
            name: 'ANITALAMONGOLITA10', discount: .10
        }
    ]

    watch(discountPorcentage, () => {
        discount.value = (cart.totalPay * discountPorcentage.value).toFixed(2)
    }, {
        deep: true
    })


    function applayCoupon() {


        if (VALID_COUPON.some(coupon => coupon.name === couponInput.value)) {
            couponValidationMessage.value = "Applying..."

            setTimeout(() => {
                discountPorcentage.value = VALID_COUPON.find(descount => descount.name === couponInput.value).discount
                couponValidationMessage.value = "Discount applied!"
            }, 3000)

        } else {

            couponValidationMessage.value = "no exist this a coupon ( used 10DISCOUNT or 20DISCOUNT)"
        }
        setTimeout(() => {
            couponValidationMessage.value = ""
        }, 6000)

    }
    function $reset() {
        couponInput.value = ""
        couponValidationMessage.value = ""
        discountPorcentage.value = 0
        discount.value = 0
    }
    const isValidCoupon = computed(() => discountPorcentage.value > 0)


    return {
        applayCoupon,
        couponInput,
        discount,
        couponValidationMessage,
        discount,
        $reset,
        isValidCoupon
    }
})