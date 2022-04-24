<template>
  <div class="points-mall">
    <header-pub></header-pub>
    <div class="list-title">
      <van-icon name="arrow-left"
                class="arrow-left-cl"
                @click="clickToHome" />
      <span class="title-word">积分商城</span>
    </div>
    <product-pub :proList="proList"></product-pub>
  </div>
</template>
<script>
import HeaderPub from '@/components/HeaderPub.vue'
import ProductPub from '@/components/ProductPub.vue'
import { Icon } from 'vant'
export default {
  name: 'room-list',
  components: {
    [Icon.name]: Icon,
    HeaderPub,
    ProductPub,
  },
  data() {
    return {
      proList: [],
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
    },
    clickToHome() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.points-mall {
  background-color: #fff;
  @include wh100();
  .list-title {
    margin: 4px 0 19px 16px;
    .arrow-left-cl {
      width: 9px;
      height: 16px;
      margin-right: 13px;
    }
    .title-word {
      font-size: 16px;
      font-weight: bold;
      color: #343434;
    }
  }
}
</style>
