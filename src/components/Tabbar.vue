<template>
  <div class="tabbar_wrapper">
    <div class="tabbar_container">
      <p>欢迎来到叩丁狼严选</p>
      <ul class="tabbar_nav">
        <li class="tabbar_custom">
          <img src="../assets/img/userImg.f8bbec5e.png" alt="" />
          <span>用户名:--</span>
        </li>
        <li>我的鸡腿:--</li>
        <li>获取鸡腿</li>
        <li>叩丁狼官网</li>
        <li class="tabbar_loginbtn" @click="login">登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  methods: {
    login() {
      bus.$emit("login", true);
    },
  },
};
</script>

<style lang='less' scoped>
.tabbar_wrapper {
  // width: 100%;
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
        &:last-child {
          margin-right: 0;
        }
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