<template>
  <div class="login">
    <div class="login-box">
      <div class="login-body">
        <ul>
          <li class="bor">手机号码登录</li>
          <li>微信扫码登录</li>
        </ul>
        <div class="login-input">
          <input type="text" placeholder="请输入手机号码" />
          <div>我是滑块</div>
          <div class="login-verification">
            <input type="text" placeholder="请输入短信验证码" />
            <button>获取验证码</button>
          </div>
          <button>登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
      }
    }
  }
}
</style>