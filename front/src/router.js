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
      component: () => import(/* webpackChunkName: "dashboard" */ './views/CRUDevents.vue')
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
      path: '/eventpage',
      name: 'eventpage',
      component: () => import('./views/EventPage.vue')
    }
  ]
})
