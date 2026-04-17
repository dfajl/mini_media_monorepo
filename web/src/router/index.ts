import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/features/auth/ui/LoginView.vue'
import AccountView from '@/features/account/ui/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
  ],
})

export default router
