import Vue from 'vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';

import App from './App.vue'
import store from "@/store/";
import routes from "@/router";
import XHR from "@/http/index.js";
import VueSocketIO from 'vue-socket.io'
import vueSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'
import "@/style/index.scss";
import "@/assets/fonts/iconfont.css";

import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

Vue.config.productionTip = false;
Vue.prototype.$XHR = XHR;

Vue.use(VueRouter);
Vue.use(new VueSocketIO({
  debug: true,   // debug调试，生产建议关闭
  connection: "192.168.0.108:3333",
  store,          // 如果没有
  options: { transports: ['websocket', 'xhr-polling', 'jsonp-polling'], }
  // options: {transports: ['websocket', 'xhr-polling'], }
}));
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(ElementUI, {
  size: "small"
});
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
  let token = window.localStorage.getItem("token");
  if (to.path == "/sign_in_up") {
    token ? next("/") : next();
  } else {
    if (to.meta.requireAuth && !token) {
      next("/sign_in_up")
    } else {
      to.path != "/" && store.dispatch("user/GET_USERINFO");
      next()
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  sockets: {
    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      console.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
