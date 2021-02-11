export default {
    namespaced: true,
    state: {
        userInfo: {
            userName: ""
        },
        // testState: ""
    },
    mutations: {
        // SET_TEST_STATE(state, payload) {
        //     state.testState = payload;
        // },
        SET_USER_INFO(state, data) {
            console.log("sert_suer_info", data)
            state.userInfo.userName = data;
        }
    },
    action: {
        // ASYNC_SET_TEST_STATE({ state, commit, rootState }, payload) {
        // }
    },
    getters: {
        // 第一个是模块内的 state，第二个是 模块内的 getters，第三个是根节点状态 rootState
        // testState: (state, getters, rootState) => {
        //     return ""
        // }
    }
}