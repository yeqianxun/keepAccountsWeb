import http from "@/utils/http.js";
import BaseURL from "@/utils/url.js";

export function getAllCity() {
    return http({
        method: "GET",
        url: BaseURL.getAllCity
    });
}
