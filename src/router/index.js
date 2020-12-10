import Vue from 'vue'
import VueRouter from 'vue-router'
// import Profile from '@/views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Profile',
  //   component: Profile
  // },
  // {
  //   path: '/services',
  //   name: 'Services',
  //   component: () => import(/* webpackChunkName: "services" */ '@/views/Services.vue')
  // },
  // {
  //   path: '/info',
  //   name: 'Info',
  //   component: () => import(/* webpackChunkName: "info" */ '@/views/Info.vue')
  // },
  // { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
