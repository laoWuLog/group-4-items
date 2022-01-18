import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
   {
    path: '/index',
    name: 'index',
    component: ()=>import( /* webpackChunkName: "index" */ '../views/index.vue')
  },

]

const router = new VueRouter({

  routes
})

export default router
