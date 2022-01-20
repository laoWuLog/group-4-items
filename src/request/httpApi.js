import request from './request';
import qs from 'qs';

// 1.获取精品推荐
/* 
export function getProductRec(){
    return axios.get('http://192.168.113.249:8081/cms/products/recommend')
} */
// 优化写法
/* 
前端开发的时候如果遇到跨域
解决方式:设置代理---也就是服务请求 服务8080后端服务页面(使用node) */
export const getProductRec = () => request.get('/cms/products/recommend');

// 2.获取用户信息
export const getUserProfiles = () => request.get('/cms/shop/userProfiles', { headers: { 'x-auth-token': localStorage.setItem('token') } });

// 3.查看购物车
export const getShopCarts = () => request.get('/cms/shop/carts', { headers: { 'x-auth-token': 'xxx' } });

// 4.获取手机验证码
export const sendSMS = (data) => request.post('/cms/sendSMS', qs.stringify(data));

// 5.手机验证码登录
export const phoneRegin = (data) => request.post('/cms/phoneRegin', qs.stringify(data));
