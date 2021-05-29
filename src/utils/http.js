import Axios from "./axios.config";
export default function http(param) {
    let defaultHeader = { "Content-Type": "application/json" }
    return Axios({
        method: param.method,
        url: param.url,
        data: param.data || {},
        headers: param?.headers ? Object.assign(param.headers, defaultHeader) : defaultHeader
    })
}