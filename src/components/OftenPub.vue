<template>
  <div class="often-list">
    <div class="often-li"
         v-for="often of oftenList"
         :key="often.id"
         @click="clickToRoomDetail(often.id)">
      <img :src="often.img"
           alt=""
           class="often-img">
      <div class="often-intro">
        <div class="intro-left">
          <p class="intro-left-t">{{often.intro}}</p>
          <p class="intro-left-b">{{often.type}}</p>
        </div>
        <div class="often-right">
          <div class="money-1">
            <span><span class="symbol">￥</span><span class="number">{{often.money1}}</span></span>
          </div>
          <div class="money-2">
            <span>￥{{often.money2}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'often-list',
  props: {
    oftenList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    clickToRoomDetail(param) {
      this.$router.push({ name: 'RoomDetail', query: { id: param } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.often-list {
  padding: 0 0 0 12px;
  white-space: nowrap;
  overflow-x: auto;
  .often-li {
    display: inline-block;
    width: 185px;
    height: 155px;
    margin-right: 10px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);
    background: #ffffff;
    &:last-child {
      margin-right: 12px;
    }
    .often-img {
      width: 100%;
      height: 100px;
      border-radius: 8px 8px 0 0;
    }
    .often-intro {
      position: relative;
      padding: 11px 10px 12px 12px;
      .intro-left {
        .intro-left-t {
          margin-bottom: 7px;
          font-size: 12px;
          color: #595959;
        }
        .intro-left-b {
          font-size: 15px;
          font-weight: bold;
          color: #343434;
        }
      }
      .often-right {
        position: absolute;
        right: 10px;
        bottom: 12px;
        text-align: right;
        .money-1 {
          margin-bottom: 4px;
          font-weight: bold;
          font-size: 9px;
          color: $moneyColor;
          .symbol {
            transform: scale(0.8);
          }
          .number {
            font-size: 16px;
          }
        }
        .money-2 {
          font-size: 9px;
          color: #242424;
          text-decoration: line-through;
          transform: scale(0.8);
        }
      }
    }
  }
}
</style>