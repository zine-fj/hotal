<template>
  <div class="order">
    <header-pub></header-pub>
    <van-tabs v-model="active" color="#D2AC60" animated @click="onClick" sticky>
      <van-tab
        :title="tab.title"
        v-for="(tab, index) of tabList"
        :key="tab.id + index"
        :badge="tab.badge"
      >
        <ul class="order-list">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <li
                class="order-count"
                v-for="(order, index) of orderObj.list"
                :key="order.id + index"
              >
                <div class="order-time">预定时间 {{ order.time }}</div>
                <div class="order-detail" @click="clickOrderDetail">
                  <h2 class="title">{{ order.title }}</h2>
                  <div class="detail-list">
                    <div class="order-div">
                      <span class="order-left">订单号：</span>
                      <span class="order-right">{{ order.number }}</span>
                    </div>
                    <div class="order-div">
                      <span class="order-left">房&nbsp;&nbsp;&nbsp;型：</span>
                      <span class="order-right">{{ order.type }}</span>
                    </div>
                    <div class="order-div">
                      <span class="order-left">入&nbsp;&nbsp;&nbsp;住：</span>
                      <span class="order-right">{{ order.zhuTime }}</span>
                    </div>
                    <div class="order-div order-tui">
                      <span class="order-left">退&nbsp;&nbsp;&nbsp;房：</span>
                      <span class="order-right">
                        <span class="tui-time">{{ order.tuiTime }}</span>不可取消
                      </span>
                    </div>
                  </div>
                  <div class="detail-footer">
                    <div class="detail-left">
                      <span class="money-word">订单总价：</span>
                      <span class="money-number">￥{{ order.allMoney }}</span>
                    </div>
                    <div class="detail-right" v-if="orderObj.id != 'daidp'">
                      <div class="detail-btn" @click="clickPay(order)">立即支付</div>
                      <div class="detail-btn detail-btn-1" @click="clickCancelOrder">取消订单</div>
                    </div>
                    <div class="detail-right" v-if="orderObj.id == 'daidp'">
                      <div class="detail-btn" @click="clickAssess">评价</div>
                    </div>
                  </div>
                </div>
              </li>
            </van-list>
          </van-pull-refresh>

          <div class="last-intro">仅展示近半年内100条订单记录</div>
        </ul>
      </van-tab>
    </van-tabs>

    <!-- 取消订单 -->
    <div class="order-cancel" v-show="cancelOrder">
      <div class="mask"></div>
      <div class="cancel-count">
        <div class="title">真的要取消订单吗？</div>
        <div class="cancel-footer">
          <span class="btn" @click="clickCancelOrderBtn">返回订单</span>
          <span class="btn btn-1" @click="clickCancelOrderBtn">确认取消</span>
        </div>
      </div>
    </div>

    <!-- 订单详情 -->
    <div class="detail-div" v-show="detailShow">
      <div class="detail-mask"></div>
      <img src="../../assets/images/close.png" alt class="close-img" @click="clickCloseDetail" />
      <div class="detail-cont">
        <ul class="detail-list">
          <li class="detail-li">
            <span class="detail-li-left">房型信息：</span>
            <span class="detail-li-right">{{ detailObj.intro }}</span>
          </li>
          <li class="detail-li">
            <span class="detail-li-left">入&nbsp;&nbsp;住&nbsp;&nbsp;人：</span>
            <span class="detail-li-right">{{ detailObj.people }}</span>
          </li>
          <li class="detail-li">
            <span class="detail-li-left">联系电话：</span>
            <span class="detail-li-right">{{ detailObj.phone }}</span>
          </li>
          <li class="detail-li">
            <span class="detail-li-left">预计到店：</span>
            <span class="detail-li-right">{{ detailObj.time }}</span>
          </li>
          <li class="detail-li">
            <span class="detail-li-left">入住时间：</span>
            <span class="detail-li-right">{{ detailObj.throuTime }}</span>
          </li>
          <li class="detail-li">
            <span class="detail-li-left">积分抵扣：</span>
            <span class="detail-li-right">{{ detailObj.jifen }}</span>
          </li>
          <div class="detail-li-line"></div>
          <li class="detail-li">
            <span class="detail-li-left">订&nbsp;&nbsp;单&nbsp;&nbsp;号：</span>
            <span class="detail-li-right">{{ detailObj.orderNumber }}</span>
          </li>
        </ul>
        <div class="detail-footer">
          <h2 class="detail-title">取消政策</h2>
          <div class="footer-cont">
            预订成功后，下午
            <span class="yellow">6：00</span>前不可取消、变更订单/申请 退款或退券
          </div>
          <h2 class="detail-title">温馨提示</h2>
          <div class="footer-cont">酒店于住店当天14:00后办理入住，离店当天12:00前</div>
        </div>
      </div>
    </div>

    <footer-pub></footer-pub>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import FooterPub from '@/components/FooterPub.vue'
import { Tab, Tabs, Badge, List, PullRefresh } from 'vant'

