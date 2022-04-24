<template>
  <div class="member-opening">
    <div class="opening-content">
      <div class="header">
        <img src="@/assets/images/member-top-open.png"
             alt=""
             class="header-bg">
        <p class="header-word">尊享超低折扣及多项住店特权</p>
      </div>
      <div class="choice-card">
        <van-radio-group v-model="radio">
          <div class="card-li"
               v-for="huiy of huiyList"
               :key="huiy.id">
            <div class="card-li-left">
              <img :src="huiy.img"
                   alt=""
                   class="card-img">
              <div class="card-intro">
                <img :src="huiy.icon"
                     alt=""
                     class="card-icon">
                <span class="card-name">{{ huiy.title }}</span>
                <span class="card-zhe">{{ huiy.intro }}</span>
              </div>
            </div>
            <div class="card-li-right">
              <van-radio :name="huiy.id"
                         checked-color="#D2AC60"></van-radio>
            </div>
          </div>
        </van-radio-group>

      </div>

      <div class="card-content">
        <div class="cont-li"
             v-for="(teq, index) of teqList"
             :key="index">
          <h2 class="cont-li-title">{{ teq.title }}</h2>
          <p class="cont-intro">{{teq.cont}}</p>
        </div>
      </div>
    </div>

    <!-- 升级 -->
    <div class="upgrade"
         v-show="upgradeClose">
      <div class="mask"></div>
      <div class="upgrade-cont">
        <img :src="upgradeImg"
             alt=""
             class="img-cl">
        <img src="@/assets/images/close.png"
             alt=""
             class="close"
             @click="clickClose">
      </div>
    </div>

    <div class="opening-footer">
      <div class="opening-left"
           @click="clickBack">返 回</div>
      <div class="opening-right"
           @click="clickOpen">
        立即开通 $ <span class="money">333</span>
      </div>
    </div>

  </div>
</template>

<script>
import { Radio, RadioGroup } from 'vant'
export default {
  name: 'member-opening',
  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
  },
  methods: {
    clickBack() {
      this.$router.go(-1)
    },
    clickOpen() {
      console.log(this.radio)
      this.upgradeClose = true
      switch (this.radio) {
        case 'baiyin':
          this.upgradeImg = require('@/assets/images/shengji-yin.png')
          break
        case 'huangjin':
          this.upgradeImg = require('@/assets/images/shengji-jin.png')
          break
        case 'zuanshi':
          this.upgradeImg = require('@/assets/images/shengji-zuan.png')
          break
      }
    },
    clickClose() {
      this.upgradeClose = false
    },
  },
  data() {
    return {
      radio: 'baiyin',
      huiyList: [
        {
          id: 'baiyin',
          img: require('@/assets/images/open-yin.png'),
          icon: require('@/assets/images/open-yin-icon.png'),
          title: '白银会员',
          intro: '享受8.8折优惠',
        },
        {
          id: 'huangjin',
          img: require('@/assets/images/open-jin.png'),
          icon: require('@/assets/images/open-jin-icon.png'),
          title: '黄金',
          intro: '享受8.5折优惠',
        },
        {
          id: 'zuanshi',
          img: require('@/assets/images/open-zuan.png'),
          icon: require('@/assets/images/open-yin-icon.png'),
          title: '钻石',
          intro: '享受8.0折优惠',
        },
      ],
      upgradeImg: require('@/assets/images/shengji-zuan.png'),
      upgradeClose: false,
      teqList: [
        {
          title: '专属特权',
          cont: '文案文案文案文案文案文案文案文案文案文案文案文案',
        },
        {
          title: '专属特权',
          cont: '文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案',
        },
        {
          title: '专属特权',
          cont: '文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.member-opening {
  @include wh100();

  background-color: $bg;
  .opening-content {
    height: calc(100% - 60px);
    overflow-y: auto;
    .header {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      .header-bg {
        width: 100%;
      }
      .header-word {
        position: absolute;
        left: calc(50% - 112px);
        bottom: 40px;
        font-size: 18px;
        font-weight: bold;
        color: #fff1c7;
      }
    }

    .choice-card {
      background-color: #fff;
      margin-bottom: 8px;
      padding: 18px 22px 0 18px;

      overflow: hidden;
      .card-li {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        .card-li-left {
          position: relative;
          .card-img {
            width: 293px;
            height: 142px;
            margin-right: 18px;
            border-radius: 8px;
          }
          .card-intro {
            position: absolute;
            left: 23px;
            top: 27px;
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: bold;
            color: #f7f7f7;
            .card-icon {
              width: 12px;
              height: 12px;
            }
            .card-name {
              margin: 0 5px 0 9px;
            }
            .card-zhe {
              transform: scale(0.9);
            }
          }
        }
      }
    }

    .card-content {
      background-color: #fff;
      padding-bottom: 20px;
      .cont-li {
        padding: 21px 156px 0 28px;

        .cont-li-title {
          padding-left: 8px;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: bold;
          color: #d2ac60;
          border-left: 5px solid #d2ac60;
        }
        .cont-intro {
          line-height: 1.5;
          font-size: 15px;
          color: #242424;
        }
      }
    }
  }

  .opening-footer {
    height: 60px;
    .opening-left {
      @include btn-cl();
      width: 30%;
      height: 100%;
      font-size: 13px;
      color: #ffffff;
    }
    .opening-right {
      @include btn-cl();
      width: 70%;
      height: 100%;
      background-color: $moneyColor;
      color: #fff;
      font-size: 13px;
      .money {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }

  // 升级
  .upgrade {
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .upgrade-cont {
      position: fixed;
      left: calc(50% - 125px);
      top: 0;
      display: inline-block;
      margin: 150px auto 0;
      width: 250px;
      text-align: center;
      .img-cl {
        width: 100%;
      }
      .close {
        width: 47px;
        height: 47px;
      }
    }
  }
}
</style>
