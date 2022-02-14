<template>
  <div class="cart_page">
    <table>
      <thead>
        <tr>
          <th style="width: 8%">
            <i
              :class="[
                ' iconfont',
                selectAll
                  ? ' icon-yduifuxuankuangxuanzhong'
                  : '  icon-yduifuxuankuang',
              ]"
              @click="checkAll"
            ></i>
          </th>
          <th style="width: 30%">礼品信息</th>
          <th>兑换分数</th>
          <th>数量</th>
          <th>小计 (鸡腿)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(good, gidx) in goodList" :key="good.id">
          <td>
            <i
              :class="[
                'iconfont',
                good.checked
                  ? 'icon-yduifuxuankuangxuanzhong'
                  : 'icon-yduifuxuankuang',
              ]"
              @click="changeChecked(gidx)"
            ></i>
          </td>
          <td>
            <section>
              <img
                width="84"
                :src="'http://sc.wolfcode.cn' + good.coverImg"
                alt="列表图片"
              />
              <div class="info">
                <h5>{{ good.seriesTitle }}</h5>
                <p>{{ good.versionDescription }}</p>
              </div>
            </section>
          </td>
          <td>{{ good.coin }}鸡腿</td>
          <td>
            <div class="step">
              <span>-</span>
              <input type="text" disabled v-model="good.total" />
              <span>+</span>
            </div>
          </td>
          <td>{{ good.totalCost }}鸡腿</td>
          <td>
            <span class="del">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total">总计：<span>0鸡腿</span></div>
    <div class="submit">提交</div>
  </div>
</template>

<script>
import { getShopCarts } from "@/request/httpAPI"; //购物车
export default {
  data() {
    return {
      goodList: [], //购物车列表
      selectAll: false, //全选状态
    };
  },
  methods: {
    //全选功能
    checkAll() {
      this.selectAll = !this.selectAll;
      for (let i = 0; i < this.goodList.length; i++) {
        // this.goodList[i].checked = this.selectAll;//下面同样的问题(页面没更新)
        this.$set(this.goodList[i], "checked", this.selectAll);
      }
    },
    // 单选功能
    changeChecked(index) {
      // 把原来的选中状态取反
      // this.goodList[index].checked = !this.goodList[index].checked;
      // 问题:数据有发生变化,但是界面没有更新最新的值(vue2.x),可以使用$set方法解决(vue3.x没有$set方法,双向数据绑定没有用到0bject.defineProperty方法)
      // vm.$set(绑定的对象(obj),操作的属性(property),值(value))
      this.$set(this.goodList[index], "checked", !this.goodList[index].checked);

      // 关联全选
      let total = 0;
      this.goodList.forEach((item) => {
        if (item.checked) {
          total++;
        }
        if (total == this.goodList.length) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
      });
    },
  },
  created() {
    // 获取购物车
    getShopCarts().then((res) => {
      // console.log(res);
      if (res.code == 0) {
        // console.log(res);
        this.goodList = res.data;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.cart_page {
  background: #fff;
  table {
    width: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    color: #666;
    border-collapse: collapse;
    font-size: 14px;
    thead {
      background: #f2f2f2;
      th {
        padding: 19px 0;
        .iconfont {
          cursor: pointer;
        }
        .icon-yduifuxuankuangxuanzhong {
          color: #0a328e;
        }
      }
    }
    tbody {
      tr {
        td {
          vertical-align: middle;
          text-align: center;
          padding: 19px 0;
          table-layout: fixed; // td的宽度固定，不随内容变化
          .iconfont {
            cursor: pointer;
          }
          .icon-yduifuxuankuangxuanzhong {
            color: #0a328e;
          }
          section {
            padding-left: 20px;
            display: flex;
            box-sizing: border-box;
            img {
              margin-right: 12px;
            }
            .info {
              padding-top: 20px;
              flex: 1;
              overflow: hidden;
              box-sizing: border-box;
              text-align: left;
              h5 {
                overflow: hidden;
                color: #333;
                font-size: 18px;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 20px;
              }
              p {
                color: #666;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .step {
            width: 106px;
            height: 32px;
            margin: auto;
            span {
              float: left;
              width: 30px;
              height: 32px;
              display: block;
              border: solid 1px #d1d1d1;
              font-size: 20px;
              box-sizing: border-box;
              font-weight: normal;
              font-stretch: normal;
              line-height: 30px;
              letter-spacing: 0px;
              color: #999999;
              text-align: center;
              cursor: pointer;
              background: #fff;
            }
            input {
              box-sizing: border-box;
              width: 46px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
              line-height: 23px;
              letter-spacing: 0px;
              color: #666666;
              border: 0;
              border-top: 1px solid #d1d1d1;
              border-bottom: 1px solid #d1d1d1;
              background: #fff;
            }
          }
          .del {
            border: 1px solid #ececec;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            &:hover {
              color: #fff;
              background: #0a328e;
            }
          }
        }
      }
    }
  }
  .total {
    padding: 30px 0;
    text-align: right;
    font-size: 22px;
    span {
      font-weight: bold;
      color: #fd604d;
    }
  }
  .submit {
    width: 175px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-family: SourceHanSansSC-Light;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;
    background-color: #0a328e;
    float: right;
  }
}
</style>
