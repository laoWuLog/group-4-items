<template>
  <div id="app">
    <Tabbar>头部</Tabbar>
    <Header>导航栏</Header>
    <Banner></Banner>
    <Login></Login>
    <!-- 中间内容 -->
    <div>
      <router-view/>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Banner from './components/Banner.vue'
import Login from './components/Login.vue'
export default {
  components:{
    Tabbar,
    Header,
    Footer,
    Banner,
    Login
  }
}
</script>
<style lang="less" scoped>

</style>
