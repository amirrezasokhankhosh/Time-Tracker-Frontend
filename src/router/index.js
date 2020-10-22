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
    path: '/site/:site_id',
    name: 'Site',
    component: () => import('../components/Site/Site.vue')
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
    path: '/delete_user_restrict/:id',
    name: 'Delete_user_restrict',
    component: () => import('../components/Restrict/Delete_user_restrict.vue')
  },
  {
    path: '/delete_group_restrict/:id',
    name: 'Delete_group_restrict',
    component: () => import('../components/Restrict/Delete_group_restrict.vue')
  },
  {
    path: '/restricts',
    name: 'Restricts',
    component: () => import('../components/Restrict/Restricts.vue')
  },
  {
    path: '/unproductives',
    name: 'Unproductives',
    component: () => import('../components/Unproductive/Unproductives.vue')
  },
  {
    path: '/new_unproductive',
    name: 'New_unproductive',
    component: () => import('../components/Unproductive/New_unproductive.vue')
  },
  {
    path: '/productivities',
    name: 'Productivities',
    component: () => import('../components/Productivity/Productivities.vue')
  },
  {
    path: '/user_productivity/:user_id',
    name : 'User_productivity',
    component: () => import('../components/Productivity/User_productivity.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
