//封装axios实例的拦截（请求，响应）
import axios from "axios";
import {
    config
} from "vue/types/umd";

// 1.创建axios实例
const instance = axios.create({
    timeout: 15000,//超时间15s
    baseURL: "",//ip+端口，公用的前缀路径
})
//重写实例请求前拦截器
instance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
})
//重写实例响应后拦截器
instance.interceptors.response.use((data) => {
    return data;
}, (err) => {
    return Promise.reject(err);
})

export default instance;