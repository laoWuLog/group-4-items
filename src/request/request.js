//封装axios实例的拦截（请求，响应）
import axios from "axios";
import {
    config
} from "vue/types/umd";

// 1.创建axios实例
const instance = axios.create({
    timeout: 15000,
    baseURL: ""
})

instance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
})

instance.interceptors.response.use((data) => {
    return data;
}, (err) => {
    return Promise.reject(err);
})

export default instance;