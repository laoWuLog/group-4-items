<template>
  <div v-show="visible">
    <div class="login">
      <div class="login_bg"></div>
      <div class="login_content">
        <img @click="close" src="../assets/img/close.png" alt="" />
        <section class="phoneOrwechat">
          <span class="active">手机号码登录</span>
          <span class="">微信扫码登录</span>
        </section>
        <div class="phone_login">
          <div class="phoneNumber">
            <input
              type="text"
              placeholder="请输入手机号码"
              v-model="phoneNum"
            />
          </div>
          <!-- 滑块验证 -->
          <div class="slide-verify-slider">
            <slide-verify
              :l="42"
              :r="10"
              :w="360"
              :h="155"
              class="slide_box"
              ref="slideVerify"
              :slider-text="slideMsg"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
            ></slide-verify>
          </div>
          <div class="check_message">
            <input
              type="text"
              placeholder="请输入短信验证码"
              v-model="phoneCode"
            />
            <div class="btn" @click="getPhoneCode">
              <span v-if="!showCode">获取验证码</span>
              <span v-else>{{ count }}s</span>
            </div>
          </div>
          <div class="btn_login" @click="loginFn">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import { sendSMS, phoneRegin, getUserProfiles } from '../request/httpApi';
export default {
  data() {
    return {
      visible: false, //控制弹框的显示隐藏
      phoneNum: "13668966423", //手机号码
      slideMsg: "向右滑动", //滑块默认字体
      slideSuc: true,
      phoneCode: "2621",
      showCode: false, //显示秒数
      // changeSecondsBg:false,//改变验证码秒数背景色
      count: 60, //验证码秒数
    };
  },
  created() {
    // 中央事件总件
    bus.$on("loginvisible", (visible) => {
      this.visible = visible;
    });
  },
  methods: {
    //封装验证电话输入框和滑块部分
    toVertify() {
      // 验证手机号码--正则表达式
      const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg.test(this.phoneNum)) {
        alert("请输入正确的手机号码!");
        return;
      } else if (!this.slideSuc) {
        alert("请滑动拼图!");
        return false;
      }
      return true;
    },
    // 点击获取验证码功能
    getPhoneCode() {
      // 验证电话输入框和滑块
      if (this.toVertify() && !this.showCode) {
        // 通过校验
        this.showCode = true;
        const timer = setInterval(() => {
          if (this.count > 1) {
            this.count--;
          } else {
            // 1.清除定时器
            clearInterval(timer);
            // 2.按钮要重新显示文字
            this.showCode = false;
            this.count = 60;
          }
        }, 1000);
        // 发送验证码
        sendSMS({
          phone:this.phoneNum,
        }).then(res=>{

        })
      }
    },
    // 点击登录按钮
    loginFn() {
      // 验证手机号码--正则表达式
      if (this.toVertify() && this.phoneCode.length===4) {
        // 通过校验
        phoneRegin({
          verifyCode:this.phoneCode,
          phone:this.phoneNum,
        }).then((res)=>{
          console.log(res);
          if(res.code===0){
              localStorage.setItem('token',res['x-auth-token']);
              // 获取用户信息
              getUserProfiles().then((res)=>{
                // 拿到用户信息处理
                if(res.code===0){
                  this.$store.commit('updateUserInfo',res.data);
                  // 关闭登录框
                  this.close();
                }
              });
          }
        });
      }
    },
    // 成功后的回调---滑块花费的时间
    onSuccess(time) {
      this.slideSuc = true;
    },
    // 失败的回调
    onFail() {
      this.slideSuc = false;
    },
    // 刷新的回调
    onRefresh() {
      this.slideSuc = false;
    },
    // 点击x关闭按钮
    close() {
      this.visible = false;
      // 重置输入框的内容和滑块
      this.phoneNum = "";
      this.phoneCode = "";
      this.$refs.slideVerify.reset();
      this.count = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .login_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .login_content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 555px;
    height: 423px;
    background: url("../assets/img/login-box-bg.png");
    img {
      position: absolute;
      right: 60px;
      top: 10px;
      cursor: pointer;
    }
    .phoneOrwechat {
      display: flex;
      justify-content: center;
      padding-top: 40px;
      margin-bottom: 30px;
      .active {
        border-right: 1px solid #ccc;
        padding-right: 10px;
        margin-right: 10px;
      }
    }
    .phone_login {
      width: 360px;
      margin: 0 auto 20px;
      height: 50px;
      .phoneNumber {
        display: flex;
        justify-content: space-between;
        input {
          width: 360px;
          height: 45px;
          border: 1px solid #ccc;
        }
      }
      .slide-verify-slider {
        position: relative;
        width: 100%;
        margin: 20px auto 20px;
      }
      .check_message {
        width: 360px;
        margin: 0 auto 20px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        input {
          width: 100%;
          border: 1px solid #ccc;
        }
        .btn {
          color: #fff;
          background: #0a328e;
          text-align: center;
          width: 110px;
          margin-left: 10px;
          line-height: 50px;
          cursor: pointer;
        }
      }
      .btn_login {
        width: 360px;
        background: #0a328e;
        color: #fff;
        height: 50px;
        line-height: 50px;
        margin: auto;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
// 验证滑块部分
// 修改第三方插件要使用/deep/
/deep/.slide_box {
  width: 100%;
  position: relative;
  canvas {
    position: absolute;
    left: 0;
    top: -145px;
    display: none;
  }
  .slide-verify-refresh-icon {
    display: none;
    top: -140px;
  }
  &:hover {
    canvas {
      display: block;
    }
    .slide-verify-slider-refresh-icon {
      display: block;
    }
  }
}
</style>