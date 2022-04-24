<template>
  <div class="commodity-detail">
    <header-pub></header-pub>

    <div class="detail-content">
      <div class="detail-title">
        <van-icon name="arrow-left"
                  class="arrow-left-cl"
                  @click="clickBack" />
        <span class="detail-word">商品详情</span>
      </div>
      <img :src="detailObj.img"
           alt=""
           class="detail-img">
      <div class="intro">
        <div class="intro-left van-multi-ellipsis--l2">{{ detailObj.title }}</div>
        <div class="intro-right">
          <p class="jifen">{{ detailObj.jifen }}积分</p>
          <p class="fen">剩余 {{ detailObj.last }}份</p>
        </div>
      </div>

      <div class="duih">
        <h2 class="title">兑换政策</h2>
        <p class="duih-intro">兑换成功后请至酒店前台领取,兑换成功后不可取消，退换</p>
        <img :src="detailObj.img"
             alt=""
             class="pro-img">
      </div>
    </div>

    <!-- 弹框 -->
    <div class="duih-alert" v-show="alertIsTrue">
      <div class="mask"></div>
      <div class="duih-cont">
        <p class="word">兑换失败</p>
        <p class="word">积分不足</p>
        <div class="btn-div">
        <div class="btn" @click="clickClose">确认</div>

        </div>
      </div>
    </div>

    <div class="detail-footer">
      <div class="detail-left"
           @click="clickBack">返 回</div>
      <div class="detail-right"
           @click="clickDuih">
        立即兑换
      </div>
    </div>

  </div>
</template>
<script>
import HeaderPub from '@/components/HeaderPub.vue'
import { Icon } from 'vant'
export default {
  name: 'room-list',
  components: {
    [Icon.name]: Icon,
    HeaderPub,
  },
  data() {
    return {
      alertIsTrue: false,
      detailObj: {},
    }
  },

  mounted() {
    console.log(this.$route.query)
    this.getData()
  },
  methods: {
    async getData() {
      let res = await this.$Http.getProInfo()
      this.proList = res.data
      this.detailObj = this.proList.filter((item) => {
        return item.id === this.$route.query.id
      })[0]
      console.log(this.detailObj)
    },
    clickBack() {
      this.$router.go(-1)
    },
    clickDuih() {
      this.alertIsTrue = true;
    },
    clickClose() {
      this.alertIsTrue = false;
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.commodity-detail {
  @include wh100();

  background-color: $bg;
  .detail-content {
    height: calc(100% - 138px);
    overflow-y: auto;
    .detail-title {
      padding: 0 0 7px 16px;
      background-color: #fff;
      .arrow-left-cl {
        width: 9px;
        height: 16px;
        margin-right: 13px;
      }
      .detail-word {
        font-size: 16px;
        font-weight: bold;
        color: #343434;
      }
    }

    .detail-img {
      width: 100%;
      height: 216px;
      margin-bottom: 8px;
    }
    .intro {
      @include flex-cl();
      padding: 15px 20px;
      margin-bottom: 8px;
      background-color: #fff;
      .intro-left {
        flex: 1;
        margin-right: 50px;
        font-size: 16px;
        line-height: 1.5;
        font-weight: bold;
      }
      .intro-right {
        flex: none;
        font-weight: bold;

        .jifen {
          margin-bottom: 10px;
          font-size: 16px;
          color: #bd9b56;
        }
        .fen {
          font-size: 11px;
          color: #9f9f9f;
        }
      }
    }

    .duih {
      padding: 20px;
      background-color: #fff;
      .title {
        margin-bottom: 13px;
        font-size: 17px;
        font-weight: bold;
        color: #d2ac60;
      }
      .duih-intro {
        margin-bottom: 13px;
        padding-left: 15px;
        font-size: 14px;
        line-height: 1.5;
      }
      .pro-img {
        width: calc(100% + 40px);
        margin-left: -20px;
      }
    }
  }

  .detail-footer {
    height: 60px;
    .detail-left {
      @include btn-cl();
      width: 30%;
      height: 100%;
      font-size: 13px;
      color: #ffffff;
    }
    .detail-right {
      @include btn-cl();
      width: 70%;
      height: 100%;
      background-color: $moneyColor;
      color: #fff;
      font-size: 13px;
    }
  }

  .duih-alert {
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
    }
    .duih-cont {
      position: fixed;
      left: calc(50% - 125px);
      top: 0;
      display: inline-block;
      margin: 200px auto 0;
      padding: 40px 0 34px;
      width: 272px;
      text-align: center;
      background-color: #fff;
      box-shadow: 0 0 5px 5px rgba(0,0,0,.2);
      .word {
        margin-bottom: 12px;
        font-size: 15px;
        font-weight: bold;
        color: #242424;
      }
      .btn-div {
        width: 100px;
        margin: 30px auto 0;
      }
      .btn {
        @include btn-cl();
        color: #fff;
      }
    }
  }
}
</style>
