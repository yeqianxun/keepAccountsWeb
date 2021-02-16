import Vue from "vue";
import Vuex from "vuex";
import user from "./module/user.js";
import getters from "./getters.js"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters,
    modules: { user }
});