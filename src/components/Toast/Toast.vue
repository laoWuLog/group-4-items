<template>
  <div class="toast">
    <p :class="[type]">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "这是一条消息",
      type: "success", //success/warning/info/error
      duration: 3000,
    };
  },
  // 挂载后
  mounted() {
    //设置3s后销毁该组件
    setTimeout(() => {
      // 当前实例进行销毁
      this.$destroy();
      // 移除节点
      console.log(this);
      this.$el.parentNode.removeChild(this.$el);
    }, this.duration);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
};
</script>

<style lang='less' scoped>
@keyframes move {
  0% {
    top: 0;
    opacity: 0;
  }
  100%{
    top: 20px;
    opacity: 1;
  }
}
.toast {
  animation: move 0.5s ease;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  color: #fff;
  font-size: 14px;
  p {
    padding: 20px 15px;
    background-color: #909399;
    min-width: 200px;
    border-radius: 4px;
  }
  .success {
    color: #67c23a;
    background-color: #f0f9eb;
    border-color: #e1f3d8;
  }
  .error {
    color: #f56c6c;
    background-color: #fef0f0;
    border-color: #fde2e2;
  }
  .warning {
    color: #e6a23c;
    background-color: #fdf6ec;
    border-color: #faecd8;
  }
}
</style>