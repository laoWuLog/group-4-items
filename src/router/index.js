import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/Login.vue"),
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

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem("token"); //获取token
//   if (to.path === ) {
//     if (to.path == "/login") {
//       next();
//     } else {
//       next("/login");
//     }
//   } else {
//     next();
//   }
// });
const router = new VueRouter({
  routes,
});

export default router;
