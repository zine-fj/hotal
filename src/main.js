/*
 * @Author: JFU32
 * @Date: 2021-10-23 09:43:36
 * @LastEditors: JFU32
 * @LastEditTime: 2021-12-20 22:40:29
 * @Description: 请填写简介...
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Http from './utils/http'
import check from '@/utils/check'
import '@/assets/style/reset.css'

Vue.config.productionTip = false
Vue.prototype.$Http = Http
Vue.prototype.$check = check

console.log('当前环境：', process.env.NODE_ENV)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
