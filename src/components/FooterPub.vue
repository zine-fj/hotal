<template>
  <div class="footer-pub">
    <van-tabbar v-model="active"
                fixed
                border
                active-color="#BD9B56"
                inactive-color="#9A9A9A">
      <van-tabbar-item v-for="(tab) of tabbars"
                       :key="tab.to"
                       :name="tab.name"
                       @click="clickName(tab.name)">
        <span>{{tab.title}}</span>
        <template #icon="props">
          <img :src="props.active ? tab.active : tab.nomal" />
        </template>
      </van-tabbar-item>

    </van-tabbar>
  </div>

</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'footer-pub',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      active: 'HomePage',
      tabbars: [
        {
          to: '/homePage',
          title: '首页',
          name: 'HomePage',
          nomal: require('@/assets/images/tab-home.png'),
          active: require('@/assets/images/tab-home-sel.png'),
        },
        {
          to: '/orderPage',
          title: '订单',
          name: 'OrderPage',
          nomal: require('@/assets/images/tab-order.png'),
          active: require('@/assets/images/tab-order-sel.png'),
        },
        {
          to: '/memberPage',
          title: '会员',
          name: 'MemberPage',
          nomal: require('@/assets/images/tab-member.png'),
          active: require('@/assets/images/tab-member-sel.png'),
        },
        {
          to: '/myPage',
          title: '我的',
          name: 'MyPage',
          nomal: require('@/assets/images/tab-my.png'),
          active: require('@/assets/images/tab-my-sel.png'),
        },
      ],
    }
  },
  mounted() {
    console.log('this.$route.name: ', this.$route.name)
    this.active = this.$route.name
    switch (this.$route.name) {
      case 'RoomList':
        this.active = 'HomePage'
        break
      case 'PayResult':
      case 'OrderAssess':
        this.active = 'OrderPage'
        break
      case 'InfoChange':
        this.active = 'MyPage'
        break
    }
  },
  methods: {
    clickName(name) {
      this.$router.push({ name: name })
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-pub {
}
</style>