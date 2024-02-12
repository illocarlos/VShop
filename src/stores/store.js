import { defineStore } from 'pinia'
import { ref, computed, watchEffect, watch, Transition } from 'vue'
import { UseCouponStore } from './coupon'
import { collection, addDoc, doc, runTransaction } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { getCurrentDate } from '@/helpers/formateDate'

export const useStore = defineStore('store', () => {

    const coupon = UseCouponStore()
    const db = useFirestore()

    const itemShowCart = ref([])
    const objetFilter = ref({})
    const itemsFilterCart = ref([])
    const totalCart = ref(0)
    const totalTaxes = ref(0)
    const totalPay = ref(0)



    const TAX_RATE = .10

    watchEffect(() => {
        totalCart.value = itemsFilterCart.value.reduce((total, product) => total + (product.total * product.price), 0)
        totalTaxes.value = Number((totalCart.value * TAX_RATE).toFixed(2))
        totalPay.value = Number(((totalTaxes.value + totalCart.value) - coupon.discount).toFixed(2))
    })

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
                            category: product.category,
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
                            category: product.category,
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
                    category: product.category,
                    total: 1,
                    totalSizeInStore: product.aviable,

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

                    if (itemsFilterCart.value[i].total === itemsFilterCart.value[i].totalSizeInStore) {
                        // TODO aqui podemos crear una alerta personalizada
                        alert('limite alcanzado')
                        return itemsFilterCart.value[i].total = itemsFilterCart.value[i].totalSizeInStore
                    }
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


    async function checkout() {
        try {
            await addDoc(collection(db, 'sales'), {

                itemsFilterCart: itemsFilterCart.value.map(item => {
                    const { totalSizeInStore, ...data } = item
                    return data
                }),
                totalCart: totalCart.value,
                totalTaxes: totalTaxes.value,
                discount: coupon.discount,
                totalPay: totalPay.value,
                date: getCurrentDate(),
            })


            // Sustraer la cantidad de lo disponible ACID
            itemsFilterCart.value.forEach(async (item) => {

                if (item.category === "sunglasses") {
                    const productRef = doc(db, "sunglasses", item.id)
                    await runTransaction(db, async (transaction) => {
                        const currentProduct = await transaction.get(productRef)
                        console.log('currreeeeeeent', currentProduct)
                        const aviable = currentProduct.data().aviable - item.total
                        transaction.update(productRef, { aviable })
                    })
                } else if (item.category === "sweatshirt") {

                    const productRef = doc(db, "sweatshirt", item.id);
                    await runTransaction(db, async (transaction) => {
                        const currentProduct = await transaction.get(productRef);

                        // Aquí puedes manejar la lógica para restar la cantidad comprada del stock disponible
                        // Supongamos que tienes un objeto en la base de datos con las claves S, M, L, XL
                        // y quieres restar la cantidad comprada de la clave correspondiente
                        const sizeKey = item.size; // La talla del producto comprado
                        const availableSizeKey = sizeKey; // Clave en la base de datos correspondiente a la cantidad disponible para esta talla

                        // Verifica si la clave está presente en el objeto actual de la base de datos
                        if (currentProduct.data().hasOwnProperty(availableSizeKey)) {
                            // Resta la cantidad comprada de la cantidad disponible para la talla correspondiente
                            const available = currentProduct.data()[availableSizeKey] - item.total;
                            // Actualiza la cantidad disponible en la base de datos
                            transaction.update(productRef, { [availableSizeKey]: available });
                            const aviable = currentProduct.data().aviable - item.total
                            transaction.update(productRef, { aviable })

                        } else {
                            // Si la clave no está presente, maneja el caso según sea necesario
                            console.error(`key "${availableSizeKey}" don,t found in bbdd.`);
                            // Podrías lanzar una alerta, registrar un error, etc.
                        }
                    });
                } else if (item.category === "snikers") {

                    const productRef = doc(db, "snikers", item.id)
                    await runTransaction(db, async (transaction) => {
                        const currentProduct = await transaction.get(productRef)

                        const sizeKey = item.size;
                        const availableSizeKey = sizeKey

                        if (currentProduct.data().hasOwnProperty(availableSizeKey)) {
                            const available = currentProduct.data()[availableSizeKey] - item.total;
                            transaction.update(productRef, { [availableSizeKey]: available });
                            const aviable = currentProduct.data().aviable - item.total
                            transaction.update(productRef, { aviable })

                        } else {
                            // Si la clave no está presente, maneja el caso según sea necesario
                            console.error(`key "${availableSizeKey}" don,t found in bbdd.`);
                            // Podrías lanzar una alerta, registrar un error, etc.
                        }


                    })

                }


            })
            $reset()
            coupon.$reset()
        } catch (error) {
            console.log(error)
        }

    }

    function $reset() {
        itemsFilterCart.value = []
        totalCart.value = 0
        totalTaxes.value = 0
        totalPay.value = 0
    }

    function deleted(id, size) {
        itemsFilterCart.value = itemsFilterCart.value.filter(elem => !(elem.id === id && elem.size === size));



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
        itemsFilterCart,
        isEmpty,
        deletedAll,
        deleted,
        increment,
        decrement,
        totalCart,
        totalTaxes,
        totalPay,
        checkout,


    }

})