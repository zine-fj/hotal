<template>
  <div class="room-detail">
    <header-pub></header-pub>
    <div class="detail-cont">
      <div class="header">
        <van-swipe :autoplay="3000"
                   class="imgs">
          <van-swipe-item v-for="(swipe) in detailObj.swipers"
                          :key="swipe.id"
                          class="img-li">
            <img :src="swipe.img"
                 class="img-cl" />
          </van-swipe-item>
        </van-swipe>
        <div class="address-phone">
          <div class="address">
            <p class="address-t">
              <img :src="detailObj.address.img"
                   alt=""
                   class="address-img">
              {{detailObj.address.name}}
            </p>
            <p class="address-b">{{detailObj.address.distance}}</p>
          </div>
          <div class="phone">
            <a :href="'tel:' + detailObj.phone"
               class="phone-link">
              <img :src="detailObj.phoneImg"
                   alt=""
                   class="phone-img">
            </a>
          </div>
        </div>
      </div>

      <div class="tablist">
        <div class="tab-li"
             v-for="thing of detailObj.goodThings"
             :key="thing.name">
          <img :src="thing.img"
               alt=""
               class="tab-img">
          <p class="tab-word">{{ thing.name }}</p>
        </div>
      </div>

      <div class="hots">
        <img :src="detailObj.hotImg"
             alt=""
             class="hot-img">
        <span class="hot-word">此房间非常抢手，仅剩1间</span>
      </div>

      <div class="detail-list">

        <div class="detail-li">
          <div class="detail-li-l">
            房间数量
          </div>
          <div class="detail-li-r word-cl">
            1间
          </div>
        </div>
        <div class="detail-li">
          <div class="detail-li-l">
            入住人
          </div>
          <div class="detail-li-r">
            <van-field v-model="detailObj.infoObj.name"
                       clearable
                       placeholder="请填写入住人的真实姓名" />
          </div>
        </div>
        <div class="detail-li">
          <div class="detail-li-l">
            联系电话
          </div>
          <div class="detail-li-r">
            <van-field v-model="detailObj.infoObj.phone"
                       @blur="blur('phone')"
                       clearable
                       placeholder="仅用于接收预定信息"
                       :error-message="detailObj.infoObj.phoneErr?'手机号格式错误':''" />
          </div>
        </div>
        <div class="detail-li">
          <div class="detail-li-l">
            证件信息
          </div>
          <div class="detail-li-r">
            <div class="id-type"
                 @click="idPicker = true">
              {{detailObj.infoObj.idType}}
              <van-icon name="arrow-down" />
            </div>
            <van-field v-model="detailObj.infoObj.id"
                       clearable
                       @blur="blur('id')"
                       placeholder="仅用于预定房间"
                       :error-message="detailObj.infoObj.idErr?'证件号码格式错误':''" />

            <van-popup v-model="idPicker"
                       round
                       position="bottom">
              <van-picker show-toolbar
                          :columns="detailObj.infoObj.idTypeArr"
                          @cancel="idPicker = false"
                          @confirm="onId" />
            </van-popup>
          </div>
        </div>
        <div class="detail-li">
          <div class="detail-li-l">
            预计到店
          </div>
          <div class="detail-li-r">
            <van-field readonly
                       clickable
                       name="datetimePicker"
                       :value="detailObj.infoObj.timeone"
                       placeholder="点击选择时间"
                       right-icon="arrow"
                       @click="showPicker = true" />
            <van-popup v-model="showPicker"
                       position="bottom">
              <van-datetime-picker type="time"
                                   @confirm="onConfirm"
                                   @cancel="showPicker = false" />
            </van-popup>
          </div>
        </div>
        <div class="detail-li">
          <div class="detail-li-l">
            入住时间
          </div>
          <div class="detail-li-r">
            <van-icon name="arrow"
                      class="jifen-icon" />
            <van-cell :value="detailObj.infoObj.timetwo"
                      @click="show = true" />
            <van-calendar v-model="show"
                          type="range"
                          :show-confirm="false"
                          @confirm="onDate" />
          </div>
        </div>
        <div class="detail-li">
          <div class="detail-li-l">
            积分抵扣
          </div>
          <div class="detail-li-r word-cl"
               @click="jifenPicker = true">
            {{detailObj.infoObj.jifen}}
            <van-icon name="arrow"
                      class="jifen-icon" />
          </div>
          <van-popup v-model="jifenPicker"
                     round
                     position="bottom">
            <van-picker show-toolbar
                        :columns="columns"
                        @cancel="jifenPicker = false"
                        @confirm="onJifen" />
          </van-popup>
        </div>
      </div>

      <div class="detail-intro">
        <div class="intro-li"
             v-for="intro of detailObj.introList"
             :key="intro.title">
          <h4 class="intro-title">{{intro.title}}</h4>
          <p class="intro-title-cont">{{intro.word}}</p>
        </div>
      </div>

      <div class="expense">
        <h4 class="expense-title">费用明细</h4>
        <div class="expense-list">
          <div class="expense-li">
            <span class="expense-li-l">白银会员9.8折</span>
            <span class="expense-li-r">
              <span class="symbol">-￥</span>
              <span class="number">{{detailObj.expenseInfo.moneyOne}}</span>
            </span>
          </div>
          <div class="expense-li">
            <span class="expense-li-l">本店新客7.8折</span>
            <span class="expense-li-r">
              <span class="symbol">-￥</span>
              <span class="number">{{detailObj.expenseInfo.moneyTwo}}</span>
            </span>
          </div>
          <div class="expense-li  expense-li-last">
            <span class="expense-li-l">每间每晚</span>
            <span class="expense-li-r">
              <span class="symbol">-￥</span>
              <span class="number">{{detailObj.expenseInfo.moneyLast}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-l">
        <span class="jiage">价格：</span>
        <span class="money-1">￥17</span>
        <span class="money-2">
          <span class="symbol">￥</span>
          <span class="number">17</span>
        </span>
        <span class="byyh">白银优惠</span>
      </div>
      <div class="footer-r">
        <div class="footer-btn"
             @click="clickYuding">立即预定</div>
      </div>
    </div>

  </div>
</template>
<script>
import {
  Cell,
  Field,
  Swipe,
  SwipeItem,
  Popup,
  DatetimePicker,
  Calendar,
  Picker,
  Icon,
  Toast,
} from 'vant'
import HeaderPub from '@/components/HeaderPub.vue'

export default {
  name: 'room-detail',
  components: {
    HeaderPub,
    [Picker.name]: Picker,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Calendar.name]: Calendar,
    [Icon.name]: Icon,
  },
  data() {
    return {
      detailObj: {
        swipers: [
          {
            id: '01',
            img: 'https://img01.yzcdn.cn/vant/apple-1.jpg',
          },
          {
            id: '02',
            img: 'https://img01.yzcdn.cn/vant/apple-2.jpg',
          },
        ],
        address: {
          img: require('@/assets/images/local.png'),
          name: '历城区华龙路801号(华信路与华龙路交叉口西北角)',
          distance: '距您直线1.2公里,步行1.2公里，约15分钟',
        },
        phone: '12121',
        phoneImg: require('@/assets/images/phone.png'),
        goodThings: [
          {
            img: require('@/assets/images/detail-1.png'),
            name: '照明',
          },
          {
            img: require('@/assets/images/detail-2.png'),
            name: '热水',
          },
          {
            img: require('@/assets/images/detail-3.png'),
            name: '停车场',
          },
          {
            img: require('@/assets/images/detail-4.png'),
            name: '网络',
          },
          {
            img: require('@/assets/images/detail-5.png'),
            name: '电视',
          },
          {
            img: require('@/assets/images/detail-6.png'),
            name: '中央空调',
          },
          {
            img: require('@/assets/images/detail-7.png'),
            name: '洗衣机',
          },
          {
            img: require('@/assets/images/detail-8.png'),
            name: '热水器',
          },
        ],
        hotImg: require('@/assets/images/hot.png'),
        infoObj: {
          number: '1',
          name: '',
          phone: '',
          phoneErr: false,
          idType: '身份证',
          idTypeArr: ['身份证', '护照'],
          id: '',
          idErr: false,
          timeone: '',
          timeTwo: '',
          jifen: '不使用',
        },
        introList: [
          {
            title: '政策服务',
            word: '近期大多数订单可在5分钟内确认是否预订成功。',
          },
          {
            title: '取消政策',
            word: '2021-10-18 18:00前可免费取消，逾期不可取消/变更，如未入住，酒店将扣除全额房费',
          },
          {
            title: '儿童及加床',
            word: '使用现有床铺每间客房最多容纳1名14岁及以下儿童，不另外加床，和成人共用现有床铺。酒店不提供加婴儿床和加床。15岁及以上客人按成人收费。',
          },
        ],
        expenseInfo: {
          moneyOne: '17',
          moneyTwo: '24',
          moneyLast: '286',
        },
      },
      showPicker: false,
      show: false,
      columns: ['10', '20', '30'],
      jifenPicker: false,
      idPicker: false,
    }
  },

  mounted() {},
  methods: {
    onConfirm(time) {
      this.detailObj.infoObj.timeone = time
      this.showPicker = false
    },
    // 身份证
    onId(value) {
      console.log(value)
      this.detailObj.infoObj.idType = value
      this.idPicker = false
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    // 入住时间
    onDate(date) {
      const [start, end] = date
      this.show = false
      this.detailObj.infoObj.timetwo = `${this.formatDate(
        start
      )} - ${this.formatDate(end)}`
    },
    // 积分
    onJifen(value) {
      console.log(value)
      this.detailObj.infoObj.jifen = value
      this.jifenPicker = false
    },
    // 失去焦点 电话，id
    blur(param) {
      const infoObj = this.detailObj.infoObj
      console.log(infoObj.phone)
      if (param === 'phone') {
        if (this.$check.repIsEmpty(infoObj.phone)) {
          infoObj.phoneErr = true
        }
      } else if (param === 'id') {
        if (this.$check.repIsEmpty(infoObj.id)) {
          infoObj.idErr = true
        }
      }
    },
    // 校验
    check() {
      const infoObj = this.detailObj.infoObj
      switch (true) {
        case this.$check.repIsEmpty(infoObj.name):
          Toast('请输入姓名')
          return
        case this.$check.repIsEmpty(infoObj.phone):
          Toast('请输入电话')
          return
        case this.$check.repIsEmpty(infoObj.id):
          Toast('请输入证件号')
          return
        case this.$check.repIsEmpty(infoObj.timeone):
          Toast('请选择到店时间')
          return
        case this.$check.repIsEmpty(infoObj.timetwo):
          Toast('请选择入住时间')
          return
        case this.$check.repIsEmpty(infoObj.jifen):
          Toast('请选择是否使用积分')
          return
      }
      return true
    },
    // 立即预定
    clickYuding() {
      if (!this.check()) {
        return
      }
      console.log('立即预定')
      this.$router.push({name: 'OrderPage'})
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.room-detail {
  @include wh100();
  background-color: $bg;

  .detail-cont {
    height: calc(100% - 145px);
    overflow-y: auto;
  }
  .header {
    .imgs {
      .img-li {
        width: 100%;
        height: 189px;
        .img-cl {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .address-phone {
    @include flex-cl();
    margin-bottom: 8px;
    background-color: #fff;
    padding: 17px 26px 13px 18px;
    .address {
      text-align: left;
      .address-t {
        margin-bottom: 9px;
        font-size: 11px;
        color: #bd9b56;
        .address-img {
          width: 7px;
          height: 11px;
        }
      }
      .address-b {
        margin-left: -15px;
        font-size: 10px;
        color: #999;
        transform: scale(0.9);
      }
    }
    .phone {
      width: 20px;
      height: 20px;
      .phone-link {
        .phone-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .tablist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    padding: 17px 42px 0;
    .tab-li {
      display: inline-block;
      text-align: center;
      margin: 0 10% 20px 0;
      &:nth-child(4),
      &:last-child {
        margin-right: 0;
      }
      .tab-img {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        margin-bottom: 13px;
      }
      .tab-word {
        font-size: 12px;
        font-weight: bold;
        color: #242424;
      }
    }
  }

  .hots {
    height: 33px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .hot-img {
      width: 15px;
      height: 15px;
      margin-right: 6px;
    }
    .hot-word {
      font-size: 14px;
      color: #e82a05;
    }
  }

  .detail-list {
    margin-bottom: 8px;
    background-color: #fff;
    .detail-li {
      min-height: 53px;
      display: flex;
      align-items: center;
      margin: 0 20px;
      border-bottom: 1px solid #f1f1f1;
      &:last-child {
        border-bottom: none;
      }

      .detail-li-l {
        flex: none;
        min-width: 62px;
        font-size: 16px;
        font-weight: bold;
        color: #9b9b9b;
        text-align-last: justify;
        text-align: justify;
      }
      .word-cl {
        padding: 10px 22px;
      }

      .detail-li-r {
        position: relative;
        display: inline-flex;
        align-items: center;
        width: calc(100% - 62px);
        min-height: 53px;
        .jifen-icon {
          position: absolute;
          right: 0;
          bottom: 20px;
          z-index: 9;
        }
        .van-cell {
          padding: 10px 0 10px 22px;
        }
        .id-type {
          flex: none;
          margin: 0 10px;
          @include flex-cl-center();
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  .detail-intro {
    padding: 24px 30px 0 22px;
    background-color: #fff;
    margin-bottom: 8px;
    overflow: hidden;
    .intro-li {
      margin-bottom: 19px;
      .intro-title {
        margin-bottom: 19px;
        font-size: 17px;
        font-weight: bold;
        color: $moneyColor;
      }
      .intro-title-cont {
        padding-left: 17px;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }

  .expense {
    padding: 20px 53px 32px 30px;
    background-color: #fff;
    .expense-title {
      font-size: 16px;
      font-weight: bold;
      color: $fontColor;
      margin-bottom: 27px;
    }
    .expense-list {
      padding-left: 19px;
      .expense-li {
        margin-bottom: 22px;
        @include flex-cl();
        .expense-li-l {
          font-size: 15px;
          color: $fontColor;
        }
        .expense-li-r {
          .symbol {
            @include symbol();
          }
          .number {
            font-size: 15px;
            @include money-2();
          }
        }
      }
      .expense-li-last {
        .expense-li-r {
          .number {
            font-size: 19px;
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px 12px 23px;
    background-color: #fff;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.7);
    border-top: 2px solid #eaeaea;
    .footer-l {
      .jiage {
        font-size: 16px;
        font-family: OPPOSans;
        color: #343434;
      }
      .money-1 {
        @include money-1();
      }
      .money-2 {
        .symbol {
          @include symbol();
        }
        .number {
          font-size: 19px;
          color: $moneyColor;
          font-weight: bold;
        }
      }
      .byyh {
        margin-left: 10px;
        padding: 0 3px;
        font-size: 10px;
        font-weight: bold;
        color: #4a616f;
        transform: scale(0.8);
        background-color: #e5eff5;
      }
    }
    .footer-r {
      width: 105px;
      .footer-btn {
        @include btn-cl();
        color: #fff;
        font-size: 13px;
      }
    }
  }
}
</style>
