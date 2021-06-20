import http from "@/utils/http.js";
import BaseURL from "@/utils/url.js";
import axios from "axios"
export function uploadHouse(data, header) {
    return axios({
        method: "POST",
        url: BaseURL.uploadHouse,
        data,
        headers: header,
        transformRequest: [function () {
            return data;
        }],
    });
}
export function getAllHouseInfo(data) {
    return http({
        method: "GET",
        url: BaseURL.getAllHouseInfo,
        data
    });
}
export function getHouseDetail(data) {
    return http({
        method: "GET",
        url: BaseURL.getHouseDetail,
        data
    });
}