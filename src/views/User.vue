<template>
  <div>
    <p>user</p>
    <div>
      <button @click="loginOut">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
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
</style>