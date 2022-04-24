<template>
  <div class="integral-record">
    <header-pub></header-pub>
    <van-tabs v-model="active"
              color="#D2AC60"
              animated
              @click="onClick"
              sticky>

      <van-tab :title="tab.title"
               v-for="tab of tabList"
               :key="tab.id ">
      </van-tab>
    </van-tabs>
    <div class="record-content">
      <div class="record-all">积分余额：{{ jifenAll }}</div>
      <ul class="record-list">
        <li class="record-li"
            v-for="(jifen, index) of jifenObj.list"
            :key="index">
          <div class="record-left">
            <h3 class="name">{{jifen.name}}</h3>
            <h3 class="time">{{jifen.time}}</h3>
          </div>
          <div class="record-right"
               v-show="jifenObj.type === 'get'">
            +{{jifen.number}}分
          </div>
          <div class="record-right record-right-1"
               v-show="jifenObj.type === 'exchange'">
            -{{jifen.number}}分
          </div>
        </li>
      </ul>
    </div>

    <div class="footer" @click="clickBack">返&nbsp;&nbsp;&nbsp;&nbsp;回</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import { Tab, Tabs } from 'vant'

export default {
  name: 'Order',
  components: {
    HeaderPub,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  data() {
    return {
      active: 0,
      tabList: [
        { title: '积分获取', id: 'get' },
        { title: '抵扣/兑换', id: 'exchange' },
      ],
      jifenAll: 800,
      jifenObj: {},
      jifenArr: [
        {
          type: 'get',
          list: [
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },

            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
          ],
        },
        {
          type: 'exchange',
          list: [
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 300,
            },
            {
              name: '酒店入住积分',
              time: '2021-09-23 16：23：12',
              number: 200,
            },
          ],
        },
      ],
    }
  },
  mounted() {
    this.jifenObj = this.jifenArr[0]
  },
  methods: {
    // 点击tab事件
    onClick(index) {
      console.log(index)
      this.jifenObj = this.jifenArr[index]
    },
    clickBack() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';

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

.integral-record {
  @include wh100();
  background-color: $bg;
  .record-content {
    height: calc(100% - 138px);
    overflow-y: auto;
    .record-all {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 13px 11px;
      margin-top: 45px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }
    .record-list {
      .record-li {
        @include flex-cl();
        padding: 0 38px 0 29px;
        height: 56px;
        margin-bottom: 5px;
        background-color: #fff;
        .record-left {
          .name {
            font-size: 15px;
            margin-bottom: 10px;
          }
          .time {
            font-size: 12px;
            color: #666666;
          }
        }
        .record-right {
          font-size: 15px;
          font-weight: bold;
          color: #d2ac60;
        }
        .record-right-1 {
          color: #ff3600;
        }
      }
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    @include btn-cl();
    font-size: 15px;
    height: 60px;
    color: #ffffff;
  }
}
</style>