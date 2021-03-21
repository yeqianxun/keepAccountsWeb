import Axios from "@/utils/http.js";
import BaseURL from "@/utils/url.js";

export function getUserInfo() {
    return Axios({
        method: "GET",
        url: BaseURL.userInfo
    });
}
