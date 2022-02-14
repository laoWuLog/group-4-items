<template>
  <div class="banner">
    <!-- <img src="../assets/img/banner.f559b49d.png" alt="" @click="toDetail" /> -->
  </div>
</template>

<script>
export default {
  methods: {
    toDetail() {
      this.$router.push("/detail/139");
    },
  },
};
</script>

<style lang="less" scoped>
// .banner {
//   width: 1200px;
//   margin: 0px auto 20px;
// }
</style>