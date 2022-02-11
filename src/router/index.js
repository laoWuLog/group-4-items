import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { wechatPCLogin } from '../request/httpApi'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 用前置导航守卫解决登录状态失效的问题
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userinfo = store.state.userinfo;
  console.log(to, from);
  const code = to.query.code;
  if (token && !userinfo) {
    // 重新获取用户信息数据
    store.dispatch('getUserInfo');
    next();     
  } else if (code && !token) {
    // code通过接口换取token
    wechatPCLogin({ code }).then(res => {
      if (res.code === 0) {
        localStorage.setItem('token', res['x-auth-token']);
        // 获取用户信息(调用获取用户信息接口,把返回数据存储到vuex)
        store.dispatch('getUserInfo').then(res => {
          router.replace(to.path);
        });
        next();
      }
    })
  } else {
    next();
  }
})

export default router;
