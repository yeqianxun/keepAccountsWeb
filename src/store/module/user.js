import { getUserInfo } from "@/http/user.js";
export default {
    namespaced: true,
    state: {
        userInfo: {},
        token: ""
    },
    mutations: {
        SET_USER_INFO(state, data) {
            state.userInfo = data
        },
        SET_USER_TOKEN(state, data) {
            state.token = data
        }
    },
    actions: {
        GET_USERINFO({ commit }) {
            getUserInfo().then(res => {
                if (res) {
                    commit("SET_USER_INFO", res.data)
                }
            })
        }
    }
}