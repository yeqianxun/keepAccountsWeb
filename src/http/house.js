
import http from "@/utils/http.js";
import BaseURL from "@/utils/url.js";

export function uploadHouse(data) {
    return http({
        method: "POST",
        url: BaseURL.uploadHouse,
        data
    });
}
export function getAllHouseInfo(params) {
    return http({
        method: "GET",
        url: BaseURL.getAllHouseInfo,
        params
    });
}
