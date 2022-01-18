import axios from 'axios';

// 获取精品推荐
// 第一种方法
/* export function getProductRec(){
  return axios.get('http://192.168.113.249:8081/cms/products/recommend')
} */


export const getProductRec = () => axios.get('cms/products/recommend')