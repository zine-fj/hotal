<template>
  <ul class="room-other-list">
    <li class="other-li"
        v-for="room of roomList"
        :key="room.id"
        @click="clickToRoomDetail(room.id)"
        >
      <div class="li-l">
        <img :src="room.img"
             alt=""
             class="other-img">
      </div>
      <div class="li-r">
        <h3 class="li-r-title">{{room.title}}</h3>
        <div class="intros">
          {{room.intro}}
        </div>
        <div class="surplus">
          {{room.last}}
        </div>
        <div class="li-r-footer">
          <span class="member-type">白银会员{{room.baiyin}}折</span>
          <span class="new-type">新客 {{room.new}}折</span>
          <div class="moneys">
            <div class="money-1">
              <span><span class="symbol">￥</span><span class="number">{{room.money1}}</span></span>
            </div>
            <div class="money-2">
              <span>￥{{room.money2}}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'room-list',
  props: {
    roomList: {
      type: Array,
      require: true
    }
  },
  methods: {
    clickToRoomDetail(param) {
      this.$router.push({ name: 'RoomDetail', params: { id: param } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.room-other-list {
  .other-li {
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 11px;
    min-height: 113px;
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    .li-l {
      width: 100px;
      height: 100%;
      border-radius: 8px 0 0 8px;
      .other-img {
        width: 100%;
        height: 100%;
      }
    }
    .li-r {
      padding: 14px 0 15px 10px;
      .li-r-title {
        margin-bottom: 12px;
        font-size: 15px;
        font-weight: bold;
        color: #343434;
      }
      .intros {
        margin-bottom: 12px;
        font-weight: bold;
        color: #595959;
      }
      .surplus {
        margin-bottom: 12px;
        font-weight: 500;
        font-family: OPPOSans;
        color: #ff3000;
      }
      .li-r-footer {
        font-size: 10px;
        font-family: OPPOSans;

        .member-type {
           padding: 3px 6px 0;
          margin-right: 4px;
          color: #4a616f;
          transform: scale(0.8);
          background-color: #e4eff5;
        }
        .new-type {
          padding: 3px 6px 0;
          color: #fe6739;
          transform: scale(0.8);
          border: 1px solid #fe6739;
        }
        .moneys {
          position: absolute;
          right: 10px;
          bottom: 14px;
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
}
</style>