import http from "@/utils/http.js";
import BaseURL from "@/utils/url.js";

export function getUserInfo() {
    return http({
        method: "GET",
        url: BaseURL.getUserInfo
    })
}
export function login(data) {
    return http({
        method: "POST",
        url: BaseURL.login,
        data: data
    });
}
export function register(data) {
    return http({
        method: "POST",
        url: BaseURL.register,
        data
    });
}

