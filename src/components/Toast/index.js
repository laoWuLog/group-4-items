import Vue from 'vue'
import Toast from './Toast.vue'
// 创建构造器
var Profile = Vue.extend(Toast)

// 扩展Vue原型对象上的$message方法
function toast(obj) {
  if (typeof obj === 'string') {

    obj = {
      message: obj
    }
  }
  // 创建Profile 实例，并挂载到一个元素上
  // 手动挂载Toast组件到id-app节点上
  const ToastDOM = new Profile({
    data: obj
    /* data:{
      message:obj.message,
      type:obj.type
    } */
  }).$mount().$el;
  // 把组件的DOM结构插入body节点里面
  document.body.appendChild(ToastDOM)
  // new Profile().$mount('#app');
}
export default toast;