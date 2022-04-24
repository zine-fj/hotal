<template>
  <div class="member">
    <header-pub :bg="'hui'"></header-pub>

    <div class="member-content">
      <div class="header">
        <div class="header-top">
          <div class="top-left">
            <img src="@/assets/images/member-top-logo.png"
                 alt=""
                 class="top-left-img">
            <span class="top-word">订房低至85折</span>
          </div>

          <span class="open" @click="clickOpen">立即开通</span>
        </div>
        <div class="header-detail">
          <img src="@/assets/images/open-yin.png"
               alt=""
               class="header-bg">
          <div class="detail-top">
            <img src="@/assets/images/open-yin-icon.png"
                 alt=""
                 class="detail-left">
            <span class="detail-word">白银会员</span>
            <span class="detail-zhek">享受8.8折优惠</span>
          </div>
          <div class="detail-footer">
            <div class="footer-left">
              <p class="left-word">升级至黄金会员 可享受8.5折优惠</p>
              <p class="left-word">升级至钻石会员 可享受8.0折优惠</p>
              <p class="left-line"></p>
            </div>
            <div class="footer-right">积分 800</div>
          </div>
        </div>
      </div>

      <div class="member-list">
        <div class="member-li"
             v-for="member of memberList"
             :key="member.id"
             @click="clickList(member.id)"
             >
          <img :src="member.img"
               alt=""
               class="member-img">
          <p class="member-word">{{member.name}}</p>
        </div>
      </div>

      <div class="point-exchange">
        <div class="point-top">
          <div class="point-left">积分兑换</div>
          <div class="point-right" @click="clickProAll">查看全部
            <van-icon name="arrow" />
          </div>
        </div>
        <product-pub :proList="proList"></product-pub>
      </div>
    </div>

    <footer-pub></footer-pub>
  </div>
</template>

<script>
import { Icon } from 'vant'
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import FooterPub from '@/components/FooterPub.vue'
import ProductPub from '@/components/ProductPub.vue'

export default {
  name: 'Member',
  components: {
    HeaderPub,
    FooterPub,
    ProductPub,
    [Icon.name]: Icon,
  },
  data() {
    return {
      memberList: [
        {
          id: 'kthy',
          img: require('@/assets/images/member-icon1.png'),
          name: '开通会员',
        },
        {
          id: 'jfzx',
          img: require('@/assets/images/member-icon2.png'),
          name: '积分中心',
        },
        {
          id: 'jfsc',
          img: require('@/assets/images/member-icon3.png'),
          name: '积分商城',
        },
      ],
      proList: [],
    }
  },
  methods: {
    async getData() {
      let res = await this.$Http.getProInfo()
      console.log(res)
      this.proList = res.data
    },
    // 开通会员
    clickOpen() {
      this.$router.push({name: 'MemberOpening'})
    },
    // 点击列表
    clickList(id) {
      switch(id) {
        case 'kthy': 
          this.$router.push({name: 'MemberOpening'})
          break;
        case 'jfzx': 
          this.$router.push({name: 'IntegralRecord'})
          break;
        case 'jfsc': 
          this.$router.push({name: 'PointsMall'})
          break;
      }
    },
    // 查看积分商城
    clickProAll() {
      this.$router.push({name: 'PointsMall'})
    }
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.member {
  @include wh100();
  background-color: $bg;
  height: calc(100% - 50px);
  .member-content {
    .header {
      padding: 0 13px 0;
      .header-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 17px;
        padding: 0 7px;
        width: calc(100% - 34px);
        height: 38px;
        background-color: $fontColor;
        border-radius: 8px 8px 0 0;
        .top-left {
          display: flex;
          align-items: center;
          .top-left-img {
            width: 140px;
            margin-right: 5px;
          }
          .top-word {
            height: 10px;
            font-size: 10px;
            color: #f1d2a0;
            border-left: 1px solid #f1d2a0;
            padding-left: 5px;
            transform: scale(0.9);
            line-height: 1;
          }
        }

        .open {
          @include flex-cl-center();
          padding: 5px 10px;
          background: linear-gradient(
            -88deg,
            rgba(196, 159, 118, 0.85),
            rgba(254, 224, 172, 0.85)
          );
          transform: scale(0.8);
          border-radius: 9px;
          font-size: 10px;
        }
      }

      .header-detail {
        position: relative;
        width: 100%;
        height: 170px;
        .header-bg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .detail-top {
          display: flex;
          align-items: center;
          position: relative;
          padding: 32px 0 70px 26px;
          font-weight: bold;
          color: #f6faff;
          .detail-left {
            width: 15px;
          }
          .detail-word {
            font-size: 15px;
            margin: 0 10px;
          }
          .detail-zhek {
            font-size: 11px;
          }
        }
        .detail-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          position: relative;
          padding: 0 11px 0 21px;
          font-size: 12px;
          font-weight: bold;
          color: #f8fbff;
          .footer-left {
            .left-word {
              margin-bottom: 6px;
            }
            .left-line {
              width: 185px;
              height: 4px;
              background: #ffffff;
              opacity: 0.45;
            }
          }
          .footer-right {
            padding: 2px 5px;
            border: 1px solid #f8fbff;
          }
        }
      }
    }

    .member-list {
      padding: 17px 40px 21px;
      @include flex-cl();
      .member-li {
        @include flex-cl-center();
        flex-direction: column;
        .member-img {
          width: 45px;
          height: 45px;
          margin-bottom: 10px;
        }
        .member-word {
          font-size: 12px;
          font-weight: bold;
          color: $fontColor;
        }
      }
    }

    .point-exchange {
      background-color: #fff;
      .point-top {
        padding: 18px 25px;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        .point-left {
          font-size: 16px;
          color: $fontColor;
        }
        .point-right {
          font-size: 12px;
          color: #343434;
        }
      }

      
    }
  }
}
</style>
