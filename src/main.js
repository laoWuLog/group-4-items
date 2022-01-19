import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
// 引入第三方插件
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.use(SlideVerify);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
