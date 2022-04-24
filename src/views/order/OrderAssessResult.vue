<template>
  <div class="assess-result">
    <header-pub></header-pub>
    <div class="result">
      <img :src="payResult.img"
           alt=""
           class="result-img">
      <h2 class="pay-end">{{payResult.word}}</h2>
      <p class="thank">{{payResult.gohome}}</p>

      <div class="footer-btn">
        <div class="btn" @click="clickGoList">返回列表</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'

export default {
  name: 'assess-result',
  components: {
    HeaderPub,
  },
  data() {
    return {
      type: 'suc',
      time: 3,
      payResult: {
        img: require('@/assets/images/pay-suc.png'),
        word: '提交成功',
        gohome: '感谢您的建议，我们会做的更好!',
      },
    }
  },
  mounted() {
  },
  methods: {
    clickGoList() {
      this.$router.push({name: 'OrderPage'})
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.assess-result {
  @include wh100();
  background-color: $bg;
  height: 100%;
  text-align: center;
    font-size: 17px;
  .result-img {
    width: 55px;
    height: auto;
    margin: 95px auto 0;
  }
  .pay-end {
    margin: 28px 0 20px ;
    color: $fontColor;
    font-weight: bold;

  }
  .thank {
    color: #BDBDBD;

  }
  .footer-btn {
    margin: 54px auto 0;
    width: 180px;
    .btn {
      @include btn-cl();
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
