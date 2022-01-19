import axios from 'axios'
import request from 'axios'

// 获取精品推荐
// export const getProductRec=()=>axios.get('http://192.168.113.249:8081/cms/products/recommend')

export const getProductRec =()=> request.get ('/cms/products/recommend')

// 获取用户信息
export const getuserProfiles =()=> request.get ('/shop/userProfiles',{headers:{'x-auth-token':'xxx'}})
// 查看购物车
export const getShopCarts =()=> request.get ('/shop/carts',{headers:{'x-auth-token':'xxx'}})