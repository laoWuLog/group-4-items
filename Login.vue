<template>
  <div v-show="visible">
    <div class="modal">
      <div class="modal_bg"></div>
      <div class="modal_content">
        <img @click="close" src="../assets/img/close.png" alt="" />
        <section class="phoneOrwechat">
          <span
            class="border"
            :class="{ 'active': showForm }"
            @click="showForm = true"
            >手机号码登录</span
          >
          <span :class="{ 'active': !showForm }" @click="showWechatRrcode">
            微信扫码登录</span
          >
        </section>
        <!-- 手机号码登录内容 -->
        <div class="phone_login" v-show="showForm">
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
              :slider-text="slideMsg"
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
              <span v-else>{{ count }} s</span>
            </div>
          </div>
          <div class="btn_login" @click="loginFn">登录</div>
        </div>
        <!-- 微信二维码 -->
        <div class="qrcode" v-show="!showForm" id="weixin"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import { sendSMS, phoneRegin, getUserProfiles } from "../request/httpApi";
export default {
  data() {
    return {
      visible: false, // 控制弹框的显示隐藏
      phoneNum: "", // 手机号码
      slideMsg: "向右滑动", // 滑块显示文字
      slideSuc: false,
      phoneCode: "3395",
      showCode: false, // 显示秒数
      count: 60,
      showForm: true,
    };
  },
  // beforeCreate() {},
  created() {
    bus.$on("loginvisible", (visible) => {
      this.visible = visible;
    });
  },
  methods: {
    // 显示微信扫码登录
    showWechatRrcode() {
      this.showForm = false;
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
          window.btoa("http://127.0.0.1:8080" + _this.$route.path)
        ),
        // 调用样式文件
        href: "",
      });
    },
    // 验证电话输入框和滑块
    toVertify() {
      const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg.test(this.phoneNum)) {
        // alert("手机号码格式不正确");
        this.$toast({
          message: "手机号码格式不正确",
          type: "error",
        });
        return false;
      } else if (!this.slideSuc) {
        // alert("请滑动拼图");
        this.$toast({
          message: "请滑动拼图",
          type: "error",
        });
        return false;
      }
      return true;
    },
    // 点击获取验证码按钮
    getPhoneCode() {
      // 验证电话输入框和滑块
      if (this.toVertify() && !this.showCode) {
        // 通过校验
        this.showCode = true;
        const timer = setInterval(() => {
          if (this.count > 1) {
            this.count--;
          } else {
            // 定时器清除
            clearInterval(timer);
            // 按钮显示文字
            this.showCode = false;
            this.count = 60;
          }
        }, 1000);
        // 发送验证码
        sendSMS({
          phone: this.phoneNum,
        }).then((res) => {});
      }
    },
    // 点击登录按钮
    loginFn() {
      if (this.toVertify() && this.phoneCode.length === 4) {
        // 通过校验
        phoneRegin({
          verifyCode: this.phoneCode,
          phone: this.phoneNum,
        }).then((res) => {
          console.log(res);
          if (res.code === 0) {
            localStorage.setItem("token", res["x-auth-token"]);
            // 获取用户信息
            this.$store.dispatch("getUserInfo").then((res) => {
              this.close();
            });
            // getUserProfiles().then((res) => {
            //   // 拿到用户信息处理(存储到vuex)
            //   if (res.code === 0) {
            //     this.$store.commit('updateUserInfo', res.data);
            //     // 关闭登录框
            //     this.close();
            //   }
            // });
          }
        });
      }
      // // 验证手机号码
      // // let reg = /^1[3-9]\d{9}$/;  // 方式二
      // const reg =
      //   /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      // if (!reg.test(this.phoneNum)) {
      //   alert("手机号码格式不正确");
      //   return;
      // } else if (!this.slideSuc) {
      //   alert("请滑动拼图");
      //   return;
      // }
    },
    // 成功后的回调
    onSuccess(time) {
      this.slideSuc = true;
      // const sec = (time/1000).toFixed(1);
      // console.log(sec);
      // this.slideMsg = '耗时 ' + sec + 's';
    },
    onFail() {
      this.slideSuc = false;
    },
    onRefresh() {
      this.slideSuc = false;
      // this.slideMsg = '向右滑动'
    },
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
      .border {
        border-right: 1px solid #ccc;
        padding-right: 10px;
        margin-right: 10px;
      }
      .active {
        font-weight: bold;
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
.qrcode {
  display: flex;
  justify-content: center;
  margin-top: -69px;
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