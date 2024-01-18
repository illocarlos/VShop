import { createRouter, createWebHistory } from 'vue-router'
import IndexShopView from '@/views/IndexShopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexShopView
    },

  ]
})

export default router
