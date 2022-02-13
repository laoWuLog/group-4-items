<template>
  <div class="nav">
    <div class="wrap nav-wrap">
      <div class="l">
        <h1>
          <img src="../assets/img/indexLogo.6f8ac4f0.png" alt="" />
        </h1>
      </div>
      <div class="c">
        <ul>
          <li
            :class="$route.path === '/home' ? 'active' : ''"
            @click="$router.replace('/home')"
          >
            首页
          </li>
          <li
            :class="$route.path === '/goods' ? 'active' : ''"
            @click="$router.replace('/goods')"
          >
            全部商品
          </li>
          <li
            :class="$route.path === '/user' ? 'active' : ''"
            @click="$router.replace('/user')"
          >
            个人中心
          </li>
          <li
            :class="$route.path === '/order' ? 'active' : ''"
            @click="$router.push('/order')"
          >
            我的订单
          </li>
          <li
            :class="$route.path === '/free' ? 'active' : ''"
            @click="$router.push('/free')"
          >
            专属福利
          </li>
        </ul>
      </div>
      <div class="r">
        <input type="text" placeholder="输入关键字" />
        <span><img src="../assets/img/search.png" alt="" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav {
  width: 1200px;
  margin: 0 auto;
  .nav-wrap {
    height: 118px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .c {
      ul {
        width: 500px;
        display: flex;
        justify-content: space-between;
      }

     .active {
        color: rgb(45, 45, 146);
      }
    }
    .r {
      display: flex;
      justify-content: space-between;
      input {
        width: 147px;
        height: 25px;
        //   background: #dedede;
        border-radius: 10px 0px 0 10px;
        opacity: 1;
        border: 1px solid #dedede;
      }
      input:focus {
        outline: none;
        border: 1px solid #cccccc;
        //   background: #f0ecec;
      }
    }
  }
  span {
    display: inline-block;
    width: 30px;
    height: 29px;
    background: #0a328e;
    border-radius: 0 10px 10px 0px;
    opacity: 1;
    text-align: center;
    img {
      //   width: 30px;
      vertical-align: middle;
      margin-top: 5px;
    }
  }
}
</style>