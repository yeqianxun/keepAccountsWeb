import Vue from 'vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';

import App from './App.vue'
import store from "@/store/";
import routes from "@/router";
import Axios from "@/utils/http.js";
import vueSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'
import "@/style/index.scss";
import "@/assets/fonts/iconfont.css";

import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

Vue.config.productionTip = false;
Vue.prototype.$Axios = Axios;

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(vueSwiper);
let router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior: (to, from, savePosition) => {
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = window.sessionStorage.getItem("token");
  if (to.path == "/login") {
    token ? next("/") : next();
  } else {
    if (to.meta.requireAuth == true && !token) {
      next("/login")
    } else {
      next()
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
