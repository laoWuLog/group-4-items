<template>
  <div class="toast">
    <p :class="[type]">{{message}}</p>
  </div>
</template>

<script>
export default {
 data(){
   return {
     message:'这是一条消息',
     type:"success",
     duration:3000
   }
 },
 // 挂载后
 mounted() {
   // 设置3s后销毁该组件
   setTimeout(()=>{
     // 当前实例进行销毁
     this.$destroy();
     // 移出节点
     console.log(this);
     this.$el.parentNode.removeChild(this.$el);
   },this.duration)
 },
 beforeDestroy() {
   console.log("beforeDestroy");
 },
}
</script>

<style lang="less" scoped>
@keyframes move {
  0%{
    top:0;
    opacity: 0;
  }
  100%{
    top:20px;
    opacity: 1;
  }

}
.toast{
  animation: move 0.5s ease;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%);
  z-index: 9999;
  color: #fff;
  font-size: 14px;
  p{
    padding: 20px 15px;
    background-color: cornflowerblue;
    min-width: 200px;
    border-radius: 4px;
  }
  .success{
    color: red;
  }
  .error{
    color: aqua;
  }
}
</style>