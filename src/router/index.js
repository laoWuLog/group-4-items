import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
    path: '/index',
    name: 'index',
    component: () => import( /* webpackChunkName: "index" */ '../views/index.vue')
  },

]

const router = new VueRouter({

  routes
})

// 用前置导航守卫解决登录状态失效的问题
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userinfo = store.userinfo;
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
  }else{
    next()
  }
})

export default router

