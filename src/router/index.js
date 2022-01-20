import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import store from "../store";
import { getUserProfiles } from "../request/httpAPI";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index.vue"),
  },
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
];

//const没有声明提升,需要放到上面
const router = new VueRouter({
  routes,
});

// 设置前置路由守卫   判断是否有token
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token"); //获取token
  let userInfo = store.state.userInfo;
  if (token && !userInfo) {
    // getUserProfiles().then((res) => {
    //   if (res.code === 0) {
    //     store.commit("updateUserInfo", res.data);
    //   }
    // });
    store.dispatch("getUserInfo");
    next();
  } else {
    next();
  }
});

export default router;
