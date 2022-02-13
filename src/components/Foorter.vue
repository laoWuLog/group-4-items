<template>
  <div class="foorter">
    <div class="foorter-const">
      <div class="foorter-ltef">
        <img src="../assets/img/slogan.7730f7f2.png" alt="" />
        <p>
          叩丁狼是一家专注于培养高级IT技术人才，为学员提供定制化IT职业规划方案及意见咨询服务的教育科技公司，为您提供海量优质课程，以及创新的线上线下学习体验，帮助您获得全新的个人发展和能力提升。
        </p>
      </div>
      <ul class="foorter-center">
        <li>
          <a href="">微信公众号</a
          ><img src="" alt="" class="wx" style="display: none" />
        </li>
        <li>
          <a href="">新浪微博</a>
        </li>
        <li style="border: none">
          <a href="">在线客服</a
          ><img src="" alt="" class="service" style="display: none" />
        </li>
      </ul>
      <div class="foorter-right">
        <p>全国免费咨询热线：</p>
        <h2>020-85628002</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.foorter {
  position: relative;
  bottom: 0;
  background: #242b39;
  color: #7d879a;
  height: 240px;
  .foorter-const {
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .foorter-ltef {
      width: 426px;
      img {
        margin-top: 33px;
        margin-bottom: 27px;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
      }
    }
    .foorter-center {
      display: flex;
      justify-content: center;
      margin-top: 123px;
      li {
        border-right: 1px solid #7d879a;
        padding-right: 18px;
        padding-left: 18px;
        height: 19px;
        position: relative;
        a {
          color: #7d879a;
          text-decoration: none;
        }
      }
    }
    .foorter-right {
      padding-top: 92px;
      p {
        font-size: 14px;
        margin-bottom: 10px;
        color: #7d879a;
      }
      h2 {
        color: #fff;
        font-size: 28px;
        font-weight: 700;
      }
    }
  }
}
</style>