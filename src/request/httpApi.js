import axios from 'axios'

export const getProductRec=()=>axios.get('http://192.168.113.249:8081/cms/products/recommend')
