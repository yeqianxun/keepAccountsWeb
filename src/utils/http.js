import Axios from "./axios.config";
import Qs from "qs";

export default function http(arg) {
    let contentType = {
        "Content-Type": arg.method == "POST" ? "application/x-www-form-urlencoded" : "application/json"
    }
    // console.log("Object.assign(contentType, arg.header)----", Object.assign(contentType, arg.headers), arg)
    let PropName = arg.method == "POST" ? "data" : "params";
    let reqData = arg.method == "POST" ? reqData = Qs.stringify(arg.data) : arg.data;
    return Axios(Object.assign({
        method: arg.method,
        url: arg.url,
        headers: Object.assign(contentType, arg.headers)
    }, {
        [PropName]: reqData || {},
    }))
}