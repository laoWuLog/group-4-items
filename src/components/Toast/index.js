import Vue from "vue";
import Toast from "./Toast.vue";
// 封装消息弹框组件
function toast(obj) {
  // 创建构造器
  var Profile = Vue.extend(Toast);

  // 兼容处理 如果传进来是字符串
  if (typeof obj === "string") {
    obj = {
      message: obj,
    };
  }
  // 创建profile 实例,并挂载到一个元素上
  // 手动挂载Toast组件到id=app节点上
  const ToastDOM = new Profile({
    // 如果data为空,为调用Toast组件里面的数据(默认)
    // data: {
    //   // 携带的参数
    //   message: obj.message,
    //   type: obj.type,
    // },
    data: obj,
  }).$mount().$el; // 获取消息弹框节点
  document.body.appendChild(ToastDOM); //添加到body上
}

export default toast;
