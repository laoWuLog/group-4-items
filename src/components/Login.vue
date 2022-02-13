<template>
  <div v-show="visible">
    <div class="modal">
      <div class="modal_bg"></div>
      <div class="modal_content">
        <img @click="close" src="../assets/img/close.png" alt="" />
        <section class="phoneOrwechat">
          <span
            :class="[isShowForm ? 'fonts' : '', 'active']"
            @click="isShowForm = true"
            >手机号码登录</span
          >
          <span :class="[isShowForm ? '' : 'fonts']" @click="weixinClick"
            >微信扫码登录</span
          >
        </section>
        <!-- 手机号码登录 -->
        <div class="phone_login" v-show="isShowForm">
          <div class="phoneNumber">
            <input
              type="text"
              placeholder="请输入手机号码"
              v-model="phoneNum"
            />
          </div>
          <div class="slide-verify-slider">
            <slide-verify
              :l="42"
              :r="10"
              :w="360"
              :h="155"
              class="slide_box"
              ref="slideVerify"
              slider-text="向右滑动"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
            ></slide-verify>
          </div>
          <div class="yanzheng">
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
        <!-- 微信扫码登录 -->
        <div id="weixin" class="qrcode" v-show="!isShowForm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSMS, phoneRegin, getuserProfiles } from "../request/httpApi";
import bus from "./bus";

export default {
  data() {
    return {
      isShowForm: true,
      visible: false, // 控制弹框的显示隐藏
      phoneNum: "13288994464", // 手机号码
      slideMsg: "向右滑动", //滑块显示文字
      slideSuc: false, //滑块默认状态
      phoneCode: "3502",
      showCode: false, //显示秒数
      count: 60, //默认秒数
    };
  },
  // beforeCreate() {},
  created() {
    bus.$on("loginopen", (visible) => {
      this.visible = visible;
    });
  },
  methods: {
    weixinClick() {
      // 点击切换微信扫码登录这一项，并向微信扫码登录
      this.isShowForm = false;

      // 微信登录第一步：申请微信登录二维码
      let _this = this;
      new WxLogin({
        id: "weixin",
        appid: "wx67cfaf9e3ad31a0d", // 这个appid要填死
        scope: "snsapi_login",
        // 扫码成功后重定向的接口
        redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
        // state填写编码后的url
        state: encodeURIComponent(
          window.btoa("http://192.168.6.165:8080" + _this.$route.path)
        ),
        // 调用样式文件
        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlLCAuaW1wb3dlckJveCAuaW5mb3sNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KDQouaW1wb3dlckJveCAucXJjb2Rlew0KICAgIG1hcmdpbi10b3A6IDIwcHg7DQp9",
      });
    },
    //验证电话输入框滑块
    toVertify() {
      const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg.test(this.phoneNum)) {
        this.$toast({
          message: "手机号码不正确",
          type: "error",
        });
        return false;
      } else if (!this.slideSuc) {
        this.$toast({
          message: "请滑动拼图",
          type: "error",
        });
        return false;
      }
      return true;
    },
    //获取验证码
    getPhoneCode() {
      if (this.toVertify() && !this.showCode) {
        // 通过校验
        this.showCode = true;
        const timer = setInterval(() => {
          if (this.count > 1) {
            this.count--;
          } else {
            // 定时器清除
            clearInterval(timer);
            // 恢复默认状态
            this.showCode = false;
            this.count = 60;
          }
        }, 1000);
        //发送验证码
        sendSMS({
          phone: this.phoneNum,
        }).then((res) => {});
      }
    },
    onSuccess() {
      this.slideSuc = true;
    },
    onFail() {
      this.slideSuc = false;
    },
    onRefresh() {
      this.slideSuc = false;
    },
    close() {
      //关闭弹窗
      this.visible = false;
      // 重置输入内容和滑块
      this.phoneNum = "";
      this.phoneCode = "";
      this.$refs.slideVerify.reset();
      this.const = 0;
    },
    // 点击登录按钮
    loginFn() {
      if (this.toVertify() && this.phoneCode.length === 4) {
        //通过校验
        phoneRegin({
          verifyCode: this.phoneCode,
          phone: this.phoneNum,
        }).then((res) => {
          console.log(res);
          if (res.code === 0) {
            localStorage.setItem("token", res["x-auth-token"]);
            this.$store.dispatch("getUserInfo").then((res) => {
              this.close();
            });
            getuserProfiles().then((res) => {
              //获取到用户信息
              //  console.log(res);
              //存储到vuex
              if (res.code === 0) {
                this.$store.commit("updateUserInfo", res.data);
                //关闭登录框
                this.close();
              }
            });
          }
        });
      }
      // 验证手机号码
      // let reg = /^1[3-9]\d{9}$/;  // 方式二
      // const reg =
      //   /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      // if (!reg.test(this.phoneNum)) {
      //   alert("手机号码格式不正确");
      //   return;
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .modal_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal_content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 555px;
    height: 423px;
    // background-color: #fff;
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
      .fonts {
        font-weight: 800;
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
          height: 50px;
        }
      }
      .slide-verify-slider {
        position: relative;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin-top: 15px;
        // background: #f7f9fa;
        // color: #45494c;
        // border: 1px solid #e4e7eb;
        margin: 20px auto 20px;
      }
      .yanzheng {
        width: 360px;
        margin: 0 auto 20px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        input {
          width: 100%;
          //   height: 50px;
        }
        .btn {
          color: #fff;
          background: #0a328e;
          text-align: center;
          width: 110px;
          margin-left: 10px;
          line-height: 50px;
          cursor: pointer;
          font-size: 14px;
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
    .qrcode {
      display: flex;
      justify-content: center;
      position: relative;
      top: -20px;
    }
  }
}
/deep/ .slide_box {
  width: 100%;
  position: relative;
  canvas {
    position: absolute;
    top: -145px;
    left: 0;
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
    .slide-verify-refresh-icon {
      display: block;
    }
  }
}
</style>