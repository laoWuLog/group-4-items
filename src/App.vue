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
    Login
  },
};
</script>


<style lang="less">

</style>
