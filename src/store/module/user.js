import { getUserInfo } from "@/http/user.js";
export default {
    namespaced: true,
    state: {
        userInfo: {
            userName: ""
        }
    },
    mutations: {
        SET_USER_INFO(state, data) {
            state.userInfo.userName = data;
        }
    },
    actions: {
        GET_USERINFO({ state }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    console.log("getuserinfo----", res)
                    resolve(res);
                    if (res) {
                        state.userInfo = res;
                    }
                }).catch(err => {
                    reject(err)
                })
            });
        }
    }
}