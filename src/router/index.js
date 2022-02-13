import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import store from '../store/index'
import {
  PCLogin
} from '../request/HttpApi'

Vue.use(VueRouter)

const routes = [{
    path: '/index',
    name: 'index',
    component: () => import( /* webpackChunkName: "index" */ '../views/index.vue')
  },
  {
    path: '/user',
    redirect:'/user/cart',
    name: 'User',
    component: () => import( /* webpackChunkName: "user" */ '../views/User.vue'),
    children: [
      {
        path: 'cart',
        name: 'Cart',
        component: () => import( /* webpackChunkName: "cart" */ '../components/Cart.vue'),
       },
    ]
  },
  {
    path: '/detail/:pid',
    name: 'Detail',
    component: () => import( /* webpackChunkName: "detail" */ '../views/Detail.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 用前置导航守卫解决登录状态失效的问题
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userinfo = store.userinfo;
  console.log(to, from);
  const code = to.query.code
  if (token && !userinfo) {
    // 重新获取用户信息数据
    /*  getUserProfiles().then(res => {
       if (res.data === 0) {
         // 把用户信息数据存储到vuex(调用vuex里面的mutations方法updateUesrInfo)
         store.commit('updateUserInfo', res.data);
       }
     }) */

    store.dispatch('getUserInfo')
    next()
  } else if (code && !token) {
    // code通过接口换取token
    PCLogin({
      code
    }).then(res => {
      if (res.code === 0) {
        localStorage.setItem("token", res["x-auth-token"]);
        // 获取用户信息,（调用用户信息接口,把返回数据存储到vuex）
        store.dispatch('getUserInfo').then(res => {
          // 替换掉路径上的code参数
          console.log(to);
          router.replace(to.path)

        })
        next()
      }
    })
  } else {
    next()
  }
})

export default router