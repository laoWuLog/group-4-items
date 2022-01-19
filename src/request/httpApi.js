// import axios from 'axios'
import request from './request'
import qs from 'qs'

// 获取精品推荐
// export const getProductRec=()=>axios.get('http://192.168.113.249:8081/cms/products/recommend')

export const getProductRec = () => request.get('/cms/products/recommend')

// 获取用户信息
export const getuserProfiles = () => request.get('/cms/shop/userProfiles', {
    headers: {
        'x-auth-token': localStorage.getItem('token')
    }
})
// 查看购物车
export const getShopCarts = () => request.get('/cms/shop/carts', {
    headers: {
        'x-auth-token': 'xxx'
    }
})
//获取手机验证码
export const sendSMS = (data) => request.post('/cms/sendSMS', qs.stringify(data))
//手机验证码登录
export const phoneRegin = (data) => request.post('/cms/phoneRegin', qs.stringify(data))