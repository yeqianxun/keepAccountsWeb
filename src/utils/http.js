let axios = require("axios");

axios.defaults.timeout = 8000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

//请求拦截器
axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
}, error => {
    return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use(response => {
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default axios;
