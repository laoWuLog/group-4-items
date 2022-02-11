<template>
  <div v-show="visible">
    <div class="modal">
      <div class="modal_bg"></div>
      <div class="modal_content">
        <img @click="close" src="../assets/img/close.png" alt="" />
        <section class="phoneOrwechat">
          <span
            class="border"
            :class="{ active: isShowForm }"
            @click="isShowForm = true"
            >手机号码登录</span
          >
          <span
            class=""
            :class="{ active: !isShowForm }"
            @click="showWeixinRecode"
            >微信扫码登录</span
          >
        </section>
        <!-- 手机号码登录内容 -->
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
              ref="slider"
              class="slide_box"
              :slider-text="sliderMag"
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
            <div class="btn" @click="verify">
              <span v-if="showCode">获取验证码</span>
              <span v-else>{{ count }}秒</span>
            </div>
          </div>
          <div class="btn_login" @click="loginFn">登录</div>
        </div>
        <!-- 微信二维码 -->
        <div id="weixin" class="qrcode" v-show="!isShowForm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import toast from "../components/Toast/index";
import { getSMS, getPhoneRegin, getUserProfiles } from "../request/httpAPI";
export default {
  data() {
    return {
      visible: false, // 控制弹框的显示隐藏
      phoneNum: "", // 手机号码
      sliderMag: "向右滑动",
      sliderSuc: true, //滑块状态
      phoneCode: "", //手机验证码
      showCode: true, //获取验证码
      count: 3, //倒计时
      isShowForm: true, //二维码显示
    };
  },
  computed: {
    nickName() {
      return this.$store.state.userInfo?.userInfo.nickName;
    },
    coin() {
      return this.$store.state.userInfo?.userInfo.coin;
    },
  },
  // beforeCreate() {},
  created() {
    bus.$on("loginvisible", (visible) => {
      this.visible = visible;
    });
  },
  methods: {
    // 微信二维码显示
    showWeixinRecode() {
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
          window.btoa("http://127.0.0.1:8080" + _this.$route.path)
        ),
        // 调用样式文件
        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlLCAuaW1wb3dlckJveCAuaW5mb3sNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KDQouaW1wb3dlckJveCAucXJjb2Rlew0KICAgIG1hcmdpbi10b3A6IDIwcHg7DQp9",
      });
    },
    // 获取验证码
    verify() {
      // console.log(this.checking(), this.showCode);
      if (this.checking() && this.showCode) {
        this.showCode = false;
        const timer = setInterval(() => {
          if (this.count > 1) {
            this.count--;
          } else {
            clearInterval(timer);
            this.count = 3;
            this.showCode = true;
          }
        }, 1000);
        // 发送请求
        getSMS({
          phone: this.phoneNum,
        }).then((res) => {
          console.log(res);
        });
      }
    },
    // 验证手机号码与滑块状态
    checking() {
      // 验证手机号码
      // let reg = /^1[3-9]\d{9}$/;
      const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg.test(this.phoneNum)) {
        // alert("手机号码格式不正确");
        this.$toast({
          message: "手机号码格式不正确",
          type: "error",
          duration: 3000,
        });
        return false;
      } else if (!this.sliderSuc) {
        alert("请重新验证滑块");
        this.$toast({
          message: "请重新验证滑块",
          type: "error",
          duration: 3000,
        });
        return false;
      }
      return true;
    },
    // 滑动成功回调的函数
    onSuccess(time) {
      console.log((time / 1000).toFixed() + "秒");
      this.sliderSuc = true;
    },
    // 滑动失败回调的函数
    onFail() {
      this.sliderSuc = false;
    },
    // 刷新回调的函数
    onRefresh() {
      this.sliderSuc = false;
    },
    // 关闭回调的函数
    close() {
      // 初始化
      this.visible = false;
      this.phoneNum = "";
      this.phoneCode = "";
      this.$refs.slider.reset(); // ref 类似于id,获取元素
    },
    // 点击登录按钮
    loginFn() {
      if (this.checking() && this.phoneCode.length == 4) {
        // 通过验证 发送手机注册请求
        getPhoneRegin({
          verifyCode: this.phoneCode,
          phone: this.phoneNum,
        }).then((res) => {
          console.log(res);
          if (res.code == 0) {
            localStorage.setItem("token", res["x-auth-token"]);
            // 发送获取用户信息请求
            getUserProfiles().then((res) => {
              // console.log(res);
              if (res.code === 0) {
                this.$store.commit("updateUserInfo", res.data);
                this.close(); //关闭窗口
              }
            });
          }
        });
      }

      // // 验证手机号码
      // // let reg = /^1[3-9]\d{9}$/;
      // const reg =
      //   /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      // if (!reg.test(this.phoneNum)) {
      //   alert("手机号码格式不正确");
      //   return;
      // } else if (!this.sliderSuc) {
      //   alert("请重新验证滑块");
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
      .border {
        border-right: 1px solid #ccc;
        padding-right: 10px;
        margin-right: 10px;
      }
      .active {
        font-weight: 700;
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
// 微信二维码
.qrcode {
  display: flex;
  justify-content: center;
  margin-top: -20px;
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