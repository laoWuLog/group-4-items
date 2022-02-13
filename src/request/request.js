//封装axios实例的拦截（请求，响应）
import axios from "axios";
import toast from '../components/Toast'

// 1.创建axios实例
const instance = axios.create({
    timeout: 15000, //超时间15s
    baseURL: "", //ip+端口，公用的前缀路径
})
//重写实例请求前拦截器
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token

    }
    return config;
}, (err) => {
    return Promise.reject(err);
})
//重写实例响应后拦截器
instance.interceptors.response.use((data) => {
    //统一处理code值不为0的所有错误提醒
    if (data.data.code !== 0) {
        toast({
            message: data.data.message || "请求失败",
            type: "error",
            duration: 5000,
        });
    }
    return data.data;
}, (err) => {
    return Promise.reject(err);
})

export default instance;