import { createRouter, createWebHistory } from 'vue-router'
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
    // este componente se abrira cuando vayamos a esa ruta pero lo nombramos igual que el home por que es igual de importante 
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      // y estos son los hijos de admin que debemos estar en admi para ir a ellos 
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
          path: 'edit/sniker/:id',
          name: 'edit-sniker',
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

export default router
