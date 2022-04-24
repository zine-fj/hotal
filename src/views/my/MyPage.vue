<template>
  <div class="my">
    <div class="header">
      <img src="@/assets/images/my-bg.png"
           alt=""
           class="header-bg">
      <div class="header-count">
        <div class="header-left">
          <img src="@/assets/images/my-left.png"
               alt=""
               class="logo">
        </div>
        <div class="header-right" @click="showPopup">
          <img src="@/assets/images/my-right.png"
               alt=""
               class="more">
        </div>
      </div>

      <div class="my-info">
        <img :src="myInfoObj.photo"
             alt=""
             class="my-photo"
             @click="clickPhoto">
        <div class="info-right">
          <p class="name-phone">
            <span class="name">{{ myInfoObj.name }}</span>
            <span class="phone">{{ myInfoObj.phone }}</span>
          </p>
          <p class="member-integral">
            <span class="member">白银会员 8.8折</span>
            <span class="integral">积分 {{ myInfoObj.jifen }}</span>
          </p>
        </div>
      </div>

    </div>

    <div class="center-shopping">
      <div class="center-li"
           @click="clickLi('hy')">
        <img src="@/assets/images/my-member.png"
             alt=""
             class="center-img">
        <span class="center-word">会员中心</span>
      </div>
      <div class="center-li"
           @click="clickLi('jf')">
        <img src="@/assets/images/my-integral.png"
             alt=""
             class="center-img">
        <span class="center-word">积分商城</span>
      </div>
    </div>

    <ul class="info-list">
      <li class="info-li"
          v-for="info of myList"
          :key="info.id">
        <div class="info-li-left">
          <img :src="info.img"
               alt=""
               class="left-img">
          <span class="left-word">{{info.name}}</span>
        </div>
        <div class="info-li-right"
             @click="clickList(info.id)"
             v-if="info.id != 'lxkf'">
          <span class="right-word">{{info.right}}</span>
          <van-icon name="arrow" />
        </div>
        <a :href="'tel:' + info.phone"
           class="info-li-right"
           v-if="info.id === 'lxkf'">
          <span class="right-word">{{info.right}}</span>
          <van-icon name="arrow" />
        </a>
      </li>
    </ul>

    <van-popup v-model="show"
               position="right"
               class="popup-cl">
      <div class="login-out" @click="clickOut">
        <img src="@/assets/images/out.png"
             alt=""
             class="out-img">退出账号
      </div>
    </van-popup>

    <footer-pub></footer-pub>
  </div>
</template>

<script>
import { Icon, Popup } from 'vant'
// @ is an alias to /src
import FooterPub from '@/components/FooterPub.vue'

export default {
  name: 'my',
  components: {
    FooterPub,
    [Icon.name]: Icon,
    [Popup.name]: Popup
  },
  data() {
    return {
      show: false,
      myInfoObj: {
        photo: require('@/assets/logo.png'),
        name: '刘先生',
        phone: this.$store.state.userInfo.phone,
        jifen: 800,
      },
      myList: [
        {
          id: 'cyxx',
          img: require('@/assets/images/my-icon1.png'),
          name: '常用信息',
          right: '身份/发票信息',
        },
        {
          id: 'jfjl',
          img: require('@/assets/images/my-icon2.png'),
          name: '积分记录',
          right: '积分获取情况',
        },
        {
          id: 'lxkf',
          img: require('@/assets/images/my-icon3.png'),
          name: '联系客服',
          right: '拨打电话',
          phone: '123456',
        },
        {
          id: 'yjfk',
          img: require('@/assets/images/my-icon4.png'),
          name: '意见反馈',
          right: '有事儿您说',
        },
      ],
    }
  },
  methods: {
    // 点击头像
    clickPhoto() {
      this.$router.push({ name: 'InfoChange' })
    },
    // 点击会员中心 积分商城
    clickLi(param) {
      console.log(param)
      if (param === 'hy') {
        this.$router.push({ name: 'MemberPage' })
      } else {
        console.log('积分')
        this.$router.push({ name: 'PointsMall' })
      }
    },
    // 点击列表
    clickList(id) {
      console.log('id: ', id)
      switch(id) {
        case 'cyxx':
          this.$router.push({ name: 'CommonInformation' })
          break;
        case 'jfjl':
          this.$router.push({ name: 'IntegralRecord' })
          break;
        case 'yjfk':
          this.$router.push({ name: 'Feedback' })
          break;
      }
    },
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
.my {
  @include wh100();
  background-color: $bg;
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
  .header {
    height: 250px;

    .header-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 250px;
      overflow: hidden;
    }
    .header-count {
      position: relative;
      width: 100%;
      padding: 30px 20px 30px 12px;
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

    .my-info {
      position: relative;
      display: flex;
      align-items: center;
      padding: 20px 0 0 12px;
      .my-photo {
        width: 50px;
        height: 50px;
        margin-right: 11px;
        background-color: #fff;
        border-radius: 50%;
      }
      .info-right {
        .name-phone {
          margin-bottom: 10px;
          font-weight: bold;
          color: #ffffff;
          .name {
            margin-right: 6px;
            font-size: 17px;
          }
          .phone {
            font-size: 13px;
          }
        }
        .member-integral {
          .member {
            padding: 5px 8px 2px;
            margin-right: 5px;
            @include flex-cl-center();
            background: #e5eff5;
            border-radius: 2px;
            font-size: 10px;
            font-weight: bold;
            color: #4a616f;
          }
          .integral {
            padding: 5px 8px 2px;
            @include flex-cl-center();
            font-size: 10px;
            font-weight: bold;
            color: #fff;
            border: 1px solid #fff;
          }
        }
      }
    }
  }

  .center-shopping {
    position: relative;
    display: flex;
    align-items: center;
    height: 76px;
    margin-top: -66px;
    border-top: 8px solid $bg;
    border-bottom: 8px solid $bg;
    background-color: #fff;
    .center-li {
      width: 50%;
      @include flex-cl-center();
      border-right: 1px solid #dedede;
      &:last-child {
        border-right: none;
      }
      .center-img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      .center-word {
        font-size: 15px;
      }
    }
  }

  .info-list {
    background-color: #fff;
    .info-li {
      height: 58px;
      padding: 0 20px 0 23px;
      @include flex-cl();
      .info-li-left {
        .left-img {
          width: 15px;
          height: 15px;
          margin-right: 17px;
          object-fit: contain;
        }
        .left-word {
          font-size: 15px;
        }
      }
      .info-li-right {
        .right-word {
          font-size: 13px;
          color: #999;
        }
        .van-icon {
          color: #a9a9a9;
        }
      }
    }
  }
}
</style>