<template>
  <div id="app">
    <!-- 头部 -->

    <Tabbar />
    <Header />
    <Login />
    <!-- 内容 -->
    <div>
      <router-view />
    </div>
    <Foorter />
    <button @click="showToast">显示Toast</button>
    <!-- <Toast/> -->
    <!-- 底部 -->
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Tabbar from "./components/Tabbar.vue";
import Foorter from "./components/Foorter.vue";
import Login from "./components/Login.vue";
// import Toast from './components/Toast.vue'
export default {
  components: {
    Header,
    Tabbar,
    Foorter,
    Login,
    // Toast
  },
  methods: {
    showToast() {
      // 调用自己在main.js封装好的实例组件
      this.$toast('这是一条消息')
      // this.$message1({
      //   message:"这个是APP.vue里面的消息",
      //   type:'error'
      // });
    },
  },
};
</script>

<style lang="less">
</style>
