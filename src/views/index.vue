<template>
  <div>首页</div>
</template>

<script>
import { getProductRec } from "../request/httpApi";
export default {
  created() {
    // 获取精品推荐--axios的url在httpApi.js文件
    getProductRec().then((res) => {});
  },
};
</script>

<style>
</style>