import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//icons
//Go to vue-ionicons/dist/ionicons-logo->line 68 -> to se real label to use them
import LogoIonicIcon from "vue-ionicons/dist/ionicons-logo";
Vue.use(LogoIonicIcon);
import IosIcon from "vue-ionicons/dist/ionicons-ios";
Vue.use(IosIcon);
import MdIcon from "vue-ionicons/dist/ionicons-md";
Vue.use(MdIcon);

Vue.use(BootstrapVue);


Vue.config.productionTip = false;

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA16s8asmvLWEVOtZeoYD_v_fM9HsyLMAw",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
