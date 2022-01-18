<template></template>

<script>
import { recommend } from "../request/httpAPI";
export default {
  created() {
    recommend().then((res) => {
      console.log(res.data);
    });
  },
};
</script>

<style>
</style>