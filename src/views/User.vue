<template>
  <div>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
        //1.删除token
      localStorage.clear();
      //2.跳转到首页
      this.$router.push("/index");
      //3.刷新
      location.reload();
      //3.设置vuex里面用户信息字段为null
      this.$store.commit("updateUserInfo", null);
    },
  },
};
</script>

<style>
</style>