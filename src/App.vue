<template>
  <div id="app">
    <!-- 头部 -->
    <Tabbar></Tabbar>
    <Header></Header>
    <Banner></Banner>
    <div>
      <button @click="showToast">按钮按钮</button>
      <!-- <router-view /> -->
    </div>
    <!-- 中间内容 -->
    <div class="product">
      <Recommend></Recommend>
    </div>
    <!-- 尾部 -->
    <Footer></Footer>
    <!-- 登录界面 -->
    <Login></Login>
    <!-- 弹出消息框 -->
    <!-- <Toast></Toast> -->
  </div>
</template>
<script>
import Tabbar from "./components/Tabbar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Banner from "@/components/Banner.vue";
import Recommend from "./components/Recommend.vue";
import Login from "./components/Login.vue";

export default {
  components: {
    Tabbar,
    Header,
    Footer,
    Banner,
    Recommend,
    Login,
  },
  methods: {
    // 调用消息弹框方法
    showToast() {
      this.$toast({
        message: "这是一条消息",
        type: "error",
        duration: 1000,
      });
    },
  },
};
</script>

<style lang="less" >
#nav {
  padding: 30px;
}
.product {
  background-color: #f5f5f5;
  height: 1200px;
  padding: 15px 0;
}
</style>
