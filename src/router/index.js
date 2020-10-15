import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/index',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Auth/Login.vue')
  },
  {
    path : '/logout',
    name : 'Logout',
    component : () => import('../components/Auth/Logout.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Auth/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  {
    path: '/sites',
    name: 'Sites',
    component: () => import('../components/Site/Sites.vue')
  },
  {
    path: '/new_site',
    name: 'New_site',
    component: () => import('../components/Site/New_site.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
