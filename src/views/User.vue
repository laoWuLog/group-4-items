<template>
  <div>user
      <div>
          <button @click='logout'>退出登录</button>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        logout(){
            // 1.删除token
            localStorage.clear();
            // 2.跳转到首页
            this.$router.push('/index');
            // 3.刷新---两个方法
            // (1)设置location跳转---缺点:刷新的时候会有一段时间空白
            // location.reload();
            // (2)设置vuex里面用户信息字段为null
            this.$store.commit('updateUserInfo',null);
        }
    }
}
</script>

<style>

</style>