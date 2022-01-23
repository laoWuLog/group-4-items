<template>
  <div v-show="visible">
    <div class="modal">
      y
      <div class="modal_bg"></div>
      <div class="modal_content">
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
            <div class="btn" @click="getphoneCode">
              <span v-if="!showCode">获取验证码</span>
              <span v-else>{{ count }} s</span>
            </div>
          </div>
          <div class="btn_login" @click="loginFn">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSMS,getUserProfiles ,phoneRegin } from '../request/HttpApi';
import bus from "./bus";
export default {
  data() {
    return {
      visible: false, // 控制弹框的显示隐藏
      phoneNum: "", // 手机号码
      slibeMsg: "向右滑动", // 滑块显示文字
      slibeSuc: true,
      phoneCode: "",
      showCode: false, // 显示秒数
      count: 60,

    };
  },
  // beforeCreate() {},
  created() {
    bus.$on("loginvisible", (visible) => {
      this.visible = visible;
    });
  },
  methods: {
    // 验证电话输入框和滑块
    toVertify() {
      const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg.test(this.phoneNum)) {
        // alert("手机号码格式不正确");
       this.$toast({
          message: '手机号码格式不正确',
          type: 'error'
        })
        return false;
console.error();        // alert("请滑动拼图");

        return false;
      }
      return true;
    },
    // 获取验证码
    getphoneCode() {
      // 验证电话输入框和滑块
      if (this.toVertify() && !this.showCode) {
        // 通过校验
        this.showCode = true;
        const timer = setInterval(() => {
          if (this.count > 0) {
            this.count--;
          } else {
            // 定时器清除
            clearInterval(timer);
            // 按钮显示文字
            this.showCode = false;
            this.count = 60;
          }
        },1000);
      }
      // 发送请求
      sendSMS({
        phone:this.phoneNum
      }).then(res=>{

      })
    },
    onSuccess() {
      this.slibeSuc = true;
    },
    onFail() {
      this.slibeSuc = false;
    },
    onRefresh() {
      this.slibeSuc = false;
    },
    close() {
      this.visible = false;
      this.phoneNum = "";
      this.phoneCode = "";
      this.$refs.slideVerify.reset();
      this.count=0;
    },
    // 点击登录按钮
    loginFn() {
     if (this.toVertify() && this.phoneCode.length === 4) {
        // 通过校验
        phoneRegin({
          verifyCode: this.phoneCode,
          phone: this.phoneNum,
        }).then((res) => {
          console.log(res)
          if (res.code === 0) {
            localStorage.setItem("token", res["x-auth-token"]);
            // 获取用户信息
            getUserProfiles().then((res) => {
              // 拿到用户信息处理
            });
          }
        });
      }
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
        background: #f7f9fa;
        color: #45494c;
        border: 1px solid #e4e7eb;
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