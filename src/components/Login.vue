<template id='login_alert'>
  <div class="login_bg">
    <div>
      <ul>
        <li>手机号码登录</li>
        <li>
          <span>|</span>
          微信扫码登录
        </li>
      </ul>
      <input type="text" placeholder="请输入手机号">
      <p>向右滑动填充拼图</p>
      <input type="text" placeholder="请输入短信验证码">
      <input type="button" value="获取验证码">
      <button>登录</button>
    </div>
  </div>
</template>

<script>
export default {
  template: "#login_alert",
};
</script>

<style lang = "less" scoped>
    .login_alert{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
       /*  bottom: 0;
        right: 0; */
        .mask{
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
        }
        .login_bg{
            position:  absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin:auto;
            width: 555px;
            height: 423px;
            background: url("../assets/img/login-box-bg.png");
        }
    }
</style>