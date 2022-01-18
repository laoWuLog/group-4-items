<template>
  <div class="header">
    <div class="header_container">
      <h1>
        <a href="#">
          <img src="../assets/img/indexLogo.6f8ac4f0.png" alt=""
        /></a>
      </h1>

      <ul class="header_nav">
        <li :class="$route.path == '' ? 'active' : ''" class="index">首页</li>
        <li :class="$route.path == '' ? 'active' : ''">全部商品</li>
        <li :class="$route.path == '' ? 'active' : ''">个人中心</li>
        <li :class="$route.path == '' ? 'active' : ''">我的订单</li>
        <li :class="$route.path == '' ? 'active' : ''">专属福利</li>
      </ul>

      <div class="header_search">
        <input type="text" placeholder="请输入关键字" class="header_input" />
        <div id="search"><img src="../assets/img/search.png" alt="" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
// 头部模块
.header {
  .header_container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    // 头部导航
    .header_nav {
      width: 400px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .index {
        font-weight: 700;
        color: #0a328e;
      }
      .active {
        color: #0a328e;
      }
      li:hover {
        cursor: pointer;
        font-weight: 700;
        color: #0a328e;
      }
    }
    //  头部搜索
    .header_search {
      display: flex;
      justify-content: space-between;
      .header_input {
        width: 107px;
        height: 18px;
        border: #dedede;
        border-radius: 10px 0 0 10px;
        border: 1px solid #dedede;
        padding: 5px;
        outline: 0;
        &::-webkit-input-placeholder {
          font-size: 10px;
          color: #999999;
        }
        &:focus {
          // border: 1px solid #333;
          box-shadow: 0 0 5px 1px #03a9f4;
        }
      }
      #search {
        width: 25px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #0a328e;
        // background: url("../assets/img/search.png") no-repeat;
        border-radius: 0px 10px 10px 0px;
        cursor: pointer;
        img {
          width: 9px;
          height: 9px;
          // vertical-align: middle;
        }
      }
    }
  }
}
</style>