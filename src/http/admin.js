
import http from "@/utils/http.js";
import BaseURL from "@/utils/url.js";

export function getCarouselText() {
    return http({
        method: "GET",
        url: BaseURL.getCarouselText
    });
}
