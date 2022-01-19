// 封装axios实例的拦截器(请求,响应)
import axios from "axios";

const instance = axios.create({
  timeout: 15000,
  baseURL: "",
});
// 重写实例请求前拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 重写实例响应后拦截器
instance.interceptors.response.use(
  (data) => {
    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
