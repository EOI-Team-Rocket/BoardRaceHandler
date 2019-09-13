import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
    },
    {
      path: '/CRUD.events',
      name: 'CRUD.events',
      component: () => import(/* webpackChunkName: "CRUD.events" */ './views/CRUD.events.vue')  
    }
  ]
})
