import request from './request';

// 获取精品推荐
// 第一种方法
/* export function getProductRec(){
  return axios.get('http://192.168.113.249:8081/cms/products/recommend')
} */


export const getProductRec = () => request.get('cms/products/recommend')

// 用户信息
export const getUserProfiles = () => request.get('/shop/userProfiles',{headers:{'x-auth-token':'xxxx'}})

// 查看购物车
export const getShopCarts = () => request.get('/shop/carts',{headers:{'x-auth-token':'xxxx'}})