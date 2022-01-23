import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import SlideVerify from 'vue-monoplasty-slide-verify';
import toast from './components/Toast'

Vue.use(SlideVerify);
Vue.config.productionTip = false

// 扩展Vue原型对象上的$message方法
Vue.prototype.$toast = toast

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
