<template>
  <div class="feed-back">
    <header-pub></header-pub>
    <van-field class="feed-div"
               v-model="feedObj.message"
               rows="2"
               autosize
               type="textarea"
               placeholder="留下您的意见和反馈，我们会认真改进"
               show-word-limit />
    <ul class="change-list">
      <li class="change-li">
        <div class="li-left">联系方式</div>
        <div class="li-right">
          <van-field v-model="feedObj.phone"
                     clearable
                     placeholder="手机号" />
        </div>
      </li>
      <li class="change-li">
        <div class="li-left">QQ/微信</div>
        <div class="li-right">
          <van-field v-model="feedObj.QQWechet"
                     clearable
                     placeholder="您的QQ或者微信号" />

        </div>
      </li>
    </ul>

    <div class="footer-btn">
      <div class="btn"
           @click="clickSub">确认提交</div>
    </div>
  </div>
</template>

<script>
import { Field, Toast } from 'vant'
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'

export default {
  name: 'Home',
  components: {
    HeaderPub,
    [Field.name]: Field,
  },
  data() {
    return {
      feedObj: {
        message: '',
        phone: '',
        QQWechet: '',
      },
    }
  },
  methods: {
    clickSub() {
      switch (true) {
        case this.$check.repIsEmpty(this.feedObj.message): {
          Toast('请输入反馈意见')
          return
        }
        case this.$check.repIsEmpty(this.feedObj.phone): {
          Toast('请输入联系方式')
          return
        }
        case this.$check.repIsEmpty(this.feedObj.QQWechet): {
          Toast('请输入QQ或者微信号')
          return
        }
      }
      Toast('意见反馈成功啦')
      this.$router.push({ name: 'MyPage' })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.feed-back {
  @include wh100();
  padding: 20px;

  .feed-div {
    min-height: 222px;
    background-color: #f7f7f7;
  }
  .change-list {
    background-color: #fff;

    .change-li {
      display: flex;
      align-items: center;
      height: 53px;
      border-bottom: 1px solid #f1f1f1;

      .li-left {
        flex: none;
        font-size: 16px;
        font-weight: bold;
      }
      .li-right {
        flex: 1;
      }
    }
  }
  .footer-btn {
    margin: 57px auto 0;
    width: 180px;
    .btn {
      @include btn-cl();
      color: #fff;
      font-size: 13px;
    }
  }
}
</style>
