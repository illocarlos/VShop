import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useStore = defineStore('store', () => {
    const itemShowCart = ref([])
    const itemsFilterCart = ref([])
    const totalCart = ref("")
    const objetFilter = ref({})
    const errorSendMessage = ref("")

    function addItem(product) {
        if (product.category === 'snikers') {
            filterSneaker(product)
        } else if (product.category === 'sweatshirt') {
            filterSweatshirt(product)
        } else if (product.category === 'sunglasses') {
            filterSunglasses(product)
        }
        isEqualProduct(product)
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
                            [key]: sizeValue,
                            size: key,
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            images: product.images,
                            total: sizeValue,
                            totalSizeInStore: product[`total${key}`],
                        };
                        console.log('----->', newSizeObject)
                        objetFilter.value = newSizeObject
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
                            [key]: sizeValue,
                            size: key,
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            images: product.images,
                            total: sizeValue,
                            totalSizeInStore: product[`total${key}`],
                        }
                        objetFilter.value = newSizeObject
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
                objetFilter.value = newSizeObject
                itemShowCart.value.push(newSizeObject);
            }
        });

    }

    function isEqualProduct() {
        const copyArrayItemsShowCart = [...itemShowCart.value];
        const newObjet = objetFilter.value;

        // Verificar si el array está vacío
        if (copyArrayItemsShowCart.length === 0) {
            // Si está vacío, simplemente agregamos newObjet al array
            itemsFilterCart.value.push(newObjet);
        } else {
            let found = false;

            // Verificar si existe un objeto con el mismo ID y tamaño
            for (let i = 0; i < itemsFilterCart.value.length; i++) {
                if (itemsFilterCart.value[i].id === newObjet.id && itemsFilterCart.value[i].size === newObjet.size) {
                    // Si se encuentra un objeto con el mismo ID y tamaño, sumar sus totales
                    itemsFilterCart.value[i].total += newObjet.total;
                    found = true;
                    break;
                }
            }

            // Si no se encontró un objeto que cumple con las condiciones, simplemente agregamos newObjet al array
            if (!found) {
                itemsFilterCart.value.push(newObjet);
            }
        }
    }

    function totalCartBuy() {
        let count = 0
        const prueba = itemsFilterCart.value.map(product => product.price * product.total)

        prueba.forEach(each => {
            count += each
        })
        return totalCart.value = count
    }
    function deleted(id, size) {
        itemsFilterCart.value = itemsFilterCart.value.filter(elem => !(elem.id === id && elem.size === size));

        console.log('sizeelem', itemsFilterCart.value);

        if (itemsFilterCart.value.length === 0) {
            itemsFilterCart.value.total = 0;
        }
    }

    const increment = (id, size, limitProductTotal) => {


        const index = itemsFilterCart.value.findIndex(product => product.id === id && product.size === size)
        itemsFilterCart.value[index].total >= limitProductTotal ? itemsFilterCart.value[index].total : itemsFilterCart.value[index].total++
        // incrementBuy()
    }

    const decrement = (id, size) => {
        const index = itemsFilterCart.value.findIndex(product => product.id === id && product.size === size)
        itemsFilterCart.value[index].total <= 1 ? itemsFilterCart.value[index].total : itemsFilterCart.value[index].total--

        // decrementBuy()
    }

    function deletedAll() { itemsFilterCart.value = [] }
    const isEmpty = computed(() => itemsFilterCart.value.length === 0)

    return {
        addItem,
        errorSendMessage,
        itemsFilterCart,
        isEmpty,
        deletedAll,
        totalCartBuy,
        deleted,
        increment,
        decrement
    }

})