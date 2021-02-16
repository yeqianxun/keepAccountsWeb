import Vue from 'vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
let echarts = require('echarts/lib/echarts');
// 引入折线图/柱状图等组件
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
// require('echarts/lib/component/series');
require('echarts/lib/component/legendScroll');//图例滚动
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from "@/store/";
import routes from "@/router";
import "@/style/index.scss";
import "@/assets/fonts/iconfont.css";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts

Vue.use(VueRouter);
Vue.use(ElementUI);
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
  store.commit("user/SET_USER_INFO", "yangxinglong")
  if (to.meta.requireAuth == true) {
    if (window.localStorage.getItem("token") != undefined) {
      next();
    } else {
      router.push("/login");
    }
  } else {
    next();
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
