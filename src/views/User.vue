<template>
  <div>
    user
    <div>
      <button @click="add">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    add(){
      // 1. 删除token
      localStorage.clear();
      // 2. 跳转到首页
      this.$router.push('/index')
      //  3. 第一种方法 刷新一下
      // location.reload()
      //  第二种方法 设置vuex里面的信息字段为null
      this.$store.commit('updateUserInfo',null)
    }
  },

}
</script>

<style>

</style>