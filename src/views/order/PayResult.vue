<template>
  <div class="pay-result">
    <header-pub></header-pub>
    <div class="result">
      <img :src="payResult.img"
           alt=""
           class="result-img">
      <h2 class="pay-end">{{payResult.word}}</h2>
      <p class="go-home" v-if="type === 'suc'">{{payResult.gohome}}</p>
      <p class="go-home" v-if="type === 'err'">{{payResult.gohome}}{{time}}s...</p>
    </div>
    <footer-pub></footer-pub>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import FooterPub from '@/components/FooterPub.vue'

export default {
  name: 'pay-result',
  components: {
    HeaderPub,
    FooterPub,
  },
  data() {
    return {
      type: 'suc',
      time: 3,
      payResult: {
        img: require('@/assets/images/pay-suc.png'),
        word: '支付成功',
        gohome: '即将返回主页',
      },
      // payResult: {
      //   img: require('@/assets/images/pay-err.png'),
      //   word: '支付失败',
      //   gohome: '即将返回主页',
      // },
    }
  },
  mounted() {
    this.djsFn()
  },
  methods: {
    djsFn() {
      let time = setInterval(()=>{
        if (this.time > 1) {
          this.time--
        } else {
          clearInterval(time)
          console.log('跳转到首页')
          this.$router.push({name: 'HomePage'})
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.pay-result {
  @include wh100();
  background-color: $bg;
  height: calc(100% - 50px);
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
  .go-home {
    color: #BDBDBD;

  }
}
</style>
