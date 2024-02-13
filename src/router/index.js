
import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import IndexShopView from '@/views/IndexShopView.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ruta predeterminada que se abrira una vez abras la web es la home
    {
      path: '/',
      name: 'shop',
      component: IndexShopView
    },
    {
      path: '/Skiners',
      name: 'Skiners',
      component: () => import('@/views/SnikersAllView.vue')
    },
    {
      path: '/Sunglasses',
      name: 'Sunglasses',
      component: () => import('@/views/SunglassesAllView.vue')
    },
    {
      path: '/SweatShirt',
      name: 'SweatShirt',
      component: () => import('@/views/SweatshirtAllView.vue')
    },
    {
      path: '/info/sweatshirt/:id',
      name: 'info-sweatshirt',
      component: () => import('@/views/InfoProductSweatshirtView.vue')
    },
    {
      path: '/info/snikers/:id',
      name: 'info-snikers',
      component: () => import('@/views/InfoProductSnikersView.vue')
    },
    {
      path: '/info/sunglasses/:id',
      name: 'info-sunglasses',
      component: () => import('@/views/InfoProductSunglassesView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/admin/ProductsView.vue')
        },
        {
          path: 'sales',
          name: 'sales',
          component: () => import('@/views/admin/SalesView.vue')
        },
        {
          path: 'new-product',
          name: 'new-product',
          component: () => import('@/views/admin/NewProductView.vue'),
        },
        {
          path: 'new-product/snikers',
          name: 'new-product-snikers',
          component: () => import('@/views/admin/Skiners/NewSnikersView.vue'),
        },
        {
          path: 'new-product/sunglases',
          name: 'new-product-sunglases',
          component: () => import('@/views/admin/Sunglasses/NewSunglasesView.vue'),
        },
        {
          path: 'new-product/sweatshirts',
          name: 'new-product-sweatshirts',
          component: () => import('@/views/admin/Sweatshirts/NewSweatshirtsView.vue'),
        },
        {
          path: 'all/snikers',
          name: 'all-snikers',
          component: () => import('@/views/admin/Skiners/AllSnikersView.vue'),
        },
        {
          path: 'all/sunglasses',
          name: 'all-sunglasses',
          component: () => import('@/views/admin/Sunglasses/AllSunglasesView.vue'),
        }, {
          path: 'all/sweatshirts',
          name: 'all-sweatshirts',
          component: () => import('@/views/admin/Sweatshirts/AllSweatshirtsView.vue'),
        },
        {
          path: 'edit/snikers/:id',
          name: 'edit-snikers',
          component: () => import('@/views/admin/Skiners/EditSnikersView.vue'),
        },
        {
          path: 'edit/sunglasses/:id',
          name: 'edit-sunglasses',
          component: () => import('@/views/admin/Sunglasses/EditSunglasesView.vue'),
        },
        {
          path: 'edit/sweatshirt/:id',
          name: 'edit-sweatshirt',
          component: () => import('@/views/admin/Sweatshirts/EditSweatshirtView.vue'),
        },





      ]
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      await autenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  } else {
    next()
  }


});
function autenticateUser() {

  const auth = useFirebaseAuth()
  return new Promise((resolve, reject) => {
    const unSuscribe = onAuthStateChanged(auth, (user) => {
      unSuscribe()
      if (user) {
        resolve(user)
      } else {
        reject()
      }
    })
  })
}
export default router


