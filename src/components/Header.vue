<template>
  <div class="header-wrapper">
    <div class="header-cont">
      <div class="header-logo">
        <img src="../assets/img/indexLogo.6f8ac4f0.png" alt="" />
      </div>
      <div class="header-center">
        <ul class="header-nav">
          <li><a href="">首页</a></li>
          <li><a href="">全部礼品</a></li>
          <li><a href="">个人中心</a></li>
          <li><a href="">我的订单</a></li>
          <li><a href="">专属福利</a></li>
        </ul>
      </div>
      <div class="header-input">
        <input type="text" placeholder="请输入关键字" />
        <div class="header-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" scoped>
.header-wrapper {
  padding-top: 12px;
  height: 99px;
  background: #fff;
  box-sizing: border-box;
  .header-cont {
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-center {
      padding: 30px 98px 0 68px;
      box-sizing: border-box;
      .header-nav {
        display: flex;
        align-items: center;
        li {
          padding-right: 53px;
          a {
            color: black;
            text-decoration: none;
          }
        }
        li:last-child {
          padding: 0;
        }
      }
    }
    .header-input {
      display: flex;
      margin-top: 25px;
      input {
        outline: none;
        border: 1px solid #eee;
        padding: 10px;
        box-sizing: border-box;
        border-radius:20px 0  0 20px;
      }
      .header-btn {
        width: 50px;
        height: 40px;
        background-color: #0a328e;
        background-image: url("../assets/img/search.png");
        background-size: 17px 17px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        border-radius:0 20px 20px 0 ;
      }
    }
  }
}
</style>