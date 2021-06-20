let axios = require("axios");

axios.defaults.timeout = 8000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//请求拦截器
axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
}, error => {
    return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use(response => {
    if (response.status == 200) {
        return Promise.resolve(response.data);
    }
}, (error) => {
    let errorData = error.response;
    //token未认证从定向到登录界面
    if (errorData && errorData.status == 401) {
        window.localStorage.removeItem("token", "")
        window.location.href = "/sign_in_up"
        return;
    }
    return Promise.reject(error);
});

export default axios;