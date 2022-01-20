<template>
  <div class="topbar_all">
    <div class="topbar_content">
      <p>欢迎来到叩丁严选</p>
      <ul class="topbar_content_right">
        <li class="topbar_user">
          <img
            width="26px"
            :src="
              userInfo ? userInfo.headImg : require('../assets/img/userImg.f8bbec5e.png')
            "
            alt=""
          />
          <span>用户名：{{ userInfo ? userInfo.nickName : "--" }}</span>
        </li>
        <li>我的鸡腿：{{ userInfo ? userInfo.coin : "--" }}</li>
        <li>获取鸡腿</li>
        <li>叩丁狼官网</li>
        <li v-if='userInfo'>购物车{{cartTotal}}</li>
        <li v-else class="topbar_loginbtn" @click="loginFn">登录</li>
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
  },
  methods: {
    loginFn() {
      // 通过bus传值
      bus.$emit("loginvisible", true);
    },
  },
};
</script>

<style lang='less' scoped>
// scope👉该页面写的样式不会影响到主页面
.topbar_all {
  background-color: #242b39;
  .topbar_content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: #fffefe;
    font-size: 14px;
    .topbar_content_right {
      display: flex;
      align-items: center; //垂直居中
      li {
        margin-right: 20px;
      }
      .topbar_user {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
          border-radius: 50%;
        }
      }
      .topbar_loginbtn {
        width: 124px;
        background: #0a328e;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>