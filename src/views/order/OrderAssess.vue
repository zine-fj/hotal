<template>
  <div class="order-assess">
    <header-pub></header-pub>
    <div class="assess">
      <h1 class="title">本次服务评价</h1>
      <ul class="assess-list">
        <li class="assess-li"
            v-for="(assess, index) of assessList"
            :key="assess.title">
          <h2 class="assess-li-title">
            <span class="title-index">{{ index + 1}}.</span>
            {{assess.title}}
          </h2>
          <div class="assess-li-cl">
            <van-rate v-model="assess.value"
                      :size="25"
                      color="#D2AC60"
                      void-color="#eee"
                      class="assess-li-left" />
            <span class="assess-li-right">{{assess.value}}分</span>
          </div>
        </li>
      </ul>
      <div class="assess-btn">
        <div class="btn" @click="clickSubAssess">提交评价</div>
      </div>
    </div>
    <footer-pub></footer-pub>
  </div>
</template>

<script>
import { Rate } from 'vant'
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import FooterPub from '@/components/FooterPub.vue'

export default {
  name: 'pay-result',
  components: {
    HeaderPub,
    FooterPub,
    [Rate.name]: Rate,
  },
  data() {
    return {
      assessList: [
        {
          title: '您觉得整体住宿体验如何?',
          value: 4,
        },
        {
          title: '您觉得用餐体验如何?',
          value: 1,
        },
        {
          title: '房间的干净/整洁度您还满意吗？?',
          value: 4,
        },
        {
          title: '服务人员是否解决了您在住店当中的需求？',
          value: 3,
        },
      ],
    }
  },
  mounted() {},
  methods: {
    clickSubAssess() {
      this.$router.push({name: 'OrderAssessResult'})
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.order-assess {
  @include wh100();
  background-color: $bg;
  height: calc(100% - 50px);
  font-size: 17px;
  .assess {
    .title {
      padding: 8px 0 8px 31px;
      margin-bottom: 10px;
      font-weight: bold;
      color: $fontColor;
      background-color: #fff;
    }
    .assess-list {
      .assess-li {
        padding: 24px 20px 24px 30px;
        margin-bottom: 10px;
        background-color: #fff;
        .assess-li-title {
          margin-bottom: 20px;
          font-size: 13px;
          font-weight: bold;
          .title-index {
            color: #d2ac60;
          }
        }
        .assess-li-cl {
          @include flex-cl();
          .assess-li-left {
          }
          .assess-li-right {
            font-size: 13px;
            font-weight: bold;
            color: #d2ac60;
          }
        }
      }
    }
    .assess-btn {
      margin: 43px auto;
      width: 180px;
      height: 43px;
      .btn {
        @include btn-cl();
        font-size: 13px;
        color: #fff;
      }
    }
  }
}
</style>
