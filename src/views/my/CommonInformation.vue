<template>
  <div class="common-infomation">
    <header-pub></header-pub>
    <van-tabs v-model="active"
              color="#D2AC60"
              animated
              @click="onClick"
              sticky>

      <van-tab :title="tab.title"
               v-for="tab of tabList"
               :key="tab.id ">
      </van-tab>
    </van-tabs>
    <!-- 旅客信息 -->
    <div class="infomation-content"
         v-show="!clickAddTrue">
      <div class="infomation-all"
           @click="clickAddNew">
        <van-icon name="plus" />&nbsp;&nbsp;{{ active === 0 ? '新增旅客' : '新增发票' }}
      </div>
      <ul class="infomation-list">
        <li class="infomation-li"
            v-for="(infomation, index) of infomationObj.list"
            :key="index">
          <div class="infomation-left">
            <h3 class="name">{{infomation.name}}</h3>
            <p class="type"
               v-show="infomationObj.type === 'passenger'">手机号：{{infomation.phone}}</p>
            <p class="type"
               v-show="infomationObj.type === 'passenger'">身份证：{{infomation.idnumber}}</p>
            <p class="type"
               v-show="infomationObj.type === 'invoice'">税号：{{infomation.number}}</p>
          </div>
          <div class="infomation-right" @click="clickDel(infomation)">
            <img src="@/assets/images/del.png"
                 alt=""
                 class="delete-img">
            删除
          </div>

        </li>
      </ul>
    </div>
    <div class="footer"
         v-show="!clickAddTrue"
         @click="clickBack">返&nbsp;&nbsp;&nbsp;&nbsp;回</div>
    <!-- 新增旅客 -->
    <div class="infomation-add"
         v-show="clickAddTrue">
      <!-- 常驻旅客 -->
      <ul class="passenger-list"
          v-show="active === 0">
        <li class="passenger-li">
          <div class="passenger-left">姓名</div>
          <div class="passenger-right">
            <van-field v-model="infoMationAdd.name"
                       clearable
                       placeholder="请填写符合证件的真实姓名" />
          </div>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">手机</div>
          <div class="passenger-right">
            <van-field v-model="infoMationAdd.phone"
                       clearable
                       placeholder="仅用于接收预订信息" />
          </div>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">证件类型</div>
          <div class="passenger-right passenger-right-picker"
               @click="idPicker = true">
            <div class="picker-cont">{{infoMationAdd.idType}}</div>
            <van-icon name="arrow"
                      class="jifen-icon" />
          </div>

          <van-popup v-model="idPicker"
                     round
                     position="bottom">
            <van-picker show-toolbar
                        :columns="infoMationAdd.idTypeArr"
                        @cancel="idPicker = false"
                        @confirm="onId" />
          </van-popup>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">证件号码</div>
          <div class="passenger-right">
            <van-field v-model="infoMationAdd.idNumber"
                       clearable
                       placeholder="请填写证件号码" />
          </div>
        </li>
      </ul>
      <!-- 发票信息 -->
      <ul class="passenger-list"
          v-show="active === 1">
        <li class="passenger-li">
          <div class="passenger-left">企业名称</div>
          <div class="passenger-right">
            <van-field v-model="invoiceAdd.name"
                       clearable
                       placeholder="公司发票抬头（必填）" />
          </div>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">税号</div>
          <div class="passenger-right">
            <van-field v-model="invoiceAdd.number"
                       clearable
                       placeholder="纳税人识别号（必填）" />
          </div>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">注册地址</div>
          <div class="passenger-right">
            <van-field v-model="invoiceAdd.address"
                       clearable
                       placeholder="公司注册地址" />
          </div>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">联系电话</div>
          <div class="passenger-right">
            <van-field v-model="invoiceAdd.phone"
                       clearable
                       placeholder="公司电话" />
          </div>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">开户银行</div>
          <div class="passenger-right">
            <van-field v-model="invoiceAdd.bank"
                       clearable
                       placeholder="公司开户银行" />
          </div>
        </li>
        <li class="passenger-li">
          <div class="passenger-left">银行账号</div>
          <div class="passenger-right">
            <van-field v-model="invoiceAdd.bankNum"
                       clearable
                       placeholder="开户银行账号" />
          </div>
        </li>
      </ul>
      <div class="add-footer">
        <div class="btn"
             @click="clickBtnInfo">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPub from '@/components/HeaderPub.vue'
import { Tab, Tabs, Icon, Field, Popup, Picker, Toast } from 'vant'

