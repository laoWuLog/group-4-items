<template>
  <div>首页</div>
</template>

<script>
import { getProductRec } from "../request/HttpApi";
export default {
  created() {
    //
    getProductRec().then((res) => {});
  },
};
</script>

<style>
</style>