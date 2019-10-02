import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/dashboard.vue")
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
      path: "/profile/:numLicense",
      name: "profile",
      component: () => import("./views/Profile.vue")
    }
  ]
});
