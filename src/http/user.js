import Axios from "@/utils/http.js";
import BaseURL from "@/utils/url.js";

export default {
    getUserInfo() {
        return new Promise((resolve, reject) => {
            Axios.get({
                method: "get",
                url: BaseURL.userInfo
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}