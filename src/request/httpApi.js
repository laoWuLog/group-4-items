// import axios from 'axios'
import request from './request'
import qs from 'qs'

// 获取精品推荐
// export const getProductRec=()=>axios.get('http://192.168.113.249:8081/cms/products/recommend')

export const getProductRec = () => request.get('/cms/products/recommend')

// 获取用户信息
export const getuserProfiles = () => request.get('/cms/shop/userProfiles')
//    {  headers: {
//         'x-auth-token': localStorage.getItem('token')
//     }
// }请求头参数
// 查看购物车
export const getShopCarts = () => request.get('/cms/shop/carts')
//获取手机验证码
export const sendSMS = (data) => request.post('/cms/sendSMS', qs.stringify(data))
//手机验证码登录
export const phoneRegin = (data) => request.post('/cms/phoneRegin', qs.stringify(data))
//微信扫码
export const wechatPCLogin = (data) => request.post('/cms/wechatUsers/PCLogin', qs.stringify(data))
// 商品详情
export const getProductDetail = (id) => request.get('/cms/products/' + id)
//添加商品到购物车
export const addShopCart = (data) => request.post('/cms/shop/carts/add', qs.stringify(data))
//删除购物车物品
export const reducShopCart = (productIds) => request.get('/cms/shop/carts?' + productIds)