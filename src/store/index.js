import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultUserInfo = {};
let storageState = sessionStorage.getItem('state');
try {
  defaultUserInfo = storageState ? JSON.parse(storageState).userInfo: defaultUserInfo
} catch (err) {console.log(err)}

export default new Vuex.Store({
  state: {
    userInfo: defaultUserInfo
  },
  mutations: {
    getUserInfo(state, payload) {
      state.userInfo.phone = payload
    }
  },
  actions: {
    getUserInfoAct(ctx, phone) {
      ctx.commit('getUserInfo', phone)
    }
  },
  modules: {
  }
})
