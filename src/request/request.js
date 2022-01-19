// 封装axios实例的拦截器(请求，响应)
import axios from 'axios';

// 1. 创建axios实例
const instance = axios.create({
  timeout: 1500, // 超时时间15s
  baseURL: "", // ip + 端口 ， 公用的路径
});

// 重写实例请求拦截器
instance.interceptors.request.use((config)=>{
  return config;
},(err)=>{
  return Promise.reject(err)
});

// 重写实例响应后拦截器
instance.interceptors.request.use((data)=>{
  return data;
},(err)=>{
  return Promise.reject(err)
});

export default instance;