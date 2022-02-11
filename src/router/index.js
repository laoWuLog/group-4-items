import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import store from "../store";
import { getUserProfiles, wechatPcLogin } from "../request/httpAPI";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/Index.vue"),
  },
  {
    path:'/userInfo',
    name:'userInfo',
    component:()=>import(/* webpackChunkName: "userInfo" */ "../views/User.vue"),
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
];

//const没有声明提升,需要放到上面
const router = new VueRouter({
  mode: "history", //如果是涉及到微信相关开发,用到history比较方便获取到扫描微信二维码成功后返回的code值
  routes,
});

// 设置前置路由守卫   判断是否有token
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token"); //获取token
  let userInfo = store.state.userInfo;
  console.log(to);
  let code = to.query.code;
  if (token && !userInfo) {
    // getUserProfiles().then((res) => {
    //   if (res.code === 0) {
    //     store.commit("updateUserInfo", res.data);
    //   }
    // });
    store.dispatch("getUserInfo");
    next();
  } else if (!token && code) {
    //token不存在 通过返回的code值获取token值
    wechatPcLogin({ code }).then((res) => {
      if (res.code === 0) {
        localStorage.setItem("token", res["x-auth-token"]);
        store.dispatch("getUserInfo");
        // 替换掉路径上code参数
        router.replace(to.path); //原来会携带code,替换掉 路径比较干练
        // next();
      }
    });
  } else {
    next();
  }
});

export default router;
