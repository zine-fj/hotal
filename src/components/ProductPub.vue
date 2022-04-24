<template>
  <ul class="point-list">
    <li class="point-li"
        v-for="pro of proList"
        :key="pro.id"
        @click="clickToProDetail(pro.id)">
      <img :src="pro.img"
           alt=""
           class="point-li-img">
      <div class="point-li-content">
        <p class="content-title van-ellipsis">{{pro.title}}</p>
        <div class="content-div">
          <span class="content-left">积分{{pro.jifen}}</span>
          <span class="content-right">剩余 {{pro.last}}份</span>
        </div>
      </div>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'point-list',
  props: {
    proList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    clickToProDetail(param) {
      console.log(param)
      this.$router.push({ name: 'CommodityDetail', query: { id: param } })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.point-list {
  padding: 0 10px 10px 23px;
  .point-li {
    display: inline-block;
    width: 46%;
    height: 148px;
    background: #ffffff;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    margin: 0 12px 12px 0;
    .point-li-img {
      width: 100%;
      height: 102px;
      border-radius: 5px 5px 0 0;
    }
    .point-li-content {
      padding: 0 0 10px 0;
      font-size: 11px;
      font-weight: bold;
      transform: scale(0.9);
      .content-title {
        margin: 5px 0 8px;
      }
      .content-div {
        @include flex-cl();
        .content-left {
          color: #bd9b56;
        }
        .content-right {
          color: #9f9f9f;
        }
      }
    }
  }
}
</style>