export default {
  name: 'Order',
  components: {
    HeaderPub,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
  },
  data() {
    return {
      active: 0,
      clickAddTrue: false, // 是否点击新增
      tabList: [
        { title: '常驻旅客', id: 'passenger' },
        { title: '发票信息', id: 'invoice' },
      ],
      infomationObj: {},
      infomationArr: [
        {
          type: 'passenger',
          list: [
            {
              name: '张三',
              phone: '+86 189****2322',
              idnumber: '713***********314',
            },
          ],
        },
        {
          type: 'invoice',
          list: [
            {
              name: '济南百事可乐有限责任公司',
              number: '91328888733748669D',
            },
          ],
        },
      ],
      infoMationAdd: {
        name: '',
        phone: '',
        idType: '身份证',
        idTypeArr: ['身份证', '护照'],
        idNumber: '',
        idErr: false,
      },
      idPicker: false,
      invoiceAdd: {
        name: '',
        number: '',
        address: '',
        phone: '',
        bank: '',
        bankNum: '',
      },
    }
  },
  mounted() {
    this.infomationObj = this.infomationArr[0]
  },
  methods: {
    // 点击tab事件
    onClick(index) {
      this.infomationObj = this.infomationArr[index]
    },
    // 点击新增旅客
    clickAddNew() {
      this.clickAddTrue = true
    },
    // 身份证
    onId(value) {
      console.log(value)
      this.infoMationAdd.idType = value
      this.idPicker = false
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    // 删除
    clickDel(param) {
      console.log(param)
    },
    // 保存
    clickBtnInfo() {
      console.log(this.active)
      if (this.active === 0) {
        // 常驻旅客
        switch (true) {
          case this.$check.repIsEmpty(this.infoMationAdd.name):
            Toast('请输入姓名')
            return
          case this.$check.repIsEmpty(this.infoMationAdd.phone):
            Toast('请输入电话')
            return
          case this.$check.repIsEmpty(this.infoMationAdd.idNumber):
            Toast('请填写证件号码')
            return
        }
        this.clickAddTrue = false
      } else {
        // 发票信息
        switch (true) {
          case this.$check.repIsEmpty(this.invoiceAdd.name):
            Toast('请输入企业名称')
            return
          case this.$check.repIsEmpty(this.invoiceAdd.number):
            Toast('请输入税号')
            return
        }
        this.clickAddTrue = false
      }
    },
    // 点击返回
    clickBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';

::v-deep .van-sticky {
  // 可用
  top: 78px;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 99;
}
::v-deep .van-info {
  background-color: #d2ac60;
}

.common-infomation {
  @include wh100();
  background-color: $bg;
  .infomation-content {
    height: calc(100% - 138px);
    overflow-y: auto;
    .infomation-all {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 53px;
      margin: 53px 0 10px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      background-color: #fff;
    }
    .infomation-list {
      .infomation-li {
        @include flex-cl();
        padding: 0 38px 0 29px;
        height: 80px;
        margin-bottom: 5px;
        background-color: #fff;
        .infomation-left {
          .name {
            font-size: 15px;
            margin-bottom: 10px;
          }
          .type {
            font-size: 12px;
            color: #999;
            line-height: 1.5;
          }
        }
        .infomation-right {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          color: #d2ac60;
          .delete-img {
            width: 12px;
            height: 12px;
            margin-right: 6px;
          }
        }
      }
    }
  }

  // 新增
  .infomation-add {
    margin-top: 53px;
    .passenger-list {
      background-color: #fff;
      .passenger-li {
        display: flex;
        align-items: center;
        height: 53px;
        margin: 0 20px;
        border-bottom: 1px solid #f1f1f1;
        &:last-child {
          border-bottom: none;
        }
        .passenger-left {
          width: 65px;
          font-size: 16px;
          text-align-last: justify;
          text-align: justify;
          font-weight: bold;
          flex: none;
        }
        .passenger-right {
          flex: 1;
        }
        .passenger-right-picker {
          display: flex;
          width: 100%;
          padding: 10px 0 10px 16px;
          overflow: hidden;
          color: #323233;
          font-size: 14px;
          .picker-cont {
            width: 100%;
          }
        }
      }
    }
    .add-footer {
      width: 180px;
      margin: 120px auto 30px;
      .btn {
        @include btn-cl();
        color: #fff;
      }
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    @include btn-cl();
    font-size: 15px;
    height: 60px;
    color: #ffffff;
  }
}
</style>