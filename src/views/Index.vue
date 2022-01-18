<template>
  <div>首页</div>
</template>

<script>
import { getProductRec } from "../request/httpApi";
export default {
    created(){
        getProductRec().then((res)=>{})
    }
};
</script>

<style>
</style>