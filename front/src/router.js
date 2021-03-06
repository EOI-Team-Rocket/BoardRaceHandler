import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import googleAuth from "./views/driveAuth.vue";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/googleAuth',
      name: 'googleAuth',
      component: googleAuth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard.vue')
    },
    {
      path: "/create",
      name: "Create",
      component: () => import("./views/Create.vue")
    },
    {
      path: "/eventpage/:id",
      name: "eventpage",
      component: () => import("./views/EventPage.vue")
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('./views/RegisterUser.vue')
    },

    {
      path: "/eventpage/:id",
      name: "eventpage",
      component: () => import("./views/EventPage.vue")
    },
    {
      path: "/profile/:numLicense",
      name: "profile",
      component: () => import("./views/Profile.vue")
    }
  ]
});
