import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
  },
]

const router = new VueRouter({
  routes
})

// 用前置导航守卫解决登录状态失效的问题
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userinfo = store.state.userinfo;
  if (token && !userinfo) {
    // 重新获取用户信息数据
    store.dispatch('getUserInfo');
    next();
  } else {
    next();
  }
})

export default router;
