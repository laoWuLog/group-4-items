<template>
  <div class="tabbar_wrapper">
    <div class="tabbar_container">
      <p>欢迎来到叩丁狼严选</p>
      <ul class="tabbar_nav">
        <li class="tabbar_custom">
          <!-- 用的打包工具是webpack,会以组件的形式打包,这里的路径需要用到require -->
          <!-- 第三方用到的头像如果是微信的,可能会有限制,图片显示"图片暂无法查看" -->
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
        <li>我的鸡腿:{{ userInfo ? userInfo.coin : "--" }}</li>
        <li>获取鸡腿</li>
        <li>叩丁狼官网</li>
        <li v-if="userInfo" class="tabbar_loginbtn">购物车  {{ cartTotal }}</li>
        <li class="tabbar_loginbtn" @click="login" v-else>登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import { mapState } from "vuex";
export default {
  methods: {
    login() {
      bus.$emit("loginvisible", true);
    },
  },
  created() {
    // console.log(mapState(["userInfo"]));
  },
  computed: {
    userInfo() {
      console.log(this.$store.state.userInfo);
      return this.$store.state.userInfo?.userInfo;
    },
    cartTotal() {
      return this.$store.state.userInfo?.cartTotal;
    },
    // nickName() {
    //   return this.$store.state.userInfo?.userInfo.nickName;
    //   // return userInfo?.userInfo.nickName;
    // },
    // coin() {
    //   return this.$store.state.userInfo?.userInfo.coin;
    // },
    // ...mapState(["userInfo"]),
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