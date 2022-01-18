<template>
  <div class="recommend">
    <div class="recommend_head">
      <div class="left">
        <img src="../assets/img/jingpin.png" alt="" />
        <span><h1>精品推荐</h1></span>
      </div>
      <div class="right">
        <a href="#">
          <span>更多</span>
          <img src="../assets/img/arrow.png" alt="" />
        </a>
      </div>
    </div>
    <div class="recommend_body"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.recommend {
  width: 1200px;
  margin: 0 auto;
  .recommend_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      img {
        width: 20px;
        height: 18px;
      }
      h1 {
        width: 60px;
        height: 15px;
        font-size: 15px;
        font-weight: bold;
        color: #242b39;
        line-height: 11px;
        margin-left: 5px;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: inline-block;
        width: 24px;
        height: 8px;
        font-size: 8px;
        font-weight: 300;
        color: #666666;
        line-height: 11px;
        margin-right: 3px;
      }
      img {
        vertical-align: middle;
      }
    }
  }
}
</style>