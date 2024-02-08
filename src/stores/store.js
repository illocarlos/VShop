import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useStore = defineStore('store', () => {
    const itemShowCart = ref([])
    const errorSendMessage = ref("")

    function addItem(product) {
        if (product.category === 'snikers') {
            filterSneaker(product)
        } else if (product.category === 'sweatshirt') {
            filterSweatshirt(product)
        } else if (product.category === 'sunglasses') {
            filterSunglasses(product)
        }
        isEqualProduct()
    }

    function filterSneaker(product) {
        const arrayProduct = []
        arrayProduct.push(product)
        const productWithSizes = arrayProduct.reduce((result, product) => {

            Object.keys(product).forEach(key => {
                if (key.startsWith('size')) {
                    const sizeValue = product[key];
                    if (sizeValue) {
                        const newSizeObject = {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            images: product.images,
                            [key]: sizeValue,
                            size: key,
                            total: sizeValue
                        };
                        itemShowCart.value.push(newSizeObject);
                    }
                }
            });
            return result;
        }, []);

    }

    function filterSweatshirt(product) {
        const arrayProduct = []
        arrayProduct.push(product)
        const productWithSizes = arrayProduct.reduce((result, product) => {
            Object.keys(product).forEach(key => {
                if (key.startsWith('S') || key.startsWith('M') || key.startsWith('L') || key.startsWith('XL')) {
                    const sizeValue = product[key];
                    if (sizeValue) {
                        const newSizeObject = {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            images: product.images,
                            [key]: sizeValue,
                            size: key,
                            total: sizeValue
                        };
                        itemShowCart.value.push(newSizeObject);
                    }
                }
            });
            return result;
        }, []);
    }
    function filterSunglasses(product) {
        const arrayProduct = []
        arrayProduct.push(product)

        const productWithSizes = arrayProduct.filter((product) => {
            if (product) {
                const newSizeObject = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    images: product.images,
                    total: 1,
                };
                itemShowCart.value.push(newSizeObject);
            }
        });

    }


    // function isEqualProduct() {
    //     // const copyArrayItemsShowCart = [...itemShowCart.value]

    //     // console.log('------copia', copyArrayItemsShowCart)

    //     const arrcopyArrayItemsShowCartay = itemShowCart.value.findIndex(product => product.id === id)
    //     console.log('eeeeeee', arrcopyArrayItemsShowCartay)


    // }

    const isEmpty = computed(() => itemShowCart.value.length === 0)

    return {
        addItem,
        errorSendMessage,
        itemShowCart,
        isEmpty
    }

})