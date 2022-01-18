<template>
  <div id="app">
    <!-- 头部 -->
    <Tabbar></Tabbar>
    <Header></Header>
    <div>
      <router-view />
    </div>
    <!-- 中间内容 -->
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import Tabbar from "./components/Tabbar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Tabbar,
    Header,
    Footer,
  },
};
</script>

<style lang="less" >
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
