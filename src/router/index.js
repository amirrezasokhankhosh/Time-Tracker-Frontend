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
  },
  {
    path: '/times',
    name: 'Times',
    component: () => import('../components/Time/Times.vue')
  },
  {
    path: '/new_time',
    name: 'New_time',
    component: () => import('../components/Time/New_time.vue')
  },
  {
    path: '/restrict_group',
    name: 'Restrict_group',
    component: () => import('../components/Restrict/Restrict_group.vue')
  },
  {
    path: '/restrict_user',
    name: 'Restrict_user',
    component: () => import('../components/Restrict/Restrict_user.vue')
  },
  {
    path: '/restricts',
    name: 'Restricts',
    component: () => import('../components/Restrict/Restricts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
