<template>
  <div id="app">
    <Tabbar>头部</Tabbar>
    <Header>导航栏</Header>
    <Banner></Banner>
    <Login></Login>
    <!-- <Toast></Toast> -->
    
    <!-- 中间内容 -->
    <div>
      <router-view/>
    </div>
    <!-- 底部 -->
    <!-- <Footer></Footer> -->
    <button @click="showToast">显示Toast</button>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Banner from './components/Banner'
import Login from './components/Login.vue'
// import Toast from './components/Toast.vue'
export default {
  components:{
    Tabbar,
    Header,
    Footer,
    Banner,
    Login,
    // Toast
    
  },
  methods: {
    showToast(){
     /*  this.$toast({
        message:'这个APP.vue里面的消息',
        type:'error',
        duration:5000
      }) */
      this.$toast({
       message: '这个APP.vue里面的消息',
        type: 'warning',
        duration: 10000
      })
    }
  },
}
</script>
<style lang="less" >
@import url('assets/style/iconfont.less');
</style>
