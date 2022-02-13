import request from './request';
import qs from 'qs'

// 获取精品推荐
// 第一种方法
/* export function getProductRec(){
  return axios.get('http://192.168.113.249:8081/cms/products/recommend')
} */


export const getProductRec = () => request.get('/cms/products/recommend')

// 用户信息    
export const getUserProfiles = () => request.get('/cms/shop/userProfiles')

// 查看购物车
export const getShopCarts = () => request.get('/cms/shop/carts')

// 获取手机验证码
export const sendSMS=(data)=>request.post('/cms/sendSMS',qs.stringify(data))

// 手机验证码登录
export const phoneRegin=(data)=>request.post('/cms/phoneRegin',qs.stringify(data))
// 微信扫码登录
export const PCLogin=(data)=>request.post('/cms/wechatUsers/PCLogin',qs.stringify(data))
