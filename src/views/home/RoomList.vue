<template>
  <div class="room-list">
    <header-pub :bg="'hui'"></header-pub>
    <div class="list-title">
      <van-icon name="arrow-left"
                class="arrow-left-cl" @click="clickToHome" />
      <span class="title-word">{{title}}</span>
    </div>
    <room-pub :roomList="roomList"></room-pub>
    <footer-pub :from="'roomList'"></footer-pub>
  </div>
</template>
<script>
import HeaderPub from '@/components/HeaderPub.vue'
import FooterPub from '@/components/FooterPub.vue'
import RoomPub from '@/components/RoomPub.vue'
import { Icon } from 'vant'
export default {
  name: 'room-list',
  components: {
    [Icon.name]: Icon,
    HeaderPub,
    FooterPub,
    RoomPub
  },
  data() {
    return {
      title: '',
      roomList: [],
    }
  },

  mounted() {
    this.title = this.$route.query.name
    console.log(this.$route.query)
    this.getData()
  },
  methods: {
    async getData() {
      let res = await this.$Http.getHomeInfo()
      this.roomList = res.data.otherInfo
    },
    clickToHome() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.room-list {
  height: calc(100% - 50px);
  padding: 0 14px;
  background-color: $bg;
  overflow-y: auto;
  .list-title {
    margin: 4px 0 19px 0;
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
