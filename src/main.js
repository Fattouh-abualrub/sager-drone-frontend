import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
import VueEasytable from "vue-easytable";
Vue.use(VueEasytable);

import './assets/tailwind.css'
import "vue-toastification/dist/index.css";
import "vue-easytable/libs/theme-default/index.css";

Vue.config.productionTip = false

Vue.use(Toast, {});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loggedIn = localStorage.getItem("token");

  if (requiresAuth && !loggedIn) {
    store.state.token = "";
    next("/login");
  }
  else if (!requiresAuth && loggedIn) {
    next("/");
  }
   else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
