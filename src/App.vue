<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <Topbar />
    <Navbar />
    <!-- 中间内容 -->
    <div>
      <router-view />
    </div>
    <!-- 底部 -->
    <Footer />
    <Login />
    <button @click="showToast">显示Toast</button>
  </div>
</template>
<script>
import Topbar from "./components/Topbar.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue";

export default {
  components: {
    Topbar,
    Navbar,
    Footer,
    Login,
  },
  methods: {
    showToast() {
      this.$toast({
        message:'这个App.vue里面的消息',
        type:'warning',
        duration:3000
       });
      //  this.$message1('这是一条消息')
    },
  },                                   
};
</script>


<style lang="less">
</style>
