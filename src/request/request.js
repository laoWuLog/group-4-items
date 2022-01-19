//这个文件用来封装axios实例拦截器
import axios from "axios";

// 1.创建axios实例
const instance = axios.create({
    timeout: 15000,//超时时间15s---如果请求超过15s自动中断
    baseURL: '',//ip+端口,公用的前缀路径
});

// 拦截器分为请求前拦截器和响应后拦截器
// 重写实例请求前拦截器
// 语法:instance.interceptors.request.use(参数1,参数2);
instance.interceptors.request.use((config) => { // config->接收成功的参数
    return config;
}, (err) => { // err->接收失败的参数
    return Promise.reject(err);
 });

// 重写实例响应后拦截器
// 语法:instance.interceptors.response.use(参数1,参数2)
instance.interceptors.response.use((data) => { // data->接收成功的参数
    return data;
 }, (err) => { // err->接收失败的参数
    return Promise.reject(err);
 })
export default instance;