export default {
  name: 'Order',
  components: {
    HeaderPub,
    FooterPub,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Badge.name]: Badge,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      active: 0,
      tabList: [
        { title: '全部', id: 'all', badge: '' },
        { title: '待付款', id: 'daifk', badge: '' },
        { title: '待入住', id: 'dairz', badge: '' },
        { title: '待点评', id: 'daidp', badge: '3' },
      ],
      orderObj: {
        list: [],
      },
      allObj: {},
      detailObj: {},
      detailShow: false,
      clickIndex: 0, // 点击第几个tab
      cancelOrder: false,
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  mounted() {
    this.getData()
    this.getDetailData()
  },
  methods: {
    async getData() {
      let res = await this.$Http.getOrderInfo()
      console.log(res)
      this.allObj = res.data
      this.orderObj = this.allObj[this.clickIndex]
    },
    // 获取详情
    async getDetailData() {
      let res = await this.$Http.getDetail()
      console.log('detal: ', res)
      this.detailObj = res.data
    },
    // 点击详情
    clickOrderDetail() {
      this.detailShow = true
    },
    clickCloseDetail() {
      this.detailShow = false
    },
    // 点击tab事件
    onClick(index) {
      console.log(index)
      this.clickIndex = index
      this.orderObj = this.allObj[index]
    },
    // 点击评价
    clickAssess() {
      this.$router.push({ name: 'OrderAssess' })
    },
    // 取消订单
    clickCancelOrder() {
      this.cancelOrder = true
    },
    clickCancelOrderBtn() {
      this.cancelOrder = false
    },
    // 立即支付
    clickPay(param) {
      console.log(param)
      this.$router.push({ name: 'PayResult' })
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getData()
      this.onLoad()
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.refreshing) {
          this.orderObj.list = this.orderObj.list.splice(0, 3)
          this.refreshing = false
        }
        console.log('this.loading: ', this.loading)
        this.orderObj.list.push(...this.orderObj.list)
        console.log(this.orderObj.list)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.orderObj.list.length >= 20) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixin.scss";

::v-deep .van-sticky {
  // 可用
  top: 78px;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 99;
}
::v-deep .van-info {
  background-color: #d2ac60;
}

// 取消订单
.order-cancel {
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .cancel-count {
    position: fixed;
    left: calc(50% - 136px);
    width: 272px;
    top: 180px;
    background-color: #fff;
    padding: 0 26px 34px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
    .title {
      padding: 55px 0 45px;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      color: $fontColor;
    }
    .cancel-footer {
      display: flex;
      justify-content: space-between;
      .btn {
        @include flex-cl-center();
        width: 102px;
        height: 33px;
        margin-left: 10px;
        font-size: 13px;
        background-color: $fontColor;
        color: #fff;
      }
      .btn-1 {
        background-color: #fff;
        color: #d2ac60;
        border: 1px solid #d2ac60;
      }
    }
  }
}

.order {
  @include wh100();
  background-color: $bg;
  height: calc(100% - 50px);

  .order-list {
    margin-top: 43px;
    .order-count {
      .order-time {
        padding: 10px 0 7px 15px;
        font-size: 12px;
        color: #939393;
      }
      .order-detail {
        background-color: #fff;
        padding: 19px 19px 0 16px;
        .title {
          font-size: 13px;
          font-weight: bold;
          color: #242424;
        }
        .detail-list {
          position: relative;
          padding-bottom: 34px;

          .order-div {
            margin-top: 21px;
            font-size: 12px;
            font-weight: bold;
            color: #646464;
          }
          .order-tui {
            position: absolute;
            right: 19px;
            bottom: 34px;
            .tui-time {
              color: #ff4734;
            }
          }
        }
        .detail-footer {
          width: calc(100% + 35px);
          margin-left: -15px;
          height: 60px;
          padding: 0 18px 0 15px;
          @include flex-cl();
          border-top: 1px solid #f1f1f1;
          .detail-left {
            font-size: 14px;
            .money-word {
              color: $fontColor;
            }
            .money-number {
              color: #ff4734;
            }
          }
          .detail-right {
            display: flex;
            align-items: center;
            .detail-btn {
              @include flex-cl-center();
              width: 84px;
              height: 27px;
              margin-left: 10px;
              font-size: 13px;
              background-color: $fontColor;
              color: #fff;
            }
            .detail-btn-1 {
              background-color: #fff;
              color: #d2ac60;
              border: 1px solid #d2ac60;
            }
          }
        }
      }
    }
    .last-intro {
      padding: 18px;
      text-align: center;
      color: #939393;
      font-size: 13px;
    }
  }
}

// 订单详情
.detail-div {
  .detail-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    // background-color: rgba(0, 0, 0, 0.5);
  }
  .close-img {
    position: fixed;
    left: calc(50% - 23px);
    top: 552px;
    z-index: 102;
    width: 47px;
    height: 47px;
  }
  .detail-cont {
    position: fixed;
    left: 31px;
    top: 180px;
    z-index: 101;
    width: calc(100% - 62px);
    max-height: 350px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .detail-list {
      padding: 10px 0;
      .detail-li {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 16px;
        font-size: 13px;
        .detail-li-left {
          color: #9b9b9b;
        }
      }
      .detail-li-line {
        width: 100%;
        height: 5px;
        margin: 10px 0;
        background-color: #f7f7f7;
      }
    }
    .detail-footer {
      background-color: #f7f7f7;
      padding: 14px 19px 14px 15px;
      font-size: 12px;
      .detail-title {
        font-weight: bold;
        color: #646464;
        margin-bottom: 10px;
      }
      .footer-cont {
        color: #646464;
        line-height: 1.5;
        margin-bottom: 10px;
        .yellow {
          color: #bd9b56;
        }
      }
    }
  }
}
</style>