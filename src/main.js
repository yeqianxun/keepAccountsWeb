import Vue from 'vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

import routes from "@/router";

import "@/style/index.scss";
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
let router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
