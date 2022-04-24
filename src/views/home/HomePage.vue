<template>
  <div class="home">
    <header-pub :bg="'hui'"></header-pub>
    <!-- 最常入住 -->
    <div class="often">
      <h2 class="often-title">最常入住</h2>
      <often-pub :oftenList="oftenList"></often-pub>
    </div>
    <!-- 房型 -->
    <ul class="room-types">
      <li class="room-li"
          v-for="type of typeList"
          :key="type.id"
          @click="clickRoomList(type)">
        <img :src="type.img"
             alt=""
             class="room-img">
        <p class="room-word">{{ type.name }}</p>
      </li>
    </ul>
    <!-- 其他房型 -->
    <div class="room-other">
      <div class="other-header">
        <h2 class="room-title">其他房型</h2>
        <div class="look-more"
             @click="clickRoomList({id: 'other', name: '其他房型'})">查看更多</div>
      </div>

      <room-pub :roomList="otherList"></room-pub>
    </div>
    <footer-pub></footer-pub>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import FooterPub from '@/components/FooterPub.vue'
import OftenPub from '@/components/OftenPub.vue'
import RoomPub from '@/components/RoomPub.vue'

export default {
  name: 'Home',
  components: {
    HeaderPub,
    FooterPub,
    OftenPub,
    RoomPub,
  },
  data() {
    return {
      oftenList: [],
      typeList: [
        {
          id: 'home1',
          name: '家庭房',
          img: require('@/assets/images/home1.png'),
        },
        {
          id: 'home2',
          name: '大床房',
          img: require('@/assets/images/home2.png'),
        },
        {
          id: 'home3',
          name: '双人房',
          img: require('@/assets/images/home3.png'),
        },
        {
          id: 'home4',
          name: '三人间',
          img: require('@/assets/images/home4.png'),
        },
        {
          id: 'home5',
          name: '特惠房',
          img: require('@/assets/images/home5.png'),
        },
      ],
      otherList: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let res = await this.$Http.getHomeInfo()
      this.oftenList = res.data.oftenInfo
      this.otherList = res.data.otherInfo
    },
    // 查看更多其他房型
    clickRoomList(param) {
      this.$router.push({ name: 'RoomList', query: { id: param.id, name: param.name } })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.home {
  @include wh100();
  background-color: $bg;
  height: calc(100% - 50px);
  .often {
    margin-bottom: 23px;
    .often-title {
      padding: 0 0 0 12px;
      margin-bottom: 18px;
      font-size: 16px;
      font-family: OPPOSans;
      font-weight: 800;
      color: #343434;
    }
  }
  .room-types {
    @include flex-cl();
    margin-bottom: 26px;
    padding: 0 20px 0 18px;
    .room-li {
      text-align: center;
      .room-img {
        width: 54px;
        height: 54px;
        margin-bottom: 10px;
      }
      .room-word {
        font-size: 12px;
        font-weight: bold;
        color: #242424;
      }
    }
  }

  .room-other {
    padding: 0 15px 0 12px;
    .other-header {
      @include flex-cl();
      padding: 0 6px 0 5px;
      margin-bottom: 12px;
      .room-title {
        font-size: 16px;
        font-family: OPPOSans;
        font-weight: 800;
      }
      .look-more {
        @include flex-cl-center();
        width: 85px;
        height: 30px;
        background: #ffffff;
        box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);
        border-radius: 15px;
        font-size: 12px;
        font-family: OPPOSans;
        color: #242424;
      }
    }
  }
}
</style>
