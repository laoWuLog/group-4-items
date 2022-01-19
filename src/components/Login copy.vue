<template>
  <div class="login" v-show="visible">
    <div class="login-box">
      <div class="login-body">
        <img src="../assets/img/close.png" alt="" @click="close" />
        <ul>
          <li class="bor">手机号码登录</li>
          <li>微信扫码登录</li>
        </ul>
        <div class="login-input">
          <input type="text" placeholder="请输入手机号码" v-model="phoneNum" />
          <div>
            <slide-verify
              :l="42"
              :r="10"
              :w="310"
              :h="155"
              slider-text="向右滑动"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
              class="slide-box"
            ></slide-verify>
          </div>
          <div class="login-verification">
            <input type="text" placeholder="请输入短信验证码" />
            <button>获取验证码</button>
          </div>
          <button @click="loginFn">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      visible: false,
      phoneNum: "", //手机号码
    };
  },
  created() {
    bus.$on("loginopen", (visible) => {
      this.visible = visible;
    });
  },
  methods: {
    close() {
      this.visible = false;
    },
    // 点击登录按钮
    loginFn() {
      // 验证手机号码
      // let reg=/^1[3-9]\d{9}$/;//方法一
      //方法二
      const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg.test(this.phoneNum)) {
        alert("手机号码格式不正确");
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  .login-box {
    background-image: url("../assets/img/login-box-bg.png");
    width: 555px;
    height: 423px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -277px;
    margin-top: -211px;
    .login-body {
      width: 420px;
      margin: auto;
      padding: 42px 20px 34px;
      box-sizing: border-box;
      background: rgb(236, 69, 69);
      ul {
        text-align: center;
        height: 40px;
        line-height: 40px;
        padding: 0 55px;
        box-sizing: border-box;
        li {
          float: left;
          font-size: 16px;
          padding: 0 15px;
          line-height: 23px;
        }
        .bor {
          border-right: 1px solid #eee;
        }
        .login-input{
          /deep/.slide-box{
            width: 100%;
            position: relative;
            canvas{
              position: absolute;
              top: -145px;
              left: 0;
              display: none;
            }
            .slide-verify-refresh-icon{
              display: none;
            }
          }
        }
        
      }
    }
  }
}
</style>