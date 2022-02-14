<template>
  <div class="person_page">
    <div class="person wrap">
      <main>
        <aside>
          <div
            class="avatar"
            style="
              background-image: url('https://thirdwx.qlogo.cn/mmopen/vi_32/ibr3H84CVP7JfPFZzXUrjrHwuSwuXo6DEZPGO8fwOsK7LsIONZWlrOzbe7kicsGaqDXgDdsQ1zic3hHR4dV4jcP0Q/132');
            "
          ></div>
          <div class="name">
            terry
            <span style="cursor: pointer">[退出]</span>
          </div>
          <div class="title">
            <img
              src="../assets/img/transaction.png"
              width="20"
              alt="交易管理"
            />
            交易管理
          </div>
          <ul class="list">
            <li>个人中心</li>
            <li>我的订单</li>
            <li class="active">购物车</li>
            <li>消息通知</li>
            <li>积分明细</li>
            <li>积分攻略</li>
          </ul>
          <div class="title">
            <img
              src="../assets/img/transaction.png"
              width="20"
              alt="交易管理"
            />
            个人信息管理
          </div>
          <ul class="list">
            <li>地址管理</li>
            <li>账号安全</li>
          </ul>
        </aside>
        <article><router-view></router-view></article>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    loginOut() {
      // 1.删除token
      localStorage.clear();
      // 2.跳转到首页
      this.$router.push("/index");
      // 3.设置vuex里面用户信息字段为null
      this.$store.commit("updateUserInfo", null);
    },
  },
};
</script>
<style lang="less" scoped>
@base-color: #0a328e;

.wrap {
  width: 1200px;
  margin: 0 auto;
}

input {
  outline: none;
  padding: 0;
}

// 原子类
.mb20 {
  margin-bottom: 20px;
}
.person_page {
  background: #fff;
  main {
    border-top: 1px solid #e1e1e1;
    padding: 28px 0 48px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    aside {
      width: 200px;
      height: 740px;
      background: #e7e7e7;
      margin-right: 60px;
      box-sizing: border-box;
      padding: 30px 18px 0;
      .avatar {
        width: 100px;
        height: 100px;
        margin: auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .name {
        text-align: center;
        margin-top: 19px;
        margin-bottom: 43px;
        span {
          text-decoration: underline;
          color: #2a5df1;
        }
      }
      .title {
        font-size: 16px;
        color: #333333;
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        img {
          margin-right: 6px;
        }
      }
      .list {
        li {
          margin-bottom: 17px;
          font-weight: 300;
          color: #666666;
          cursor: pointer;
          &.active {
            color: @base-color;
            font-weight: bold;
            &::before {
              width: 2px;
              height: 14px;
              background: @base-color;
              display: inline-block;
              content: "";
              margin-right: 10px;
            }
          }
        }
      }
    }
    article {
      flex: 1;
      padding: 20px 0 0 0px;
      box-sizing: border-box;
      background: #fff;
    }
  }
}
</style>
