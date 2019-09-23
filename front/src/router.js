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
      name: 'CRUDevents',
      component: () => import(/* webpackChunkName: "CRUD.events" */ './views/CRUD.events.vue')  
      name: 'Home',
      component: Home
    },
    {
      path: '/places',
      name: 'places',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Places.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/create',
      name: 'Create',
      component: () => import('./views/Create.vue')
    },
    {
      path: '/events/:name',
      name: 'events',
      component: () => import('./views/Events.vue')
    }
  ]
})
