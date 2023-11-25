import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/income/new',
      name: 'newIncome',
      component: () => import('../views/NewIncomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/expense/new',
      name: 'newExpense',
      component: () => import('../views/NewExpenseView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/expense/edit/:id',
      name: 'editExpense',
      component: () => import('../views/EditExpenseView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/income/edit/:id',
      name: 'editIncome',
      component: () => import('../views/EditIncomeView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.user.isLogged && !to.meta.requiresAuth) {
    next('/')
  } else if (!authStore.user.isLogged && to.meta.requiresAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router
