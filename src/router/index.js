import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {
  wechatPCLogin
} from '../request/httpApi'
// import {
//   getuserProfiles
// } from '../request/httpApi'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: "/index",
    name: 'index',
    component: () => import( /* webpackChunkName: "about" */ '../views/Index.vue')
  },
  {
    path: '/detail/:pid',
    name: 'detail',
    component: () => import( /* webpackChunkName: "about" */ '../views/Detail.vue')
  },
  {
    path: '/user',
    redirect: "user/cart",
    name: 'user',
    component: () => import( /* webpackChunkName: "user" */ '../views/User.vue'),
    children: [{
      path: 'cart',
      name: 'cart',
      component: () => import( /* webpackChunkName: "cart" */ '../components/Cart.vue')

    }]
  },
]
const router = new VueRouter({
  mode: 'history',
  routes
})
//用前置导航守卫解决登录状态失效的问题
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userinfo = store.state.userinfo;
  const code = to.query.code;
  if (token && !userinfo) {
    // 重新获取用户信息
    // getuserProfiles().then(res => {
    //   if (res.code === 0 ){
    //     // 把用户数据存储到vuex（调用mutations）
    //       store.commit('updateUserInfo', res.data)
    //     }
    // })
    store.dispatch('getUserInfo')
    next();
  } else if (code && !token) {
    //code通过接口换取token
    wechatPCLogin({
      code
    }).then(res => {
      if (res.code === 0) {
        localStorage.setItem('token', res['x-auth-token']);
        //获取用户信息（调用获取信息接口, 把返回数据存储到vuex）
        store.dispatch('getUserInfo').then(res => {
          //替换路径上code参数
          router.replace(to.path)
        })
        // store.dispatch('getUserInfo')
        next();
      }
    })
  } else {
    next();
  }
})

export default router