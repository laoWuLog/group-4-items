<template>
  <div id="app">
    <!-- 头部 -->
    <Tabbar></Tabbar>
    <Header></Header>
    <Banner></Banner>
    <div>
      <!-- <router-view /> -->
    </div>
    <!-- 中间内容 -->
    <div class="product">
      <Recommend></Recommend>
    </div>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import Tabbar from "./components/Tabbar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Banner from "@/components/Banner.vue";
import Recommend from "./components/Recommend.vue";

export default {
  components: {
    Tabbar,
    Header,
    Footer,
    Banner,
    Recommend,
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
