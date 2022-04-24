<template>
  <div class="info-change">
    <header-pub></header-pub>
    <div class="title">信息修改</div>
    <ul class="change-list">
      <li class="change-li">
        <div class="li-left">昵&nbsp;&nbsp;&nbsp;称</div>
        <div class="li-right">
          <van-field v-model="myInfoObj.name"
                     clearable
                     placeholder="长度不超过五个字符" />
        </div>
      </li>
      <li class="change-li">
        <div class="li-left">手&nbsp;&nbsp;&nbsp;机</div>
        <div class="li-right">
          <van-field v-model="myInfoObj.phone"
                     clearable
                     placeholder="仅用于接收预订信息" />

        </div>
      </li>
    </ul>

    <div class="footer-btn">
      <div class="btn"
           @click="clickKeep">保存</div>
    </div>
    <footer-pub></footer-pub>
  </div>
</template>

<script>
import { Field, Toast } from 'vant'
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import FooterPub from '@/components/FooterPub.vue'

export default {
  name: 'Home',
  components: {
    HeaderPub,
    FooterPub,
    [Field.name]: Field,
  },
  data() {
    return {
      myInfoObj: {
        name: '',
        phone: '',
      },
    }
  },
  methods: {
    clickKeep() {
      if (this.$check.repIsEmpty(this.myInfoObj.name)) {
        Toast('请输入昵称')
        return
      } else if (this.$check.repIsEmpty(this.myInfoObj.phone)) {
        Toast('请输入手机号')
        return
      }
      this.$store.dispatch('getUserInfoAct', this.myInfoObj.phone)
      this.$router.push({ name: 'MyPage' })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.info-change {
  @include wh100();
  background-color: $bg;
  height: calc(100% - 50px);

  .title {
    padding: 8px 20px;
    font-size: 17px;
    font-weight: bold;
    color: #242424;
    background-color: #fff;
    margin-bottom: 8px;
  }
  .change-list {
    background-color: #fff;

    .change-li {
      display: flex;
      align-items: center;
      height: 53px;
      margin: 0 21px;
      border-bottom: 1px solid #f1f1f1;
      &:last-child {
        border-bottom: none;
      }
      .li-left {
        font-size: 16px;
        font-weight: bold;
      }
      .li-right {
        width: 100%;
      }
    }
  }
  .footer-btn {
    margin: 230px auto 0;
    width: 180px;
    .btn {
      @include btn-cl();
      color: #fff;
      font-size: 13px;
    }
  }
}
</style>
