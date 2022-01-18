import axios from 'axios';

// 获取精品推荐
/* 
export function getProductRec(){
    return axios.get('http://192.168.113.249:8081/cms/products/recommend')
} */
// 优化写法
/* 
前端开发的时候如果遇到跨域
解决方式:设置代理---也就是服务请求 服务8080后端服务页面(使用node) */
export const getProductRec = () => axios.get('/cms/products/recommend');