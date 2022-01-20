<template>
  <div class="toast">
    <p :class="[type]">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 默认数据
      message: "这是一条消息",
      type: "success",
      duration: 3000, //持续时间
    };
  },
  mounted() {
    setTimeout(() => {
      this.$destroy();
      // console.log(this);
      // 移除节点 通过父亲删除自己
      this.$el.parentElement.removeChild(this.$el);
    }, this.duration);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
};
</script>
<style lang="less" scoped>
@keyframes move {
  0% {
    top: 0;
    opacity: 0;
  }
  100% {
    top: 20px;
    opacity: 1;
  }
}
.toast {
  animation: move 3000 ease;
  position: fixed;
  top: 20px;
  transform: translateX(-50%);
  left: 50%;
  width: 200px;
  height: 50px;
  line-height: 50px;
  background-color: #cfc;
  border-radius: 5px;
  text-align: center;
  z-index: 9999;
  overflow: hidden;
  p {
    min-width: 200px;
  }
  .success {
    color: forestgreen;
  }
  .error {
    background-color: rgba(255, 0, 0, 0.7);
    color: #fff;
  }
}
</style>