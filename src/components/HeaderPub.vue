<template>
  <div class="header-pub">
    <div class="header-zhan"></div>
    <div :class="{'header-pub-count': true, 'hui-cl': bg === 'hui'}">
      <div class="header-left">
        <img src="@/assets/images/logo.png"
             alt=""
             class="logo">
      </div>
      <div class="header-right"
           @click="showPopup">
        <img src="@/assets/images/header-right.png"
             alt=""
             class="more">
      </div>
    </div>

    <van-popup v-model="show"
               position="right"
               class="popup-cl">
      <div class="login-out" @click="clickOut">
        <img src="@/assets/images/out.png"
             alt=""
             class="out-img">退出账号
      </div>
    </van-popup>
  </div>

</template>

<script>
import { Popup } from 'vant'
export default {
  components: {
    [Popup.name]: Popup,
  },
  props: {
    bg: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    clickOut() {
      this.$store.dispatch('getUserInfoAct', '')
      this.$router.push({name: 'LoginPage'})
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.header-pub {
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  .popup-cl {
    // position: relative;
    width: 45%;
    height: 100%;
    background-color: #333;
    .login-out {
      position: absolute;
      right: 34px;
      bottom: 37px;
      font-size: 16px;
      color: #ffffff;
      .out-img {
        width: 17px;
        margin: 10px;
      }
    }
  }
  .header-zhan {
    width: 100%;
    height: 78px;
  }

  .header-pub-count {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 30px 20px 30px 12px;
    background-color: #fff;
    z-index: 999;
    @include flex-cl();
    .header-left {
      width: 116px;
      height: 18px;
      .logo {
        width: 100%;
        height: 100%;
      }
    }
    .header-right {
      width: 19px;
      height: 15px;
      .more {
        width: 100%;
        height: 100%;
      }
    }
  }

  .hui-cl {
    background-color: $bg;
  }
}
</style>