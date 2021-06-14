import http from "@/utils/http.js";
import BaseURL from "@/utils/url.js";

export function getHouseLabel() {
    return http({
        method: "GET",
        url: BaseURL.getHouseLabel
    });
}
