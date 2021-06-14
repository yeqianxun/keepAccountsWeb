import { getHouseLabel } from "@/http/label.js";
export default {
    namespaced: true,
    state: {
        houselabels: {},
    },
    mutations: {
        SET_HOUSE_LABELS(state, data) {
            state.houselabels = data
        },
    },
    actions: {
        GET_HOUSE_LABEL({ commit }) {
            getHouseLabel().then(res => {
                if (res) {
                    commit("SET_HOUSE_LABELS", res.data)
                }
            })
        }
    }
}