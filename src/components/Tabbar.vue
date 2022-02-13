<template>
  <div class="tabbar_wrapper">
    <div class="tabbar_container">
      <p>欢迎来到叩丁狼严选</p>
      <ul class="tabbar_nav">
        <li class="tabbar_custom">
          <img
            :src="
              userInfo
                ? userInfo.headImg
                : require('../assets/img/userImg.f8bbec5e.png')
            "
            alt=""
          />
          <span>用户名:{{ userInfo ? userInfo.nickName : "--" }}</span>
        </li>
        <li>我的鸡腿:{{ userInfo ? userInfo.coin  : "--" }}</li>
        <li>获取鸡腿</li>
        <li>叩丁狼官网</li>
        <li v-if="userInfo" @click="addCart">购物车{{cartTotal}}</li>
        <li v-else class="tabbar_loginbtn" @click="loginFn">登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      // nickName:''
    };
  },
  computed: {
    cartTotal(){
        return this.$store.state.userinfo?.cartTotal
    },
    userInfo(){
       return this.$store.state.userinfo?.userInfo
    },
   /*  nickName() {
      return this.$store.state.userinfo?.userInfo.nickName;
    },
    coin() {
      return this.$store.state.userinfo?.userInfo.coin;
    }, */
  },
  methods: {
    loginFn() {
      // 通过bus传值
      bus.$emit("loginvisible", true);
    },
    addCart(){
      this.$router.push('/user')
    }
  },
};
</script>

<style lang="less" scoped>
.tabbar_wrapper {
  background-color: #242b39;
  .tabbar_container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: #fffefe;
    font-size: 14px;
    .tabbar_nav {
      display: flex;
      align-items: center;
      li {
        margin-right: 20px;
      }
      .tabbar_custom {
        display: flex;
        align-items: center;
        img {
          width: 26px;
          margin-right: 5px;
          border-radius: 50%;
        }
      }
      .tabbar_loginbtn {
        width: 124px;
        background-color: #0a328e;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>