import { createRouter, createWebHistory } from 'vue-router'
import IndexShopView from '@/views/IndexShopView.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: IndexShopView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => AdminLayout,
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/admin/ProductsView.vue')
        }
      ]
    }
  ]
})

export default router
