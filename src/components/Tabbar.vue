<template>
  <div class="tabbar-wrapper">
    <div class="tabbar-container">
      <p>欢迎来到叩丁狼严选</p>
      <ul class="tabbar-nav">
        <li class="tabbar-custom">
          <img width="26px" src="../assets/img/userImg.f8bbec5e.png" alt="" />
          <span>用户名：{{ userInfo ? userInfo.nickName : "--" }}</span>
        </li>
        <li>我的鸡腿：{{ userInfo ? userInfo.coin : "--" }}</li>
        <li>获取鸡腿</li>
        <li>叩丁狼官网</li>
        <li v-if="userInfo">购物车{{ cartTotal }}</li>
        <li v-else class="tabbar-loginbtn" @click="loginFn">登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {};
  },
  computed: {
    cartTotal() {
      return this.$store.state.userinfo?.cartTotal;
    },
    userInfo() {
      return this.$store.state.userinfo?.userInfo;
    },
    // nickName() {
    //   return this.$store.state.userinfo?.userInfo.nickName;
    // },
    // coin() {
    //   return this.$store.state.userinfo?.userInfo.coin;
    // },
  },
  methods: {
    loginFn() {
      bus.$emit("loginopen", true);
    },
  },
};
</script>

<style lang="less" scoped>
.tabbar-wrapper {
  background-color: #242b39;
  .tabbar-container {
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: #fffefe;
    font-size: 14px;
    .tabbar-nav {
      display: flex;
      align-items: center;
      li {
        margin-right: 20px;
      }
      .tabbar-custom {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
          border-radius: 50%;
        }
      }
      .tabbar-loginbtn {
        width: 124px;
        background-color: #0a328e;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>