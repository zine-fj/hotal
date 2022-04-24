<template>
  <div class="login">
    <div class="login-content">
      <div class="logo">
        <img :src="loginImg"
             alt=""
             class="logo-img">
      </div>

      <!-- 验证码登录 -->
      <div class="login-cl"
           v-if="type">
        <div class="input-list">
          <div class="input-li">
            <!-- 输入手机号，调起手机号键盘 -->
            <van-field v-model="loginObj.tel"
                       type="tel"
                       clearable
                       placeholder="输入手机号"
                       class="input-tel" />

          </div>

          <div class="input-li input-li-1">
            <div class="input-cl-yzm">
              <van-field v-model="loginObj.yzm"
                         type="tel"
                         clearable
                         placeholder="输入验证码"
                         class="input-tel" />
            </div>
            <div class="yzm"
                 v-if="!djsObj.start"
                 @click="clickGetYzm">获取验证码</div>
            <div class="yzm-number"
                 v-if="djsObj.start"><span class="number">{{djsObj.number}}</span>s</div>
          </div>

        </div>

        <div class="login-btn">
          <div class="btn"
               @click="clickLogin">登 录</div>
        </div>
      </div>

      <!-- 一键登录 -->
      <div class="type-login"
           v-if="!type">
        <div class="type-btn">
          <img :src="loginImg1"
               alt=""
               class="logo-img2">
          <div class="type-right">
            <p class="name">HC*&12312656434</p>
            <p class="phone">189****7654</p>
          </div>
        </div>
        <p class="type-cl"
           @click="clickChoiceType">手机号验证码登陆</p>
        <div class="login-btn">
          <div class="btn"
               @click="clickLoginType">一 键 登 录</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-l">
        <van-checkbox v-model="checked"
                      icon-size="15px"
                      checked-color="#AD893F"></van-checkbox>
      </div>
      <div class="footer-r">
        登陆代表已同意<a class="link">《云天峻锐酒店用户协议》</a>、<a class="link">《隐私政策》</a>， 并授权使用该酒店账号信息（如昵称、头像、手机号等） 进行统一管理
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Checkbox, Toast } from 'vant'
import { phoneType } from '@/utils/phoneType.js'
export default {
  name: 'Home',
  components: {
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      loginImg: require('@/assets/images/login-img.png'),
      loginImg1: require('@/assets/images/login.png'),
      type: false, // 一键登录，false的话验证码登录
      loginObj: {
        tel: '123',
        yzm: '',
      },
      djsObj: {
        start: false,
        number: 60,
      },
      checked: false,
      isFocus: false,
    }
  },
  mounted() {
    console.log('phone: ', phoneType())
  },
  methods: {
    clickGetYzm() {
      this.yzmDjsFn()
      Toast('获取验证码')
    },
    // 倒计时
    yzmDjsFn() {
      let djsTime = setInterval(() => {
        if (this.djsObj.number > 0) {
          this.djsObj.start = true
          this.djsObj.number--
        } else {
          this.djsObj.start = false
          this.djsObj.number = 60
          clearInterval(djsTime)
        }
      }, 1000)
    },
    check() {
      switch (true) {
        case this.$check.repIsEmpty(this.loginObj.tel):
          Toast('请输入手机号')
          return
        case this.$check.repIsEmpty(this.loginObj.yzm):
          Toast('请输入验证码')
          return
        case !this.checked:
          Toast('请勾选协议')
          return
      }
      return true
    },
    clickLogin() {
      if (!this.check()) {
        return
      }
      console.log('login suc')
      this.$store.dispatch('getUserInfoAct', this.loginObj.tel)
      this.$router.push({ name: 'HomePage' })
    },
    // 切换为验证码登录
    clickChoiceType() {
      this.type = true
    },
    // 一键登录
    clickLoginType() {
      if (!this.checked) {
        Toast('请勾选协议')
        return
      }
      console.log('login suc--')
      // 默认值
      this.$store.dispatch('getUserInfoAct', '1111')
      this.$router.push({ name: 'HomePage' })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';

.login {
  @include wh100();
  position: relative;
  background-color: #fff;
  overflow: hidden;
  .logo {
    width: 76px;
    height: 78px;
    margin: 120px auto 49px;

    .logo-img {
      width: 100%;
      height: 100%;
    }
  }
  .login-cl {
    padding: 0 48px;
    .input-list {
      margin-bottom: 90px;

      .input-li {
        position: relative;
        border-bottom: 1px solid #e1e1e1;
        .input-tel {
        }
        .input-password {
        }
        .van-field_clear {
          margin-right: 50px;
        }
        .yzm {
          flex: none;
          font-size: 13px;
          font-weight: bold;
          color: #ad893f;
        }
      }
      .input-li-1 {
        display: flex;
        align-items: center;
        .input-cl-yzm {
          width: 100%;
        }
        .yzm-number {
          color: #ad893f;
          font-size: 13px;
        }
      }
    }
    .login-btn {
      margin: 0 30px;
      .btn {
        color: #fff;
        font-size: 14px;
        @include btn-cl();
      }
    }
  }

  // 一键登录
  .type-login {
    margin: 0 50px;
    text-align: center;
    .type-btn {
      display: flex;
      padding: 17px 0 17px 21px;
      border: 1px solid #e7e7e7;
      border-radius: 12px;
      margin-bottom: 17px;
      .logo-img2 {
        width: 43px;
        height: 43px;
        margin-right: 22px;
      }
      .type-right {
        text-align: left;
        color: #242424;

        .name {
          margin-bottom: 13px;
          font-size: 11px;
        }
        .phone {
          font-size: 17px;
        }
      }
    }
    .type-cl {
      margin-bottom: 77px;
      font-size: 15px;
      font-weight: bold;
      color: #d2ac60;
    }
    .login-btn {
      margin: 0 30px;
      .btn {
        color: #fff;
        font-size: 14px;
        @include btn-cl();
      }
    }
  }

  .footer {
    display: flex;
    padding: 0 20px;
    font-size: 12px;
    color: #939393;
    margin-top: 100px;
    .footer-l {
      margin-right: 5px;
    }
    .footer-r {
      line-height: 1.5;
      .link {
        color: #0090ff;
      }
    }
  }
}
</style>
