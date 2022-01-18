<template>
  <div id="app">
    <!-- 头部 -->
    <Tabbar />
    <Header />
    <Login/>
    <!-- 内容 -->
    <div>
      <router-view />
    </div>
    <Foorter />
    <!-- 底部 -->
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Tabbar from "./components/Tabbar.vue";
import Foorter from "./components/Foorter.vue";
import Loin from './components/Login.vue'

export default {
  components: {
    Header,
    Tabbar,
    Foorter,
    Login
  },
};
</script>

<style lang="less">
</style>
