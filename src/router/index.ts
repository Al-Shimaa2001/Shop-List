import { createRouter, createWebHistory } from 'vue-router'
import ShopList from '@/views/ShopList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShopList,
    },
  ],
})

export default router
