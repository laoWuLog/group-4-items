import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import {
//   getuserProfiles
// } from '../request/httpApi'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/index',
    name: 'index',
    component: () => import( /* webpackChunkName: "about" */ '../views/Index.vue')
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
const router = new VueRouter({
  routes
})
//用前置导航守卫解决登录状态失效的问题
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userinfo = store.state.userinfo;
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
  }else{
    next();
  }
})

export default router